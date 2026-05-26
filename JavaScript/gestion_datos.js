// Cada producto tiene:
// id: clave única
// nombre: nombre del producto
// precio: valor numérico

const productos = {
    producto1: {
        id: 1,
        nombre: "Laptop",
        precio: 2500000,
        categoria: "Tecnología"
    },

    producto2: {
        id: 2,
        nombre: "Mouse",
        precio: 80000,
        categoria: "Accesorios"
    },

    producto3: {
        id: 3,
        nombre: "Teclado",
        precio: 150000,
        categoria: "Accesorios"
    },

    producto4: {
        id: 4,
        nombre: "Monitor",
        precio: 900000,
        categoria: "Tecnología"
    }
};

// Esta función revisa que cada producto tenga:
// - id válido
// - nombre válido
// - precio válido


function validarProducto(producto) {
    // Validamos que exista el id y que sea un número
    if (!producto.id || typeof producto.id !== "number") {
        return false;
    }

    // Validamos que exista el nombre y que sea texto
    if (!producto.nombre || typeof producto.nombre !== "string") {
        return false;
    }

    // Validamos que exista el precio, que sea número y mayor que 0
    if (!producto.precio || typeof producto.precio !== "number" || producto.precio <= 0) {
        return false;
    }

    // Si pasa todas las validaciones, el producto es válido
    return true;
}



// Validación de todos los productos
// Recorremos el objeto productos usando Object.entries()
// Object.entries() devuelve pares: clave y valor


console.log("===== VALIDACIÓN DE PRODUCTOS =====");

Object.entries(productos).forEach(([clave, producto]) => {
    if (validarProducto(producto)) {
        console.log(`${clave} es válido:`, producto);
    } else {
        console.log(`${clave} tiene datos incompletos o inválidos.`);
    }
});


// TASK 2: Uso de Set en JavaScript
// Un Set guarda valores únicos, es decir,
// elimina automáticamente los valores repetidos.


const numerosRepetidos = [10, 20, 30, 20, 40, 10, 50, 30];

// Creamos el Set a partir del array con números repetidos
const numerosUnicos = new Set(numerosRepetidos);

console.log("===== SET INICIAL SIN DUPLICADOS =====");
console.log(numerosUnicos);


// Agregamos un nuevo número al Set usando .add()
numerosUnicos.add(60);

console.log("===== SET DESPUÉS DE AGREGAR EL NÚMERO 60 =====");
console.log(numerosUnicos);


// Verificamos si un número existe dentro del Set usando .has()
const numeroBuscado = 30;

console.log("===== VERIFICACIÓN CON .has() =====");

if (numerosUnicos.has(numeroBuscado)) {
    console.log(`El número ${numeroBuscado} sí existe dentro del Set.`);
} else {
    console.log(`El número ${numeroBuscado} no existe dentro del Set.`);
}


// Eliminamos un número del Set usando .delete()
numerosUnicos.delete(20);

console.log("===== SET DESPUÉS DE ELIMINAR EL NÚMERO 20 =====");
console.log(numerosUnicos);


// Recorremos el Set usando for...of
console.log("===== RECORRIDO DEL SET CON for...of =====");

for (const numero of numerosUnicos) {
    console.log(`Número dentro del Set: ${numero}`);
}

// TASK 3: Creación de un Map
// El Map relaciona:
// categoría del producto => nombre del producto


const categoriasProductos = new Map();

// Agregamos datos al Map usando .set()
// La clave será una categoría y el valor será un producto
categoriasProductos.set("Tecnología", "Laptop");
categoriasProductos.set("Accesorios", "Mouse");
categoriasProductos.set("Periféricos", "Teclado");
categoriasProductos.set("Pantallas", "Monitor");

console.log("===== MAP DE CATEGORÍAS Y PRODUCTOS =====");
console.log(categoriasProductos);


// Uso de for...in para listar propiedades y valores
// del objeto productos


console.log("===== RECORRIDO DEL OBJETO CON for...in =====");

for (const clave in productos) {
    console.log(`Clave del objeto: ${clave}`);

    console.log(`ID: ${productos[clave].id}`);
    console.log(`Nombre: ${productos[clave].nombre}`);
    console.log(`Precio: ${productos[clave].precio}`);
    console.log(`Categoría: ${productos[clave].categoria}`);

    console.log("-----------------------------");
}



// Uso de Object.keys()
// Devuelve las claves del objeto


console.log("===== Object.keys() =====");

const clavesProductos = Object.keys(productos);

console.log("Claves del objeto productos:");
console.log(clavesProductos);



// Uso de Object.values()
// Devuelve los valores del objeto


console.log("===== Object.values() =====");

const valoresProductos = Object.values(productos);

console.log("Valores del objeto productos:");
console.log(valoresProductos);



// Uso de Object.entries()
// Devuelve claves y valores en forma de arreglo


console.log("===== Object.entries() =====");

const entradasProductos = Object.entries(productos);

console.log("Entradas del objeto productos:");
console.log(entradasProductos);



// Uso de for...of para recorrer el Set


console.log("===== RECORRIDO FINAL DEL SET CON for...of =====");

for (const numero of numerosUnicos) {
    console.log(`Valor único: ${numero}`);
}



// Uso de forEach() para recorrer el Map
// El primer parámetro representa el valor
// El segundo parámetro representa la clave


console.log("===== RECORRIDO DEL MAP CON forEach() =====");

categoriasProductos.forEach((nombreProducto, categoria) => {
    console.log(`Categoría: ${categoria} | Producto: ${nombreProducto}`);
});

// - Lista completa de productos
// - Lista de productos únicos usando Set
// - Categorías y nombres de productos usando Map


console.log("===== PRUEBA FINAL: LISTA COMPLETA DE PRODUCTOS =====");
console.log(productos);


console.log("===== PRUEBA FINAL: LISTA DE PRODUCTOS ÚNICOS =====");

// Creamos un Set con nombres de productos.
// Si hubiera nombres repetidos, el Set los eliminaría automáticamente.
const productosUnicos = new Set([
    "Laptop",
    "Mouse",
    "Teclado",
    "Monitor",
    "Mouse",
    "Laptop"
]);

console.log(productosUnicos);


console.log("===== PRUEBA FINAL: CATEGORÍAS Y NOMBRES DE PRODUCTOS =====");

categoriasProductos.forEach((nombreProducto, categoria) => {
    console.log(`La categoría "${categoria}" contiene el producto "${nombreProducto}".`);
});

