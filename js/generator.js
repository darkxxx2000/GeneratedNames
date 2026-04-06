document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generateButton").addEventListener("click", generateNames);
});

async function generateNames() {
  const description = document.getElementById("description").value.trim();
  const result = document.getElementById("result");

  if (!description) {
    result.innerHTML = "<p style='color:red;'>Please enter a description to generate names.</p>";
    return;
  }

  result.innerHTML = "<p>Generating names...</p>";

  try {
    const response = await fetch("https://TU_SUBDOMINIO_WORKER.cloudflareworkers.com/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: description })
    });

    const data = await response.json();

    if (!data.names || !Array.isArray(data.names)) {
      throw new Error("Unexpected API response format.");
    }

    result.innerHTML = "<ul>" + data.names.map(name => `<li>${name}</li>`).join("") + "</ul>";
  } catch (error) {
    console.error(error);
    result.innerHTML = `<p style="color:red;">Error generating names: ${error.message}</p>`;
  }
}
