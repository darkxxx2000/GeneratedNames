// ================= ESTADO GLOBAL =================
let selectedCategory = null;

const textarea = document.getElementById("description");
const generateBtn = document.getElementById("generateButton");
const results = document.getElementById("results");

const catButtons = document.querySelectorAll(".cat-btn");
const socialButtons = document.querySelectorAll("#socialBar button");
const socialMain = document.getElementById("socialMain");
const socialBar = document.getElementById("socialBar");

// ======= BLOQUEAR ESCRITURA HASTA ELEGIR CATEGORÍA =======
textarea.disabled = true;
textarea.placeholder = "Select a category first...";

// ================= SELECCIÓN DE CATEGORÍA =================
function setCategory(cat, btn) {
  selectedCategory = cat;

  document.querySelectorAll(".cat-btn, #socialBar button")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");

  textarea.disabled = false;
  textarea.placeholder = "Describe what you need...";
  textarea.focus();
}

// botones normales
catButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    setCategory(btn.dataset.cat, btn);
  });
});

// botón social SOLO despliega (NO es categoría)
socialMain.addEventListener("click", () => {
  socialBar.classList.toggle("show");
});

// botones redes sociales
socialButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    setCategory(btn.dataset.cat, btn);
  });
});

// ================= GENERADOR INTELIGENTE =================
generateBtn.addEventListener("click", () => {

  if (!selectedCategory) {
    alert("You must select a category first.");
    return;
  }

  const desc = textarea.value.trim();
  if (!desc) {
    alert("Describe what you need.");
    return;
  }

  results.innerHTML = "";

  // 🔥 palabras limpias y capitalizadas
  const words = desc
    .split(" ")
    .filter(w => w.length > 3)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1));

  const prefixes = {
    business: ["Prime", "Nova", "Vertex", "Core", "Apex"],
    brand: ["Luma", "Viva", "Zest", "Echo", "Aura"],
    gaming: ["Shadow", "Rogue", "Phantom", "Blaze", "Fury"],
    characters: ["Eldor", "Nyra", "Kael", "Zorin", "Lyra"],
    tech: ["Byte", "Code", "Nex", "Sync", "Logic"],
    product: ["Flex", "Ultra", "Max", "Smart", "Pure"],
    domain: ["Get", "Try", "Go", "My", "The"],
    creative: ["Muse", "Ink", "Dream", "Pixel", "Spark"],
    pet: ["Buddy", "Luna", "Rocky", "Leo", "Bella"],
    instagram: ["Insta", "Gram", "Vibe", "Snap", "Pic"],
    tiktok: ["Tok", "Viral", "Clip", "Loop", "Buzz"],
    youtube: ["Tube", "Play", "Cast", "Stream", "View"],
    twitter: ["Tweet", "X", "Post", "Thread", "Byte"],
    facebook: ["Face", "Book", "Social", "Net", "Hub"],
    deviantart: ["Art", "Deviant", "Sketch", "Draw", "Ink"],
    twitch: ["Live", "Stream", "Game", "Play", "Zone"],
    kick: ["Kick", "Live", "Rush", "Flow", "Cast"],
    username: ["Real", "Official", "Its", "Hey", "The"]
  };

  const pool = prefixes[selectedCategory] || ["Neo"];

  function buildName(){
    const p = pool[Math.floor(Math.random() * pool.length)];
    const w = words[Math.floor(Math.random() * words.length)];
    const s = ["Labs","Works","Hub","Zone","Forge","Studio"][Math.floor(Math.random()*6)];
    return `${p}${w}${s}`;
  }

  for(let i=0;i<9;i++){
    const div = document.createElement("div");
    div.className = "result-item"; // usa tu CSS real
    div.textContent = buildName();
    results.appendChild(div);
  }

});
