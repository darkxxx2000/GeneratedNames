document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("generateButton");
  button.addEventListener("click", generateNames);
});

let usedNames = new Set();

function generateRandomName(base) {
  const adjectives = ["Alpha", "Nova", "Zenith", "Echo", "Orion", "Luminous", "Quantum", "Velvet", "Solar", "Crimson"];
  const nouns = ["Vibe", "Aura", "Spark", "Pulse", "Wave", "Realm", "Edge", "Horizon", "Fusion", "Sphere"];

  let name;
  do {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    name = `${base} ${adj} ${noun}`;
  } while (usedNames.has(name));
  
  usedNames.add(name);
  return name;
}

function generateNames() {
  const description = document.getElementById("description").value.trim();
  if (!description) return alert("Please enter a description");

  const names = [];
  for (let i = 0; i < 5; i++) {
    names.push(generateRandomName(description));
  }

  // Mostrar nombres en popup encima de ejemplos
  let popup = document.getElementById("names-popup");
  if (!popup) {
    popup = document.createElement("div");
    popup.id = "names-popup";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "#1c1f2c";
    popup.style.padding = "25px";
    popup.style.borderRadius = "15px";
    popup.style.boxShadow = "0 0 20px rgba(0,0,0,0.7)";
    popup.style.zIndex = "1000";
    popup.style.textAlign = "center";
    document.body.appendChild(popup);
  }

  popup.innerHTML = `
    <h3>Generated Names</h3>
    <ul style="list-style:none; padding:0; color:#fff;">
      ${names.map(n => `<li>${n}</li>`).join("")}
    </ul>
    <button onclick="this.parentElement.remove()" style="margin-top:10px; padding:8px 15px; border:none; border-radius:6px; background:#1e90ff; color:white; cursor:pointer;">Close</button>
  `;
}
