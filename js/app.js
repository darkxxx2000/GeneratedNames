let selectedCategory = null;

const textarea = document.getElementById("description");
const generateBtn = document.getElementById("generateButton");
const results = document.getElementById("results");

const catButtons = document.querySelectorAll(".cat-btn");
const socialButtons = document.querySelectorAll("#socialBar button");
const socialMain = document.getElementById("socialMain");
const socialBar = document.getElementById("socialBar");

// ================= INIT =================
textarea.disabled = true;
textarea.placeholder = "Select a category first...";

// ================= CATEGORY =================
function setCategory(cat, btn){
  selectedCategory = cat;

  document.querySelectorAll(".cat-btn, #socialBar button")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");

  textarea.disabled = false;
  textarea.focus();
}

// ================= EVENTS =================
catButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>setCategory(btn.dataset.cat, btn));
});

socialMain.addEventListener("click", ()=>{
  socialBar.classList.toggle("show");
});

socialButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>setCategory(btn.dataset.cat, btn));
});

// ================= SMART PREFIXES =================
const prefixes = {
  business: ["Prime","Nova","Vertex","Core","Apex"],
  brand: ["Luma","Viva","Zest","Echo","Aura"],
  gaming: ["Shadow","Rogue","Phantom","Blaze","Fury"],
  characters: ["Eldor","Nyra","Kael","Zorin","Lyra"],
  tech: ["Byte","Code","Nex","Sync","Logic"],
  product: ["Flex","Ultra","Max","Smart","Pure"],
  domain: ["Get","Try","Go","My","The"],
  creative: ["Muse","Ink","Dream","Pixel","Spark"],
  pet: ["Buddy","Luna","Rocky","Leo","Bella"],
  instagram: ["Insta","Vibe","Snap","Pic","Gram"],
  tiktok: ["Tok","Viral","Clip","Buzz","Loop"],
  youtube: ["Tube","Cast","Play","View","Stream"],
  twitter: ["Tweet","Post","Thread","Byte","X"],
  facebook: ["Social","Net","Face","Hub","Link"],
  deviantart: ["Art","Sketch","Draw","Ink","Deviant"],
  twitch: ["Live","Game","Play","Zone","Stream"],
  kick: ["Kick","Rush","Live","Flow","Cast"],
  username: ["Real","Official","Its","Hey","The"]
};

// ================= GENERATION ENGINE =================
function generateBatch(text){

  const words = text.split(" ");
  const base = words.slice(0,2).join("");

  const pool = prefixes[selectedCategory] || ["Neo","Zen","Pro"];

  const results = [];

  for(let i=0;i<12;i++){
    const p = pool[Math.floor(Math.random()*pool.length)];
    const n = p + base + Math.floor(Math.random()*99);
    results.push(n);
  }

  return { results };
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

// ================= GENERATE BUTTON =================
generateBtn.addEventListener("click", ()=>{

  if(!selectedCategory) return alert("Select category");
  const text = textarea.value.trim();
  if(!text) return alert("Write description");

  const batch = generateBatch(text);
  render(batch.results);
});
