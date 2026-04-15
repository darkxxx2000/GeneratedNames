let selectedCategory = null;

const textarea = document.getElementById("description");
const generateBtn = document.getElementById("generateButton");
const results = document.getElementById("results");

const catButtons = document.querySelectorAll(".cat-btn");
const socialButtons = document.querySelectorAll("#socialBar button");
const socialMain = document.getElementById("socialMain");
const socialBar = document.getElementById("socialBar");

// ================= INIT =================
textarea.disabled = true;
textarea.placeholder = "Select a category first...";

// ================= CATEGORY =================
function setCategory(cat, btn){
  selectedCategory = cat;

  document.querySelectorAll(".cat-btn, #socialBar button")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");

  textarea.disabled = false;
  textarea.focus();
}

// ================= EVENTS =================
catButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>setCategory(btn.dataset.cat, btn));
});

socialMain.addEventListener("click", ()=>{
  socialBar.classList.toggle("show");
});

socialButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>setCategory(btn.dataset.cat, btn));
});

// ================= GENERATE =================
generateBtn.addEventListener("click", ()=>{

  if(!selectedCategory) return alert("Select category");

  const text = textarea.value.trim();
  if(!text) return alert("Write description");

  const batch = generateBatch(text);

  render(batch.results, batch.ctx);
});
