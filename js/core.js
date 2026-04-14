let used = new Set();

const data = {
  tech: ["neo","byte","cyber","quant","nex","data","logic"],
  fantasy: ["aer","thal","mor","vel","zan","lyr","eld"],
  dark: ["zhul","noct","grim","vra","kael","mor","rax"],
  generic: ["neo","lux","sol","zen","nova","cri","vel"]
};

function detect(text){
  text = text.toLowerCase();
  if(text.includes("tech") || text.includes("ai")) return "tech";
  if(text.includes("fantasy")) return "fantasy";
  if(text.includes("dark")) return "dark";
  return "generic";
}

function pick(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function makeName(ctx){
  const set = data[ctx];
  const a = pick(set);
  const b = pick(set);

  const styles = [
    () => `${a}${b}`,
    () => `${a}-${b}`,
    () => `${b}${a}`,
    () => `${a.charAt(0).toUpperCase()+a.slice(1)} ${b}`
  ];

  let name;
  let tries = 0;

  do {
    name = pick(styles)();
    tries++;
  } while (used.has(name) && tries < 10);

  used.add(name);
  return name;
}

function generate(text){
  const ctx = detect(text);
  const results = [];

  for(let i=0;i<8;i++){
    results.push(makeName(ctx));
  }

  return { ctx, results };
}
