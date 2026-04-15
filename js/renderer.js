function render(data, ctx){
  const container = document.getElementById("results");
  container.innerHTML = "";

  data.forEach(item => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div>
        <div class="name">${item.name}</div>
        <div class="tag">${ctx} • score ${item.score}</div>
      </div>
      <button class="copy">Copy</button>
    `;

    card.querySelector(".copy").onclick = () => {
      navigator.clipboard.writeText(item.name);
    };

    container.appendChild(card);
  });
}
