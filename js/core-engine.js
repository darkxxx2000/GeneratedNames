
// ================= CORE ENGINE (UNIFICADO) =================

const usedNames = new Set();

const data = {
  dark: ["zhul","mor","vel","kael","noct","vra","grim"],
  tech: ["neo","cyb","quant","byte","nex","data","logic"],
  fantasy: ["eld","aer","thar","lyr","mor","val","zan"],
  generic: ["neo","lux","sol","ver","cri","nova","zen"]
};

// ================= CONTEXT DETECTION =================
function detectContext(text){
  text = text.toLowerCase();

  if(text.includes("dark")) return "dark";
  if(text.includes("tech") || text.includes("ai")) return "tech";
  if(text.includes("fantasy")) return "fantasy";

  return "generic";
}

// ================= UTILS =================
function pick(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

// ================= SCORING ENGINE =================
function score(name){
  let s = 0;

  if(name.length >= 6 && name.length <= 14) s += 2;
  if(/[aeiou]/i.test(name)) s += 1;
  if(!/(aa|ee|ii|oo|uu)/i.test(name)) s += 1;
  if(/[xzq]/i.test(name)) s += 1;

  return s;
}

// ================= NAME GENERATION =================
function makeName(ctx){

  const pool = data[ctx] || data.generic;

  const a = pick(pool);
  const b = pick(pool);

  const patterns = [
    () => a + b,
    () => a + "-" + b,
    () => b + a,
    () => a.charAt(0).toUpperCase() + a.slice(1) + b,
    () => a + pick(["labs","hub","zone","forge","works"])
  ];

  let name;
  let tries = 0;

  do {
    name = pick(patterns)();
    tries++;
  } while(usedNames.has(name) && tries < 10);

  usedNames.add(name);

  return {
    name,
    score: score(name)
  };
}

// ================= PUBLIC API =================
function generateBatch(text){

  const ctx = detectContext(text);

  const results = [];

  for(let i = 0; i < 25; i++){
    results.push(makeName(ctx));
  }

  results.sort((a,b) => b.score - a.score);

  return {
    ctx,
    results: results.slice(0, 9)
  };
}
