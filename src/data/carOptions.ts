export const BRANDS = [
  "Mercedes-Benz","BMW","Audi","Porsche","Land Rover",
  "Lexus","Tesla","Bentley","Rolls-Royce","Ferrari",
  "Lamborghini","Maserati","McLaren","Aston Martin",
  "Jaguar","Cadillac","Infiniti","Genesis","Other",
] as const satisfies readonly [string, ...string[]];

export type Brand = typeof BRANDS[number];

export const MODELS: Record<Exclude<Brand, "Other">, readonly string[]> = {
  "Mercedes-Benz": ["S-Class","E-Class","C-Class","GLS","GLE","G-Class","Maybach","SL","CLA","GLC"],
  "BMW": ["7 Series","5 Series","3 Series","X7","X6","X5","i7","i5","iX","X3","X4"],
  "Audi": ["A8","A6","A4","Q8","Q7","RS","e-tron","A5","Q5","R8"],
  "Porsche": ["911","Panamera","Cayenne","Macan","Taycan","718 Boxster","718 Cayman"],
  "Land Rover": ["Range Rover","Range Rover Sport","Defender","Velar","Discovery","Evoque","Discovery Sport"],
  "Lexus": ["LS","ES","RX","LX","GX","NX","IS","RC","GS","LC"],
  "Tesla": ["Model S","Model X","Model 3","Model Y","Cybertruck","Roadster"],
  "Bentley": ["Continental GT","Flying Spur","Bentayga","Mulsanne"],
  "Rolls-Royce": ["Phantom","Ghost","Cullinan","Wraith","Dawn","Black Badge"],
  "Ferrari": ["488","F8","Roma","Portofino","SF90","SF90 Stradale","296 GTB","Purosangue"],
  "Lamborghini": ["Urus","Huracán","Aventador","Revuelto","Countach","Hurracán STO","Gallardo"],
  "Maserati": ["Levante","Ghibli","Quattroporte","MC20","Grecale","Granturismo"],
  "McLaren": ["720S","570S","600LT","Artura","Spider","GT","Senna","P1"],
  "Aston Martin": ["DB11","DB12","Vantage","DBX","DBS","Vanquish","Rapide"],
  "Jaguar": ["F-PACE","F-TYPE","XE","XF","I-PACE","XJ","E-PACE","XK8"],
  "Cadillac": ["Escalade","CT5-V","Lyriq","XT6","Celestiq","CT6"],
  "Infiniti": ["QX80","QX60","Q50","QX55","QX50","Q60","Q70"],
  "Genesis": ["G90","G80","GV80","GV70","G70","GV60","Electrified G80"]
};
