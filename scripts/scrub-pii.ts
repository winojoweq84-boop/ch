/**
 * Scans repo for likely PII or secrets and prints matches with file:line.
 * Adjust patterns as needed.
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const root = process.cwd();
const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.env', '.yml', '.md', '.css', '.scss']);

const patterns: [string, RegExp][] = [
  ['email', /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  ['phone', /\b(\+?\d[\d\s\-().]{7,})\b/],
  ['token', /\b(AIza|ghp_|gho_|ghu_|ghs_|sk-[a-zA-Z0-9-_]{8,}|eyJ[A-Za-z0-9._-]{10,})\b/],
  ['name-handle', /\b(misha|mih[a-z0-9_]+|dev@[a-z0-9.-]+|@[\w-]{3,})\b/i],
  ['comment ID', /TODO|FIXME|HACK|temporary owner|personal/i],
];

function walk(dir: string, acc: string[] = []): string[] {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === '.next' || f === 'dist') continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (exts.has(path.extname(p))) acc.push(p);
  }
  return acc;
}

const files = walk(root);
let count = 0;

for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line: string, i: number) => {
    patterns.forEach(([label, re]) => {
      if (re.test(line)) {
        count++;
        console.log(`${label.padEnd(12)} ${file}:${i + 1}  ${line.trim()}`);
      }
    });
  });
}
console.log(`\nScan complete. ${count} potential hits.`);
