let selectedCategory = "business";

// Dropdown social
document.addEventListener("DOMContentLoaded", ()=>{
  const main = document.getElementById("socialMain");
  const drop = document.getElementById("socialDropdown");

  main.addEventListener("click", ()=>{
    drop.classList.toggle("show");
  });

  document.querySelectorAll(".categories button, .social-dropdown button").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      document.querySelectorAll(".categories button").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      selectedCategory = btn.dataset.cat || selectedCategory;
    });
  });
});

const pools = {
business:["Solutions","Group","Corp","Studio","Works","Enterprise"],
brand:["Aura","Nova","Velvet","Echo","Zen","Luxe"],
gaming:["Rogue","Blaze","Frost","Hex","Vortex","Nyx"],
fantasy:["Elder","Storm","Rune","Myth","Drake","Shadow"],
tech:["Quantum","Byte","Nexa","Core","Logic","Data"],
product:["Prime","Ultra","Smart","Rapid","Pure","Bright"],
domain:["Hub","Base","Zone","Spot","Lab","Net"],
creative:["Nova","Mystic","Velour","Silent","Crimson","Solar"],
pet:["Buddy","Milo","Luna","Rocky","Leo","Zoe"],
username:["Pixel","Neon","Vibe","Wave","Flux","Shadow"],
instagram:["Insta","Gram","Vibe","Pix","Snap","Mood"],
tiktok:["Tok","Viral","Clip","Beat","Trend","Loop"],
youtube:["Tube","Play","Cast","View","Stream","Show"],
twitter:["Tweet","X","Post","Thread","Buzz","Chirp"],
facebook:["Face","Book","Social","Connect","Wall","Share"],
deviantart:["Art","Sketch","Ink","Muse","Draw","Canvas"],
twitch:["Live","Stream","Play","Rush","Arena","Zone"],
kick:["Kick","Live","Rush","Zone","Arena","Play"]
};

function generateNames(){
  const words = pools[selectedCategory] || pools.business;
  let results = [];

  for(let i=0;i<8;i++){
    const a = words[Math.floor(Math.random()*words.length)];
    const b = words[Math.floor(Math.random()*words.length)];
    results.push(a + " " + b);
  }

  return results;
}

document.getElementById("generateButton").addEventListener("click", ()=>{
  const desc = document.getElementById("description").value.trim();
  if(!desc) return;

  const names = generateNames();
  const box = document.getElementById("results");
  box.innerHTML = names.map(n=>`<div class="name">${n}</div>`).join("");
});
