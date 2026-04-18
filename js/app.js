let selectedCategory = null;

document.addEventListener("DOMContentLoaded", () => {

const textarea = document.getElementById("description");
const generateBtn = document.getElementById("generateButton");
const results = document.getElementById("results");

const catButtons = document.querySelectorAll(".cat-btn");
const socialMain = document.getElementById("socialMain");
const socialBar = document.getElementById("socialBar");

// ================= INIT =================
textarea.disabled = true;
textarea.placeholder = "Select a category first...";

// ================= HELPERS =================
function random(arr){
  if(!arr || arr.length === 0) return "";
  return arr[Math.floor(Math.random()*arr.length)];
}

function capitalize(word){
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// ================= CATEGORY STYLES =================
const categoryStyles = {
  pet: { tone:["Luna","Rocky","Leo","Bella","Milo","Nala"], suffix:[""] },
  business: { tone:["Prime","Vertex","Apex","Core","Noble","Summit"], suffix:["Solutions","Group","Systems"] },
  brand: { tone:["Nexa","Luma","Vexa","Zyra","Kairo","Auro"], suffix:[""] },
  gaming: { tone:["Shadow","Rogue","Phantom","Blaze","Fury","Venom"], suffix:["X","Z",""] },
  characters: { tone:["Eldor","Nyra","Kael","Zorin","Lyra","Vael"], suffix:["Nightfall","Stormborn"] },
  tech: { tone:["Quantum","Byte","Nex","Logic","Sync"], suffix:["AI","Labs","Tech"] },
  product: { tone:["Ultra","Smart","Flex","Pure","Max"], suffix:["Pro","Plus","Go"] },
  domain: { tone:["get","try","go","my","the"], suffix:["app","hub"] },
  creative: { tone:["Muse","Ink","Dream","Pixel","Spark"], suffix:[""] },
  instagram:{ tone:["Vibe","Snap","Pic","Gram"], suffix:["xo","tv"] },
  tiktok:{ tone:["Tok","Buzz","Clip","Loop"], suffix:["tv","live"] },
  youtube:{ tone:["Cast","Play","View","Stream"], suffix:["tv"] },
  twitter:{ tone:["Tweet","Thread","Byte","X"], suffix:["io"] },
  facebook:{ tone:["Social","Link","Hub","Face"], suffix:[""] },
  deviantart:{ tone:["Art","Sketch","Ink","Deviant"], suffix:["lab"] },
  twitch:{ tone:["Live","Game","Zone","Play"], suffix:["tv","gg"] },
  kick:{ tone:["Kick","Rush","Flow","Cast"], suffix:["tv"] },
  username:{ tone:["Real","Hey","Its","The"], suffix:["xo","yt"] }
};

// ================= CATEGORY =================
function setCategory(cat, btn){
  selectedCategory = cat;

  document.querySelectorAll(".cat-btn, #socialBar button")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");

  textarea.disabled = false;
  textarea.focus();

  // ocultar barra social al elegir red
  socialBar.classList.remove("show");
}

// ================= EVENTS =================
catButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>setCategory(btn.dataset.cat, btn));
});

socialMain.addEventListener("click", ()=>{
  socialBar.classList.toggle("show");
});

// 🔥 FIX SOCIAL BUTTONS
document.querySelectorAll("#socialBar button").forEach(btn=>{
  btn.addEventListener("click", ()=>setCategory(btn.dataset.cat, btn));
});

// ================= INTELIGENCIA CONTEXTUAL =================
function extractKeywords(text){
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g,"")
    .split(" ")
    .filter(w => w.length > 3)
    .map(capitalize)
    .slice(0,4);
}

function interpretContext(keywords){
  const map = {
    dog:["Paw","Bark","Tail","Fur"],
    cat:["Purr","Whisker","Claw"],
    tech:["Code","Data","Net","Bit","Cyber"],
    game:["XP","Loot","Quest","Arena"],
    art:["Ink","Sketch","Pixel","Muse"],
    business:["Trade","Capital","Market","Growth"]
  };

  let extra = [];

  keywords.forEach(k=>{
    const low = k.toLowerCase();
    Object.keys(map).forEach(key=>{
      if(low.includes(key)){
        extra = extra.concat(map[key]);
      }
    });
  });

  return extra;
}

function buildSmartName(style, keywords, context){

  const tone = random(style.tone);
  const suffix = random(style.suffix);
  const kw = random(keywords) || "";
  const ctx = random(context) || "";

  let name = `${tone} ${ctx} ${kw} ${suffix}`.replace(/\s+/g," ").trim();

  if(selectedCategory === "pet"){
    name = `${tone}${ctx}`;
  }

  if(selectedCategory === "domain"){
    name = name.replace(/\s/g,"").toLowerCase();
  }

  return name;
}

// ================= GENERADOR ANTIBLOQUEO PRO =================
function generateBatch(userText){

  const style = categoryStyles[selectedCategory];
  const keywords = extractKeywords(userText);
  const context = interpretContext(keywords);

  const MAX_RESULTS = 24;
  const MAX_ATTEMPTS = 500;

  const generated = new Set();
  let attempts = 0;

  while(generated.size < MAX_RESULTS && attempts < MAX_ATTEMPTS){
    attempts++;
    generated.add(buildSmartName(style, keywords, context));
  }

  return Array.from(generated);
}

// ================= RENDER =================
function render(list){
  results.innerHTML = "";
  list.forEach(name=>{
    const div = document.createElement("div");
    div.className = "result-item";
    div.textContent = name;
    results.appendChild(div);
  });
}

// ================= GENERATE =================
generateBtn.addEventListener("click", ()=>{

  if(!selectedCategory) return alert("Select category");
  const text = textarea.value.trim();
  if(!text) return alert("Write description");

  const list = generateBatch(text);
  render(list);
});

});
