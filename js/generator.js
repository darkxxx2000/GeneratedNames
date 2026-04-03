async function loadData(path){
  const res = await fetch(path);
  return await res.json();
}

function pick(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function generate(data){
  const {prefix, core, suffix} = data;
  return `${pick(prefix)}${pick(core)}${pick(suffix)}`;
}

async function init(jsonPath, outputId){
  const data = await loadData(jsonPath);
  const out = document.getElementById(outputId);

  function run(){
    let names = [];
    for(let i=0;i<10;i++){
      names.push(generate(data));
    }
    out.innerHTML = names.join('<br>');
  }

  run();
  document.getElementById('genBtn').onclick = run;
}
