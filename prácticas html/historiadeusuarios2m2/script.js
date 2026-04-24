const formulario = document.getElementById("espaciodeabajito");
const resultado = document.getElementById("resultado");

let temporizadorOcultar;
let temporizadorLimpiar;

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const numero = document.getElementById("numero").value;

    clearTimeout(temporizadorOcultar);
    clearTimeout(temporizadorLimpiar);

    resultado.classList.remove("error", "exito", "mostrar");

    if (nombre === "" || correo === "" || numero === "") {
        resultado.textContent = "Por favor, completa todos los campos.";
        resultado.classList.add("error");
    } else {
        resultado.textContent = "Gracias, " + nombre + ". Tu formulario fue enviado correctamente.";
        resultado.classList.add("exito");
        formulario.reset();
    }

    setTimeout(() => {
        resultado.classList.add("mostrar");
    }, 10);

    temporizadorOcultar = setTimeout(() => {
        resultado.classList.remove("mostrar");
    }, 3000);

    temporizadorLimpiar = setTimeout(() => {
        resultado.textContent = "";
        resultado.classList.remove("error", "exito");
    }, 3500);
});