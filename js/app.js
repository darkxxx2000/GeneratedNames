let selectedCategory = "generic";

document.querySelectorAll(".categories button").forEach(btn=>{
  btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.cat;
  });
});
document.getElementById("generateButton").addEventListener("click", () => {
  const text = document.getElementById("description").value;

  if (!text) return;

  const { ctx, results } = generate(text + " " + selectedCategory);

  render(results, ctx);
});
