// =======================
// STATE
// =======================
let usedNames = new Set();

// =======================
// UTILITIES
// =======================
const r = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fuse = (a, b) =>
  a.slice(0, Math.ceil(a.length / 2)) +
  b.slice(Math.floor(b.length / 2));

// =======================
// CONTEXT DETECTION
// =======================
function detectContext(text) {
  text = text.toLowerCase();

  if (/perfume|fragrance|scent|aroma/.test(text)) return "perfume";
  if (/fashion|clothing|apparel|wear|brand/.test(text)) return "fashion";
  if (/comic|hero|villain|character|fantasy/.test(text)) return "comic";
  if (/instagram|youtube|tiktok|username|nick/.test(text)) return "social";
  if (/music|dj|band|record|label/.test(text)) return "music";
  if (/tech|startup|app|software|ai/.test(text)) return "tech";
  if (/city|place|kingdom|world/.test(text)) return "places";
  if (/product|object|item|shop|store/.test(text)) return "product";

  return "generic";
}

// =======================
// DATA
// =======================
const data = {
  perfume: {
    a: ["Élan","Noir","Velvet","Aure","Mystic","Lune","Silk","Amber","Opal","Ivory"],
    b: ["Essence","Bloom","Aura","Mist","Elixir","Veil","Whisper","Glow","Dream"]
  },
  fashion: {
    a: ["Urban","Nova","Velour","Thread","Loom","Drift","Stitch","Mode","Vogue"],
    b: ["Apparel","Wear","Line","Fabric","Studio","Collective","Style","Craft"]
  },
  comic: {
    a: ["Dread","Nyx","Vortex","Grim","Shadow","Blaze","Frost","Void","Raven"],
    b: ["Knight","Sentinel","Blade","Hunter","Phantom","Lord","Warden","Strike"]
  },
  social: {
    a: ["pixel","neon","echo","mystic","astro","nova","vibe","wave","flux"],
    b: ["zone","frame","pulse","grid","hub","sync","lab","core","cast"]
  },
  music: {
    a: ["Sonic","Neon","Pulse","Echo","Wave","Rhythm","Bass","Tempo","Beat"],
    b: ["Studio","District","Collective","Lab","Records","Groove","Flow"]
  },
  tech: {
    a: ["Quantum","Nexa","Byte","Core","Hyper","Nano","Cyber","Logic","Data"],
    b: ["Systems","Labs","Network","AI","Cloud","Stack","Dynamics","Works"]
  },
  places: {
    a: ["Elder","Iron","Crystal","Storm","Golden","Shadow","Silent","Frozen"],
    b: ["Haven","Reach","Vale","Kingdom","Sanctum","Harbor","Citadel","Realm"]
  },
  product: {
    a: ["Prime","Ultra","Smart","Fresh","Pure","Rapid","Bright","Clear","Swift"],
    b: ["Box","Tool","Kit","Gear","Pack","Unit","Device","Set","Craft"]
  },
  generic: {
    a: ["Neo","Solar","Crimson","Silent","Epic","Prime","Digital","Velvet","Mystic"],
    b: ["Horizon","Fusion","Sphere","Vision","Core","Storm","Cloud","Galaxy","Edge"]
  }
};

// =======================
// GENERATION ENGINE
// =======================
function buildLocal(ctx) {
  const set = data[ctx] || data.generic;

  let name;
  let attempts = 0;

  do {
    const a = r(set.a);
    const b = r(set.b);

    const styles = [
      () => `${a} ${b}`,
      () => `${a}${b}`,
      () => `${b}${a}`,
      () => fuse(a, b)
    ];

    name = r(styles)();
    attempts++;

  } while (usedNames.has(name) && attempts < 10);

  usedNames.add(name);
  return name;
}

// =======================
// AI FALLBACK (SAFE)
// =======================
async function getAIName(prompt) {
  try {
    const res = await fetch("https://name-generator.agustin2025z.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const txt = await res.text();

    if (!txt || txt.includes('"local":true')) return null;

    const obj = JSON.parse(txt);
    return obj?.[0]?.generated_text?.replace(prompt, "").trim();

  } catch (e) {
    return null;
  }
}

// =======================
// MAIN FUNCTION
// =======================
async function generateNames() {
  const input = document.getElementById("description");
  const text = input.value.trim();

  if (!text) {
    alert("Write a description");
    return;
  }

  const ctx = detectContext(text);
  const prompt = `Create a unique name for: ${text}`;

  const names = [];

  for (let i = 0; i < 6; i++) {
    const ai = await getAIName(prompt);
    names.push(ai || buildLocal(ctx));
  }

  showPopup(names);
}

// =======================
// UI (PRESENTATION ONLY)
// =======================
function showPopup(names) {
  let popup = document.getElementById("names-popup");

  if (!popup) {
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
      padding:25px;
      border-radius:15px;
      text-align:center;
      z-index:9999;
      width:320px;
    ">
      <h2>Generated Names</h2>

      ${names.map(n => `<div style="margin:8px 0;font-size:18px;">${n}</div>`).join("")}

      <button onclick="document.getElementById('names-popup').remove()"
        style="margin-top:15px;padding:8px 16px;border:none;border-radius:8px;background:#2563eb;color:white;cursor:pointer;">
        Close
      </button>
    </div>
  `;
}

// =======================
// INIT
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateButton");
  if (btn) btn.addEventListener("click", generateNames);
});
