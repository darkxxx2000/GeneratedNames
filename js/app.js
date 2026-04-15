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

// ================= HELPERS =================
function random(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function capitalize(word){
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// ================= CATEGORY STYLES (CONTEXT) =================
const categoryStyles = {
  business: {
    tone: ["Prime","Vertex","Apex","Core","Noble","Summit"],
    suffix: ["Solutions","Group","Enterprises","Holdings","Systems"]
  },
  brand: {
    tone: ["Nexa","Luma","Vexa","Zyra","Kairo","Auro"],
    suffix: [""]
  },
  gaming: {
    tone: ["Shadow","Rogue","Phantom","Blaze","Fury","Venom"],
    suffix: ["X","Z",""]
  },
  characters: {
    tone: ["Eldor","Nyra","Kael","Zorin","Lyra","Vael"],
    suffix: ["Nightfall","Stormborn","Darkwood","Ravencrest"]
  },
  tech: {
    tone: ["Quantum","Byte","Nex","Logic","Sync","Cyber"],
    suffix: ["AI","Labs","Systems","Tech","Digital"]
  },
  product: {
    tone: ["Ultra","Smart","Flex","Pure","Max","Nova"],
    suffix: ["Pro","Plus","Go","One"]
  },
  domain: {
    tone: ["get","try","go","my","the"],
    suffix: ["app","hub","online","site"]
  },
  creative: {
    tone: ["Muse","Ink","Dream","Pixel","Spark","Echo"],
    suffix: [""]
  },
  pet: {
    tone: ["Luna","Rocky","Leo","Bella","Milo","Nala"],
    suffix: [""]
  },
  instagram: { tone:["Vibe","Insta","Snap","Pic","Gram"], suffix:["xo","tv",""] },
  tiktok: { tone:["Tok","Viral","Buzz","Clip","Loop"], suffix:["tv","live",""] },
  youtube: { tone:["Tube","Cast","Play","View","Stream"], suffix:["tv","official",""] },
  twitter: { tone:["Tweet","Thread","Post","Byte","X"], suffix:["io","hub",""] },
  facebook: { tone:["Social","Net","Link","Hub","Face"], suffix:["zone",""] },
  deviantart: { tone:["Art","Sketch","Draw","Ink","Deviant"], suffix:["lab",""] },
  twitch: { tone:["Live","Game","Zone","Play","Stream"], suffix:["tv","gg",""] },
  kick: { tone:["Kick","Rush","Flow","Cast","Live"], suffix:["tv","live",""] },
  username: { tone:["Real","Hey","Its","The","Official"], suffix:["xo","yt",""] }
};

// ================= INTELLIGENT PARSER =================
function extractKeywords(text){
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g,"")
    .split(" ")
    .filter(w => w.length > 3)
    .slice(0,4)
    .map(capitalize);
}

function detectIntent(words){
  const joined = words.join(" ").toLowerCase();

  if(joined.match(/dark|shadow|night|evil|horror/)) return "dark";
  if(joined.match(/cute|sweet|soft|baby|pet/)) return "cute";
  if(joined.match(/tech|ai|digital|cyber|future/)) return "tech";
  if(joined.match(/fast|speed|energy|power/)) return "power";
  if(joined.match(/magic|fantasy|dragon|king|queen/)) return "fantasy";

  return "neutral";
}

const intentModifiers = {
  dark: ["Shadow","Void","Night","Obsidian"],
  cute: ["Mimi","Bunny","Lulu","Puff"],
  tech: ["Neo","Quantum","Byte","Nex"],
  power: ["Ultra","Hyper","Turbo","Volt"],
  fantasy: ["Eld","Myth","Rune","Arc"],
  neutral: [""]
};

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

// ================= GENERATION ENGINE (INTELIGENTE REAL) =================
function generateBatch(userText){

  const style = categoryStyles[selectedCategory];
  const keywords = extractKeywords(userText);
  const intent = detectIntent(keywords);
  const modifierPool = intentModifiers[intent];

  const results = [];
  const attemptsMax = 200; // evita loop infinito
  let attempts = 0;

  while(results.length < 24 && attempts < attemptsMax){
    attempts++;

    const tone = random(style.tone);
    const suffix = random(style.suffix);
    const modifier = random(modifierPool);
    const kw1 = keywords[0] || "";
    const kw2 = keywords[1] || "";

    let name = "";

    switch(selectedCategory){
      case "business":
        name = `${tone} ${modifier} ${suffix}`;
        break;

      case "brand":
        name = `${modifier}${kw1}${tone}`;
        break;

      case "gaming":
        name = `${modifier}${tone}${kw1}${suffix}`;
        break;

      case "characters":
        name = `${tone} ${modifier}${kw1}`;
        break;

      case "tech":
        name = `${modifier} ${kw1} ${tone} ${suffix}`;
        break;

      case "product":
        name = `${tone} ${kw1} ${suffix}`;
        break;

      case "domain":
        name = `${tone}${kw1}${suffix}`.toLowerCase();
        break;

      case "creative":
        name = `${modifier} ${kw1} ${tone}`;
        break;

      case "pet":
        name = `${modifier}${tone}`;
        break;

      default:
        name = `${modifier}${kw1}${tone}${suffix}`.replace(/\s/g,"");
    }

    if(!results.includes(name.trim())){
      results.push(name.trim());
    }
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
