// scripts/check-conflicts.mjs
import { execSync } from "node:child_process";

try {
  const out = execSync(
    `git grep -nE "^(<<<<<<<|>>>>>>>|=======)$" -- . ":!package-lock.json"`,
    { stdio: ["ignore", "pipe", "pipe"] }
  ).toString();
  if (out.trim()) {
    console.error("❌ Unresolved merge conflict markers found:\n" + out);
    process.exit(1);
  }
} catch {
  // git grep exits 1 when nothing found; treat that as success
  process.exit(0);
}
