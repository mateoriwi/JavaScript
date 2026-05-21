/* Aquí utilizamos prompt para pedirle el nombre al usuario mediante un pop-up
Utilizamos CONST para el nombre como valor constante */
const nombre = prompt("Hola! cual es tu nombre?");
/* Aquí le pedimos la edad al usuario aún con prompts (Pop-up)
 Utilizamos let para la edad del usuario, ya que como una persona crece este valor puede cambiar */
let edad = prompt("Ahora proporcionanos tu edad!"); 
/* Aquí convertimos la variable en un número con la función "Number()" */
edad = Number(edad);

// Con este if nos tratamos de asegurar de que el usuario ingrese correctamente un número con el "isNaN"
// Traducido significa, si (if) edad no es un número (isNaN) imprime con un error: "Eso no es un número!"
if (isNaN(edad) || edad <= 0) { // Tan dificil es mirar los números de tu teclado???
    alert('Error: Eso no es un número!')
    // En caso de que si pongamos un número correctamente, irá hacia este else de aquí
} else {
    // Y aquí si podremos validar correctamente la edad
    // Si eres mayor de 18 años imprimir:
    if (edad >= 18) {  // Si te puedes registrar!!!
        alert('Puedes registrarte, eres mayor de 18 años')
        // Y este else se activa en caso de un número menor de 18 imprimirá que el registro no se puede hacer
    } else { // No puedes registrarte!!! vete de aquí!!!
        alert('No puedes registrarte, debes ser mayor de 18 años')
    }
}




