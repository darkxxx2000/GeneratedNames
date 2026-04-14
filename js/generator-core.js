const data = {
  dark: ["zhul","mor","vel","kael","noct","vra","grim"],
  tech: ["neo","cyb","quant","byte","nex","data","logic"],
  fantasy: ["eld","aer","thar","lyr","mor","val","zan"],
  generic: ["neo","lux","sol","ver","cri","nova","zen"]
};

function detectContext(text){
  text = text.toLowerCase();
  if(text.includes("dark")) return "dark";
  if(text.includes("tech") || text.includes("ai")) return "tech";
  if(text.includes("fantasy")) return "fantasy";
  return "generic";
}

function pick(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function generateName(ctx){
  const pool = data[ctx] || data.generic;
  const a = pick(pool);
  const b = pick(pool);

  const formats = [
    () => a + b,
    () => a + "-" + b,
    () => b + a,
    () => a.charAt(0).toUpperCase() + a.slice(1) + b
  ];

  return pick(formats)();
}

function generateBatch(text){
  const ctx = detectContext(text);
  const results = [];

  for(let i=0;i<6;i++){
    results.push(generateName(ctx));
  }

  return { ctx, results };
}
