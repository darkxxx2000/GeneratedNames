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
    suffix: ["",""]
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

// ================= GENERATION ENGINE (CATEGORY CONTEXT) =================
function generateBatch(userText){

  const style = categoryStyles[selectedCategory];

  const cleanWords = userText
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g,"")
    .split(" ")
    .filter(w=>w.length>3);

  const keyword = cleanWords[0] 
      ? capitalize(cleanWords[0]) 
      : "";

  const resultsSet = new Set();

  while(resultsSet.size < 24){

    const tone = random(style.tone);
    const suffix = random(style.suffix);

    let name = "";

    switch(selectedCategory){

      case "business":
        name = tone + " " + suffix;
        break;

      case "brand":
        name = tone + keyword;
        break;

      case "gaming":
        name = tone + keyword + suffix;
        break;

      case "characters":
        name = tone + " " + suffix;
        break;

      case "tech":
        name = tone + " " + keyword + " " + suffix;
        break;

      case "product":
        name = tone + " " + keyword + " " + suffix;
        break;

      case "domain":
        name = tone + keyword.toLowerCase() + suffix;
        break;

      case "creative":
        name = tone + " " + keyword;
        break;

      case "pet":
        name = tone;
        break;

      // SOCIAL / USERNAMES
      default:
        name = (tone + keyword + suffix).replace(/\s/g,"");
    }

    resultsSet.add(name.trim());
  }

  return { results: Array.from(resultsSet) };
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
