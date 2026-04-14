document.getElementById("generateButton").addEventListener("click", async () => {
  const text = document.getElementById("description").value;

  if(!text) return;

  const { results } = generateBatch(text);

  render(results);
});
