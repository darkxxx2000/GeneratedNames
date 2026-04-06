window.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button");
  const input = document.getElementById("description");
  const result = document.getElementById("result");

  btn.addEventListener("click", async () => {
    const description = input.value.trim();
    if (!description) {
      alert("Write something first");
      return;
    }

    result.textContent = "Generating names...";

    try {
      const res = await fetch("https://name-generator.agustin2025z.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description })
      });

      const text = await res.text();
      result.textContent = text;

    } catch (err) {
      result.textContent = "Error: " + err.message;
    }
  });
});
