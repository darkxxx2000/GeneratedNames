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
const rand = arr => arr[Math.floor(Math.random()*arr.length)];
const cap = w => w.charAt(0).toUpperCase() + w.slice(1);

// ================= SYLLABLE ENGINE =================
const syllables = [
  "zor","vel","kai","dra","nyx","vor","lum","vex","aria","thal",
  "zen","quor","ryn","lex","myr","sol","nex","pyx","tor","vyn"
];

function makeWord(parts=2){
  let w="";
  for(let i=0;i<parts;i++) w += rand(syllables);
  return cap(w);
}

// ================= LEXIC POOLS =================
const lexic = {
  dark:["Shadow","Void","Night","Obsidian","Raven","Phantom"],
  tech:["Quantum","Byte","Cyber","Nexus","Logic","Sync"],
  cute:["Mimi","Lulu","Bunny","Puff","Nala","Milo"],
  power:["Ultra","Hyper","Volt","Turbo","Max"],
  fantasy:["Eld","Rune","Myth","Arc","Dragon","Storm"],
  business:["Group","Systems","Holdings","Solutions","Enterprises"],
  domain:["app","hub","site","online","web"]
};

// ================= PARSER =================
function extractKeywords(text){
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g,"")
    .split(" ")
    .filter(w=>w.length>3)
    .slice(0,3)
    .map(cap);
}

function detectIntent(text){
  const t = text.toLowerCase();
  if(t.match(/dark|shadow|evil|night|horror/)) return "dark";
  if(t.match(/cute|pet|baby|soft/)) return "cute";
  if(t.match(/tech|ai|cyber|digital|future/)) return "tech";
  if(t.match(/fast|power|energy|speed/)) return "power";
  if(t.match(/magic|fantasy|dragon|king/)) return "fantasy";
  return "neutral";
}

// ================= CATEGORY =================
function setCategory(cat, btn){
  selectedCategory = cat;

  document.querySelectorAll(".cat-btn, #socialBar button")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");
  textarea.disabled = false;
  textarea.focus();
}

catButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>setCategory(btn.dataset.cat, btn));
});

socialMain.addEventListener("click", ()=>{
  socialBar.classList.toggle("show");
});

socialButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>setCategory(btn.dataset.cat, btn));
});

// ================= NAME PATTERNS =================
function buildName(keywords, intent){

  const kw = keywords[0] || "";
  const intentWord = lexic[intent] ? rand(lexic[intent]) : "";

  switch(selectedCategory){

    case "business":
      return `${makeWord(2)} ${rand(lexic.business)}`;

    case "brand":
      return `${makeWord(2)}${kw}`;

    case "gaming":
      return `${intentWord}${makeWord(1)}${kw}`;

    case "characters":
      return `${makeWord(2)} ${intentWord}`;

    case "tech":
      return `${intentWord} ${makeWord(2)}`;

    case "product":
      return `${intentWord} ${kw} Pro`;

    case "domain":
      return `${makeWord(2).toLowerCase()}${rand(lexic.domain)}`;

    case "creative":
      return `${makeWord(3)}`;

    case "pet":
      return rand(lexic.cute);

    default: // social / usernames
      return `${intentWord}${makeWord(1)}${kw}`.replace(/\s/g,"");
  }
}

// ================= GENERATE =================
function generateBatch(text){
  const keywords = extractKeywords(text);
  const intent = detectIntent(text);

  const set = new Set();

  while(set.size < 24){
    set.add(buildName(keywords, intent));
  }

  return Array.from(set);
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

// ================= BUTTON =================
generateBtn.addEventListener("click", ()=>{
  if(!selectedCategory) return alert("Select category");
  const text = textarea.value.trim();
  if(!text) return alert("Write description");

  const names = generateBatch(text);
  render(names);
});
