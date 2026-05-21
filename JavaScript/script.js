let nombre = "Mati";
let juegoFavorito = "Geometry Dash";
let edad = 18;
let animeFavorito = "Es complicado";

console.log("Hola, mi nombre es " + nombre);
console.log("Mi juego favorito es " + juegoFavorito);
console.log("Tengo " + edad + " años");
console.log("Mi anime favorito es " + animeFavorito);

let numero1 = 20;
let numero2 = 4;

console.log(`La suma de los dos números es ${numero1 + numero2}`);
console.log(`La resta de los dos números es ${numero1 - numero2}`);
console.log(`La multiplicación de los dos números es ${numero1 * numero2}`);
console.log(`La división de los dos números es ${numero1 / numero2}`);

if (edad >= 18) {
    console.log("Puedes entrar");
} else {
    console.log("No puedes entrar, solo mayores de edad");
}

let puntajeJuego = 80;

if (puntajeJuego === 100) {
    console.log("Tu puntaje fue perfecto!!!");
} else if (puntajeJuego >= 70) {
    console.log("Pasaste el nivel correctamente!!!");
} else {
    console.log("No has superado el nivel");
}

let puntajeNota = 70;

if (puntajeNota === 100) {
    console.log("Te fue excelente en el examen!!!");
} else if (puntajeNota >= 50) {
    console.log("Aprobaste el examen");
} else if (puntajeNota >= 40) {
    console.log("Necesitas mejorar")
} else {
    console.log("Fallaste")
}

function presentarse() {
    console.log("Hola, soy Mati");
    console.log("Estoy aprendiendo JavaScript junto a HTML y CSS... Y espero tener un buen salario a futuro");
}

presentarse();

//Objeto
    //Nombre del objeto
let persona = {
    //Clave  valor
    nombre: "Mateo",
    edad: 18, 
    cedula: 1042254423,
    ciudad: "Barranquilla"
}

//llamar a un valor del objeto
        //nombre del objeto.clave
console.log(`Mi Nombre es ${persona.nombre}`);
console.log(`Mi edad es ${persona.edad}`);
console.log(`Mi número de cédula es ${persona.cedula}`);
console.log(`Vivo en la ciudad de ${persona.ciudad}`);

//Para actualizar un valor tenemos que asignarle uno nuevo escribiendo (nombredelobjeto).(clavequequeremoscambiar) = (nuevo_valor);
//Estas ya existen en el objeto, aquí las modificamos
persona.edad = 19;
persona.ciudad = "Bogotá"

//Si queremos crear un nuevo objeto escribimos (nombredelobjeto).(clavenuevadelobjeto) = (nuevo_valor);
persona.juegoFavorito = "Geometry Dash"

console.log(`Ahora tengo ${persona.edad} años, vivo en la Ciudad de ${persona.ciudad} y mi juego favorito que no mencioné antes es ${persona.juegoFavorito}`)

let cuentaJuego = {
    usuario: "Matiuku",
    nivel: 240,
    monedas: 0,
    mostrarInfo: function() {
        console.log(`El usuario ${cuentaJuego.usuario} está en el nivel ${cuentaJuego.nivel} y tiene ${cuentaJuego.monedas} monedas.`);
    },
    ganarMonedas: function() {
        cuentaJuego.monedas = cuentaJuego.monedas + 100 
        console.log(`Has ganado 100 monedas! ahora tienes ${cuentaJuego.monedas} monedas`);
    },
    subirNivel: function() {
        cuentaJuego.nivel += 1
        console.log(`El usuario ${cuentaJuego.usuario} ha subido al nivel ${cuentaJuego.nivel}`)
    }
}

cuentaJuego.mostrarInfo();
cuentaJuego.ganarMonedas();
cuentaJuego.subirNivel();

class Jugador {
    constructor(id_de_jugador, usuario, nivel, juegoFavorito, monedas) {
        this.id_de_jugador = id_de_jugador;
        this.usuario = usuario;
        this.nivel = nivel;
        this.juegoFavorito = juegoFavorito;
        this.monedas = monedas;
    }
        mostrarInfo() {
            console.log(`El usuario ${this.usuario} con id de jugador ${this.id_de_jugador} es nivel ${this.nivel} y juega ${this.juegoFavorito}. También tiene ${this.monedas} monedas`)
        }

        subirNivel() {
            this.nivel += 1; 
            console.log(`El usuario ${this.usuario} ha subido de nivel! Ahora es nivel ${this.nivel}!`)
        }

        ganarMonedas2() {
            this.monedas += 100; 
            console.log(`El usuario ${this.usuario} ha ganado 100 monedas! Ahora tiene ${this.monedas} monedas!`)
        }

        gastarMonedas(cantidad) {
            this.monedas -= cantidad;
            console.log(`El usuario ${this.usuario} ha gastado ${cantidad} monedas. Ahora tiene ${this.monedas} monedas!`)
        }
}


let cuenta1 = new Jugador(1234, "Matiuku", 240, "Geometry Dash", 0);

console.log(`El usuario ${cuenta1.usuario} ha sido registrado con el ID ${cuenta1.id_de_jugador} es nivel ${cuenta1.nivel} y su juego favorito es ${cuenta1.juegoFavorito}`);

cuenta1.mostrarInfo();
cuenta1.subirNivel();
cuenta1.ganarMonedas2();
cuenta1.gastarMonedas(80);

let cuenta2 = new Jugador(4567, "Daniel", 167, "Clash Royale", 0);
console.log(`El usuario ${cuenta2.usuario} ha sido registrado con el ID ${cuenta2.id_de_jugador} es nivel ${cuenta2.nivel} y su juego favorito es ${cuenta2.juegoFavorito}`);

cuenta2.mostrarInfo();
cuenta2.subirNivel();
cuenta2.ganarMonedas2();
cuenta2.gastarMonedas(10)
