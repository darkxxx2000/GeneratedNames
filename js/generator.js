document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("generateButton");
  button.addEventListener("click", generateNames);
});

function generateNames() {
  const description = document.getElementById("description").value.trim();
  const result = document.getElementById("result");

  if (!description) {
    result.innerHTML = "<p style='color:red;'>Please enter a description to generate names.</p>";
    return;
  }

  // Aquí puedes poner tu lógica real para generar nombres
  // Por ahora generaremos 5 nombres de ejemplo simulando un generador
  const exampleNames = [
    `${description} Alpha`,
    `${description} Nova`,
    `${description} Zenith`,
    `${description} Echo`,
    `${description} Orion`
  ];

  result.innerHTML = "<ul>" + exampleNames.map(name => `<li>${name}</li>`).join("") + "</ul>";
}
