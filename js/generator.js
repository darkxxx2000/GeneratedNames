async function loadData(path){
  const res = await fetch(path);
  return await res.json();
}

function pick(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function mixWithUserText(name, text){
  if(!text) return name;
  const words = text.split(' ');
  const w = words[Math.floor(Math.random()*words.length)];
  return name + " " + w.charAt(0).toUpperCase() + w.slice(1);
}

async function init(jsonPath, outputId){
  const data = await loadData(jsonPath);
  const out = document.getElementById(outputId);
  const input = document.getElementById('desc');

  function run(){
    let names = [];
    for(let i=0;i<10;i++){
      const base = pick(data.prefix)+pick(data.core)+pick(data.suffix);
      names.push(mixWithUserText(base, input.value));
    }
    out.innerHTML = names.join('<br>');
  }

  run();
  document.getElementById('genBtn').onclick = run;
}
