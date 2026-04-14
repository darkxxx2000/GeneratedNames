function render(results, ctx){
  const container = document.getElementById("results");
  container.innerHTML = "";

  results.forEach(name => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div>
        <div class="name">${name}</div>
        <div class="tag">${ctx}</div>
      </div>
      <button class="copy">Copy</button>
    `;

    card.querySelector(".copy").onclick = () => {
      navigator.clipboard.writeText(name);
    };

    container.appendChild(card);
  });
}
