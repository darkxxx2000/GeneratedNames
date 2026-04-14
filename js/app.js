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

  // quitar activo a todos
  document.querySelectorAll(".cat-btn, #socialBar button, #socialMain")
    .forEach(b => b.classList.remove("active"));

  // marcar activo
  btn.classList.add("active");

  // habilitar textarea
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

// botón social dorado
socialMain.addEventListener("click", () => {
  socialBar.classList.toggle("show");
  setCategory("social", socialMain);
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

  const words = desc.split(" ");
  const base = words.slice(0, 2).join("");

  function smartNames() {
    const names = [];

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

    const pool = prefixes[selectedCategory] || ["Pro", "Neo", "Zen"];

    for (let i = 0; i < 9; i++) {
      const p = pool[Math.floor(Math.random() * pool.length)];
      const name = p + base + Math.floor(Math.random() * 99);
      names.push(name);
    }

    return names;
  }

  const generated = smartNames();

  generated.forEach(n => {
    const div = document.createElement("div");
    div.className = "result-card";
    div.textContent = n;
    results.appendChild(div);
  });

});
