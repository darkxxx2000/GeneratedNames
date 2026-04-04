async function generateNames() {
  const input = document.getElementById("description");
  const desc = input.value.trim() || localStorage.getItem("desc") || "";
  const resultDiv = document.getElementById("result");

  if (!desc) {
    alert("Please describe what you need.");
    return;
  }

  localStorage.removeItem("desc");
  resultDiv.innerHTML = "Generating names...";

  try {
    const response = await fetch("https://name-generator.agustin2025z.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: desc })
    });

    const text = await response.text();

    const names = text
      .split("\n")
      .map(n => n.trim())
      .filter(n => n.length > 0);

    resultDiv.innerHTML = names
      .map(name => `<div class="name-item">${name}</div>`)
      .join("");

  } catch (err) {
    resultDiv.innerHTML = "Error generating names. Try again.";
  }
}
