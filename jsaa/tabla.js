
window.addEventListener("click",(e) =>{
    if(e.target.parentElement.dataset.id)
});

const actualizarTabla = (contenedor,date)=>{
    //Mientra contenedor tenga hijos
    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstElementChild);
    }
    contenedor.appendChild(crearTabla(data,"coral"));
}

//Crear tabla

//Actulizar tabla