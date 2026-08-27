const formulario = document.querySelector(".formulario-contato");
const mascaraForm = document.querySelector(".mascara-form");



function cliqueiNoBotao(){ 
     formulario.style.left = "5%";
    formulario.style.transform = " translateX(-50%); ";
    mascaraForm.style.visibility = "visible"

}

function esconderForm(){
     formulario.style.left = "-19.5%";
    formulario.style.transform = " translateX(0)";
    mascaraForm.style.visibility = "hidden";

}