document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generateButton").addEventListener("click", generateNames);
});

let usedNames = new Set();
const r = arr => arr[Math.floor(Math.random() * arr.length)];
const fuse = (a,b) => a.slice(0,a.length/2) + b.slice(b.length/2);

// -------- CONTEXT DETECTION --------
function detectContext(text){
  text = text.toLowerCase();

  if(/perfume|fragrance|scent|aroma/.test(text)) return "perfume";
  if(/fashion|clothing|apparel|wear|brand/.test(text)) return "fashion";
  if(/comic|hero|villain|character|fantasy/.test(text)) return "comic";
  if(/instagram|youtube|tiktok|username|nick/.test(text)) return "social";
  if(/music|dj|band|record|label/.test(text)) return "music";
  if(/tech|startup|app|software|ai/.test(text)) return "tech";
  if(/city|place|kingdom|world/.test(text)) return "places";
  if(/product|object|item|shop|store/.test(text)) return "product";

  return "generic";
}

// -------- DATA SETS --------
const data = {

perfume:{
a:["Élan","Noir","Velvet","Aure","Mystic","Lune","Silk","Amber","Opal","Scent","Ivory","Pearl"],
b:["Essence","Bloom","Aura","Mist","Elixir","Veil","Whisper","Touch","Note","Glow","Dream"]
},

fashion:{
a:["Urban","Nova","Velour","Thread","Loom","Drift","Stitch","Mode","Vogue","Weave","Form","Atelier"],
b:["Apparel","Wear","Line","Fabric","Fit","Studio","Collective","Style","Layer","Craft"]
},

comic:{
a:["Dread","Nyx","Vortex","Grim","Zephyr","Rogue","Shadow","Blaze","Frost","Void","Raven","Hex"],
b:["Knight","Sentinel","Blade","Hunter","Phantom","Lord","Rider","Forge","Warden","Strike"]
},

social:{
a:["pixel","neon","echo","mystic","velox","astro","nova","vibe","wave","flux"],
b:["zone","frame","pulse","grid","cast","hub","core","sync","lab","spot"]
},

music:{
a:["Sonic","Neon","Pulse","Echo","Wave","Rhythm","Bass","Tempo","Note","Beat"],
b:["Studio","District","Society","Collective","Lab","Sound","Records","Groove","Flow","Track"]
},

tech:{
a:["Quantum","Nexa","Byte","Core","Hyper","Nano","Cyber","Logic","Data","Pixel"],
b:["Systems","Labs","Works","Network","AI","Soft","Dynamics","Cloud","Ware","Stack"]
},

places:{
a:["Elder","Iron","Crystal","Storm","Golden","Shadow","Silent","Frozen","Ancient","Silver"],
b:["Haven","Reach","Vale","Kingdom","Sanctum","Harbor","Citadel","Realm","Terrace"]
},

product:{
a:["Prime","Ultra","Smart","Fresh","Pure","Rapid","Bright","Clear","Swift","True"],
b:["Box","Tool","Kit","Gear","Item","Pack","Unit","Device","Set","Craft"]
},

generic:{
a:["Neo","Solar","Crimson","Silent","Epic","Prime","Digital","Velvet","Mystic","Nova"],
b:["Horizon","Fusion","Sphere","Vision","Core","Storm","Cloud","Galaxy","Edge"]
}

};

// -------- NAME BUILDER --------
function buildName(ctx){
  const set = data[ctx];
  const a = r(set.a);
  const b = r(set.b);

  const styles = [
    () => `${a} ${b}`,
    () => `${a}${b}`,
    () => `${b}${a}`,
    () => `${fuse(a,b)}`,
    () => `${fuse(b,a)}`
  ];

  let name;
  do{
    name = r(styles)();
  }while(usedNames.has(name));

  usedNames.add(name);
  return name;
}

// -------- MAIN --------
function generateNames(){
  const text = document.getElementById("description").value.trim();
  if(!text) return alert("Write a description");

  const ctx = detectContext(text);

  const names = [];
  for(let i=0;i<5;i++){
    names.push(buildName(ctx));
  }

  showPopup(names);
}

// -------- POPUP --------
function showPopup(names){
  let popup = document.getElementById("names-popup");
  if(!popup){
    popup = document.createElement("div");
    popup.id = "names-popup";
    document.body.appendChild(popup);
  }

  popup.innerHTML = `
    <div style="
      position:fixed;
      top:50%;left:50%;
      transform:translate(-50%,-50%);
      background:#0f172a;
      color:white;
      padding:30px;
      border-radius:18px;
      box-shadow:0 0 40px rgba(0,0,0,.6);
      text-align:center;
      z-index:9999;
      width:340px;">
      <h2>Generated Names</h2>
      ${names.map(n=>`<div style="margin:8px 0;font-size:18px;">${n}</div>`).join("")}
      <button onclick="document.getElementById('names-popup').remove()"
        style="margin-top:15px;padding:8px 18px;border:none;border-radius:8px;background:#2563eb;color:white;cursor:pointer;">
        Close
      </button>
    </div>
  `;
}
