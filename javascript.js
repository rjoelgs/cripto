const divRender = document.querySelector('.render');
const input = document.querySelector('#cripto');
const todasCriptoBtn = document.querySelector('#buttonTodas');
const volverBtn = document.querySelector('.hiden');
const capitalizacionBtn = document.querySelector('#capitalizacion');

document.addEventListener('DOMContentLoaded', generarFetch('https://api.coincap.io/v2/assets?limit=10'));
input.addEventListener('keydown', buscar); 
todasCriptoBtn.addEventListener('click', todasCripto);
volverBtn.addEventListener('click', volver);
capitalizacion.addEventListener('click', capitalizacionCripto);




function generarFetch(url){
 fetch(url)

 .then ((respuesta)=>{ return respuesta.json() })
 .then ((respuesta)=>{ dibujar( respuesta ) })
 .catch(error => console.log('error', error));
}

function dibujar(resultado){
  
const criptomonedas = resultado.data;
criptomonedas.map((moneda)=>{
   const tag = document.createElement('div');
   const price = Number(moneda.priceUsd).toFixed(2);
   tag.innerHTML=`
   <div class="rank"><span>${moneda.rank}</span></div>
   <br>
   <h2>${moneda.symbol}</h2>
   <h2>${moneda.id}</h2>
   <p>precio: $${price}</p>
   `
   tag.setAttribute('class', 'card');
   divRender.appendChild(tag);
})

 if(criptomonedas.length > 10){
   volverBtn.style.display = 'block'
 }


}

function buscar(e){
  if (e.key === 'Enter'){
    fetch(`https://api.coincap.io/v2/assets/${e.target.value}`)
    .then( respuesta => respuesta.json() )
    .then(resultado => mostrar(resultado))
    .catch(error => mostrarError())
  }
}

function mostrar(dato) {

  while(divRender.firstChild){
    divRender.removeChild(divRender.firstChild);
  }
  
  const moneda = dato.data;
  const tag = document.createElement('div');
   const price = Number(moneda.priceUsd).toFixed(2);
   tag.innerHTML=`
   <div class="rank"><span>${moneda.rank}</span></div>
   <br>
   <h2>${moneda.symbol}</h2>
   <h2>${moneda.id}</h2>
   <p>precio: $${price}</p>
   `
   tag.setAttribute('class', 'card');
   divRender.appendChild(tag);

}

gsap.from(".img", {
  duration: 2,
  scale: 0.5, 
  opacity: 0, 
  delay: 0.5, 
  stagger: 0.2,
  ease: "elastic", 
  force3D: true
});

function todasCripto(){
  while(divRender.firstChild){
    divRender.removeChild(divRender.firstChild);
  }

  generarFetch('https://api.coincap.io/v2/assets')

}

function volver(){
  window.location.reload()
}

function capitalizacionCripto(){
  while(divRender.firstChild){
    divRender.removeChild(divRender.firstChild);
  }

  fetch('https://api.coincap.io/v2/assets?limit=10')
  .then (respuesta => respuesta.json())
  .then (resultado => convertir(resultado))
}

function convertir(resultado){
  datos = resultado.data
  console.log(datos)

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'myChart' )
    divRender.appendChild(canvas)
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [datos[0].id, datos[1].id, datos[2].id, datos[3].id, datos[4].id, datos[5].id],
            datasets: [{
                label: 'capitalización',
                data: [datos[0].marketCapUsd, datos[1].marketCapUsd, datos[2].marketCapUsd, datos[3].marketCapUsd, datos[4].marketCapUsd, datos[5].marketCapUsd],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
       
    });

  }


