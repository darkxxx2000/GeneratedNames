document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("generateButton");
  button.addEventListener("click", generateNames);
});

// Guardar nombres ya mostrados para evitar repetidos
let shownNames = new Set();

async function generateNames() {
  const description = document.getElementById("description").value.trim();
  if (!description) return alert("Please enter a description");

  // URL de tu Worker de Cloudflare (cambia esto por la tuya)
  const workerURL = 'https://name-generator.agustin2025z.workers.dev/';

  try {
    const response = await fetch(workerURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    });

    const text = await response.text();

    // Separar nombres por línea y eliminar vacíos
    let names = text.split(/\r?\n/).map(n => n.trim()).filter(n => n);

    // Filtrar nombres ya mostrados
    names = names.filter(n => !shownNames.has(n));

    // Guardar los nombres nuevos
    names.forEach(n => shownNames.add(n));

    if (names.length === 0) return alert("No hay nuevos nombres disponibles. Cambia la descripción o espera.");

    // Crear o actualizar popup
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
      popup.style.maxWidth = "90%";
      popup.style.maxHeight = "80%";
      popup.style.overflowY = "auto"; // scroll si hay muchos nombres
      document.body.appendChild(popup);
    }

    popup.innerHTML = `
      <h3 style="margin-bottom:15px;">Generated Names</h3>
      <ul style="list-style:none; padding:0; color:#fff; text-align:left;">
        ${names.map(n => `<li style="padding:4px 0;">${n}</li>`).join("")}
      </ul>
      <button onclick="this.parentElement.remove()" 
        style="margin-top:15px; padding:10px 20px; border:none; border-radius:6px; background:#1e90ff; color:white; cursor:pointer;">
        Close
      </button>
    `;

  } catch (error) {
    console.error("Error generating names:", error);
    alert("Hubo un error generando los nombres. Revisa tu Worker.");
  }
}
