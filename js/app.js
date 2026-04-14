document.getElementById("generateButton").addEventListener("click", () => {
  const text = document.getElementById("description").value;

  if (!text) return;

  const { ctx, results } = generate(text);

  render(results, ctx);
});
