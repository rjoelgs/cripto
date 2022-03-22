const divRender = document.querySelector('.render');
const input = document.querySelector('#cripto')

document.addEventListener('DOMContentLoaded', generarFetch);
document.addEventListener('keydown', buscar); 




function generarFetch(){
 fetch('https://api.coincap.io/v2/assets?limit=10')

 .then ((respuesta)=>{ return respuesta.json() })
 .then ((respuesta)=>{ dibujar( respuesta ) })
 .catch(error => console.log('error', error));
}

function dibujar(resultado){
  
const criptomonedas = resultado.data;
criptomonedas.map((moneda)=>{
   const tag = document.createElement('div');
   tag.innerHTML=`
   <div id="rank"><span>${moneda.rank}</span>
   <svg width="50px" height="50px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M255 471L91.7 387V41h328.6v346zm-147.3-93.74L255 453l149.3-75.76V57H107.7zm146.56-33.1l-94.66-48.69v50l94.54 48.62 98.27-49.89v-49.9z"/></svg>
   </div>
   <br>
   <h2>${moneda.id}</h2>
   <p>${moneda.priceUsd}</p>
   <button class="open-modal">Ver mas...</button>
   `
   tag.setAttribute('class', 'card');
   divRender.appendChild(tag);

})}

function buscar(e){
  if (e.key === 'Enter'){
    fetch(`api.coincap.io/v2/assets/${e.target.value}`)
    .then ((respuesta)=>{ return respuesta.json() })
    .then ((respuesta)=>{ dibujar( respuesta ) })
    .catch(error => console.log('error', error));
  }
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