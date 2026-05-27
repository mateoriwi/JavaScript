// Seleccionamos el input usando getElementById
const inputNota = document.getElementById("inputNota");

// Seleccionamos el botón usando querySelector
const btnAgregar = document.querySelector("#btnAgregar");

// Seleccionamos la lista usando getElementById
const listaNotas = document.getElementById("listaNotas");

// Seleccionamos el párrafo de mensaje usando querySelector
const mensaje = document.querySelector("#mensaje");

// Mostramos en consola las referencias para confirmar que existen
console.log("Input seleccionado:", inputNota);
console.log("Botón seleccionado:", btnAgregar);
console.log("Lista seleccionada:", listaNotas);
console.log("Mensaje seleccionado:", mensaje);




let notas = [];




function guardarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));

    console.log("Notas guardadas en Local Storage:", notas);
}



function crearNotaEnDOM(textoNota) {
    // Creamos el elemento <li>
    const li = document.createElement("li");

    // Creamos un span para guardar el texto de la nota
    const spanTexto = document.createElement("span");

    // Modificamos el contenido usando textContent
    spanTexto.textContent = textoNota;

    // Creamos el botón de eliminar
    const btnEliminar = document.createElement("button");

    // Modificamos el contenido del botón con textContent
    btnEliminar.textContent = "Eliminar";

    // Agregamos el texto y el botón dentro del <li>
    li.appendChild(spanTexto);
    li.appendChild(btnEliminar);

    // Agregamos el <li> dentro de la <ul>
    listaNotas.appendChild(li);

    // Evento para eliminar una nota
    btnEliminar.addEventListener("click", function () {
        // Eliminamos el <li> desde la <ul> usando removeChild
        listaNotas.removeChild(li);

        // Eliminamos la nota del arreglo usando filter
        notas = notas.filter(function (nota) {
            return nota !== textoNota;
        });

        // Guardamos el arreglo actualizado en Local Storage
        guardarNotas();

        // Mostramos mensaje en pantalla
        mensaje.textContent = "Nota eliminada correctamente.";

        // Evidencia en consola
        console.log("Nota eliminada:", textoNota);
        console.log("Lista actualizada:", notas);
    });
}


btnAgregar.addEventListener("click", function () {
    // Tomamos el valor escrito en el input
    const textoNota = inputNota.value.trim();

    // Validamos que el input no esté vacío
    if (textoNota === "") {
        mensaje.textContent = "Por favor, escribe una nota antes de agregarla.";
        console.log("No se agregó la nota porque el input está vacío.");

        // Enfocamos otra vez el input
        inputNota.focus();

        return;
    }

    // Agregamos la nota al arreglo en memoria
    notas.push(textoNota);

    // Creamos la nota visualmente en el DOM
    crearNotaEnDOM(textoNota);

    // Guardamos las notas en Local Storage
    guardarNotas();

    // Limpiamos el input
    inputNota.value = "";

    // Enfocamos de nuevo el input
    inputNota.focus();

    // Mostramos mensaje en pantalla
    mensaje.textContent = "Nota agregada correctamente.";

    // Evidencia en consola
    console.log("Nota agregada:", textoNota);
    console.log("Lista actualizada:", notas);
});



inputNota.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        btnAgregar.click();
    }
});



function cargarNotas() {
    // Obtenemos las notas guardadas en Local Storage
    const notasGuardadas = localStorage.getItem("notas");

    // Si existen notas guardadas, las cargamos
    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);

        // Recorremos cada nota guardada y la mostramos en el DOM
        notas.forEach(function (nota) {
            crearNotaEnDOM(nota);
        });

        // Evidencia en consola
        console.log(`Se cargaron ${notas.length} notas desde Local Storage.`);
    } else {
        console.log("No hay notas guardadas en Local Storage.");
    }
}

cargarNotas();