let selectedCategory = "business";

// ================== SELECCIÓN DE CATEGORÍAS ==================
document.addEventListener("DOMContentLoaded", () => {

  // Botones categorías normales
  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedCategory = btn.dataset.cat;
    });
  });

  // Botones sociales (barra)
  document.querySelectorAll(".social-bar button").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedCategory = btn.dataset.cat;
    });
  });

});

// ================== POOLS INTELIGENTES ==================
const pools = {
  business:["Solutions","Group","Corp","Studio","Works","Enterprise","Global","Partners"],
  brand:["Aura","Nova","Velvet","Echo","Zen","Luxe","Glow","Vibe"],
  gaming:["Rogue","Blaze","Frost","Hex","Vortex","Nyx","Drift","Phantom"],
  characters:["Elder","Storm","Rune","Myth","Drake","Shadow","Void","Zephyr"],
  tech:["Quantum","Byte","Nexa","Core","Logic","Data","Hyper","Nano"],
  product:["Prime","Ultra","Smart","Rapid","Pure","Bright","Fresh","Swift"],
  domain:["Hub","Base","Zone","Spot","Lab","Net","World","Place"],
  creative:["Nova","Mystic","Velour","Silent","Crimson","Solar","Dream","Vision"],
  pet:["Buddy","Milo","Luna","Rocky","Leo","Zoe","Max","Bella"],
  username:["Pixel","Neon","Vibe","Wave","Flux","Shadow","Echo","Nova"],
  instagram:["Insta","Gram","Vibe","Pix","Snap","Mood","Glow","Daily"],
  tiktok:["Tok","Viral","Clip","Beat","Trend","Loop","Pop","Flash"],
  youtube:["Tube","Play","Cast","View","Stream","Show","Channel","Media"],
  twitter:["Tweet","X","Post","Thread","Buzz","Chirp","Talk","Feed"],
  facebook:["Face","Book","Social","Connect","Wall","Share","Link","Net"],
  deviantart:["Art","Sketch","Ink","Muse","Draw","Canvas","Craft","Design"],
  twitch:["Live","Stream","Play","Rush","Arena","Zone","GG","Raid"],
  kick:["Kick","Live","Rush","Zone","Arena","Play","Stream","GG"]
};

// ================== GENERADOR ==================
function buildName(words){
  const a = words[Math.floor(Math.random()*words.length)];
  const b = words[Math.floor(Math.random()*words.length)];
  return a + " " + b;
}

function generateNames(){
  const words = pools[selectedCategory] || pools.business;
  let results = [];

  for(let i=0;i<9;i++){
    results.push(buildName(words));
  }

  return results;
}

// ================== RENDER ==================
document.getElementById("generateButton").addEventListener("click", ()=>{
  const desc = document.getElementById("description").value.trim();
  if(!desc) return;

  const names = generateNames();
  const box = document.getElementById("results");

  box.innerHTML = names
    .map(n=>`<div class="result-item">${n}</div>`)
    .join("");
});
