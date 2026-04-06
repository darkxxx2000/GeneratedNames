document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("generateButton");
  button.addEventListener("click", () => generateNames(false));
});

let shownNames = new Set();

// Función para asignar propósito según keywords de la descripción
function getPurpose(description) {
  description = description.toLowerCase();
  if (description.includes("fashion") || description.includes("clothing") || description.includes("brand")) return "Fashion Brand";
  if (description.includes("product") || description.includes("object") || description.includes("sell")) return "Product";
  if (description.includes("comic") || description.includes("character")) return "Comic Character";
  if (description.includes("social") || description.includes("instagram") || description.includes("youtube")) return "Social Media";
  if (description.includes("music") || description.includes("song") || description.includes("band")) return "Music Brand";
  return "General";
}

async function generateNames(generateMore = false) {
  const description = document.getElementById("description").value.trim();
  if (!description) return alert("Please enter a description");

  const workerURL = 'https://name-generator.agustin2025z.workers.dev/';

  try {
    const response = await fetch(workerURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    });

    if (!response.ok) throw new Error(`Worker returned status ${response.status}`);

    const text = await response.text();
    let names = text.split(/\r?\n/).map(n => n.trim()).filter(n => n);
    names = names.filter(n => !shownNames.has(n));
    names.forEach(n => shownNames.add(n));

    if (names.length === 0) return alert("All names already generated. Try a new description.");

    let popup = document.getElementById("names-popup");
    if (!popup || !generateMore) {
      popup = document.createElement("div");
      popup.id = "names-popup";
      popup.style.position = "fixed";
      popup.style.top = "50%";
      popup.style.left = "50%";
      popup.style.transform = "translate(-50%, -50%)";
      popup.style.background = "#1c1f2c";
      popup.style.padding = "25px";
      popup.style.borderRadius = "15px";
      popup.style.boxShadow = "0 0 25px rgba(0,0,0,0.7)";
      popup.style.zIndex = "1000";
      popup.style.textAlign = "center";
      popup.style.maxWidth = "90%";
      popup.style.maxHeight = "80%";
      popup.style.overflowY = "auto";
      document.body.appendChild(popup);

      popup.innerHTML = `
        <h3 style="margin-bottom:15px;">Generated Names</h3>
        <ul id="names-list" style="list-style:none; padding:0; color:#fff; text-align:left;"></ul>
        <div style="margin-top:15px;">
          <button id="generateMoreBtn"
            style="margin-right:10px; padding:10px 20px; border:none; border-radius:6px; background:#1e90ff; color:white; cursor:pointer;">
            Generate More
          </button>
          <button id="closePopupBtn"
            style="padding:10px 20px; border:none; border-radius:6px; background:#ff4c4c; color:white; cursor:pointer;">
            Close
          </button>
        </div>
      `;

      document.getElementById("generateMoreBtn").addEventListener("click", () => generateNames(true));
      document.getElementById("closePopupBtn").addEventListener("click", () => popup.remove());
    }

    const namesList = document.getElementById("names-list");
    names.forEach(n => {
      const li = document.createElement("li");
      li.style.padding = "6px 0";
      li.style.opacity = "0";
      li.style.transition = "opacity 0.5s ease";

      const purpose = getPurpose(description);
      li.innerHTML = `<strong>${n}</strong><br><span style="color:#aaa; font-size:0.85rem;">${purpose}</span>`;

      namesList.appendChild(li);

      // Animación fade-in
      requestAnimationFrame(() => {
        li.style.opacity = "1";
      });
    });

  } catch (error) {
    console.error("Error generating names:", error);
    alert("Error generating names. Check your Worker or try again.");
  }
}
