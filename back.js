(function(){
    var lista = document.getElementById("lista"),
        tareaInput = document.getElementById("tareaInput"),
        btnNuevaTarea = document.getElementById("btn-agregar");

    //Funciones 
    var agregarTarea = function(){
        var tarea = tareaInput.value,
            nuevaTarea = document.createElement("li"),
            enlace = document.createElement("a"),
            contenido = document.createTextNode(tarea);
           
        if (tarea == "") {
            tareaInput.setAttribute("placeholder", "agrega una tarea valida");
            tareaInput.className = "error";
            return false;
        }    
        // agregar contenido al enlace 
        enlace.appendChild(contenido);
        //Atributos
        enlace.setAttribute("href", "#");
        //agregar enlace
        nuevaTarea.appendChild(enlace);
        //agregar tarea a lista
        lista.appendChild(nuevaTarea)

        tareaInput.value = "";

        for (var i = 0; i <= lista.children.length -1; i++) {
            lista.children[i].addEventListener("click", function(){
                this.parentNode.removeChild(this);
            });
        } 
    };
    var comprobarInput = function(){
        tareaInput.className = "";
        tareaInput.setAttribute("placeholder", "agrega tu tarea");
    };
    var eliminarTarea = function(){
       this.parentNode.removeChild(this);
    };
    const image = document.getElementById("img"),
        input = document.getElementById("imput");

        input.addEventListener("change", () => {
            image.src = URL.createObjectURL(input.files[0]);
        });
        const dateInput = document.getElementById('dato');
        const pElement = document.getElementById('p');

    
    //Eventos

    //Agregar tarea
    btnNuevaTarea.addEventListener("click", agregarTarea);

    // comprobar 
    tareaInput.addEventListener("click", comprobarInput);
    //borrar elementos
    for (var i = 0; i <= lista.children.length -1; i++) {
        lista.children[i].addEventListener("click", eliminarTarea);
    }


}())