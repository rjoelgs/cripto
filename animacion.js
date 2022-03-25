
export function animacion(){
        gsap.from(".img", {
        duration: 2,
        scale: 0.5, 
        opacity: 0, 
        delay: 0.5, 
        stagger: 0.2,
        ease: "elastic", 
        force3D: true
      });
}