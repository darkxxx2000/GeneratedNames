function render(names){
  const container = document.getElementById("results");
  container.innerHTML = "";

  names.forEach(n=>{
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <span>${n}</span>
      <button class="copy">Copy</button>
    `;

    div.querySelector(".copy").onclick = () => {
      navigator.clipboard.writeText(n);
    };

    container.appendChild(div);
  });
}
