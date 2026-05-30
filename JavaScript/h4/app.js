// ======================================================
// HISTORIA DE USUARIO 4
// Aplicación de gestión de productos
// Conceptos usados:
// let, const, objetos, arrays, Set, Map, DOM,
// Local Storage, Fetch API, CRUD, async/await y try...catch
// ======================================================


// ======================================================
// URL BASE DE LA API LOCAL
// Para que funcione, se debe ejecutar JSON Server con:
// npx json-server db.json
// ======================================================

const API_URL = "http://localhost:3000/productos";


// ======================================================
// SELECCIÓN DE ELEMENTOS DEL DOM
// ======================================================

// Formulario principal
const formProducto = document.getElementById("formProducto");

// Inputs del formulario
const inputNombre = document.getElementById("inputNombre");
const inputPrecio = document.getElementById("inputPrecio");
const inputCategoria = document.getElementById("inputCategoria");

// Elementos para mostrar información
const mensaje = document.getElementById("mensaje");
const resumenProductos = document.getElementById("resumenProductos");
const listaProductos = document.getElementById("listaProductos");

// Botones para trabajar con la API
const btnObtenerApi = document.getElementById("btnObtenerApi");
const btnSincronizarApi = document.getElementById("btnSincronizarApi");


// Verificamos que los elementos fueron encontrados correctamente
console.log("Formulario:", formProducto);
console.log("Input nombre:", inputNombre);
console.log("Input precio:", inputPrecio);
console.log("Input categoría:", inputCategoria);
console.log("Lista de productos:", listaProductos);


// ======================================================
// ARREGLO GLOBAL DE PRODUCTOS
// Aquí se guardan los productos mientras la página está abierta.
// También se sincroniza con Local Storage.
// ======================================================

let productos = [];


// ======================================================
// FUNCIÓN PARA MOSTRAR MENSAJES DINÁMICOS
// ======================================================

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;

    console.log(`[${tipo}] ${texto}`);
}


// ======================================================
// FUNCIÓN PARA GUARDAR PRODUCTOS EN LOCAL STORAGE
// JSON.stringify convierte el arreglo en texto,
// porque Local Storage solo guarda strings.
// ======================================================

function guardarEnLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));

    console.log("Productos guardados en Local Storage:", productos);
}


// ======================================================
// FUNCIÓN PARA CARGAR PRODUCTOS DESDE LOCAL STORAGE
// JSON.parse convierte el texto guardado en un arreglo real.
// ======================================================

function cargarDesdeLocalStorage() {
    const productosGuardados = localStorage.getItem("productos");

    if (productosGuardados) {
        productos = JSON.parse(productosGuardados);

        console.log(`Se cargaron ${productos.length} productos desde Local Storage.`);
    } else {
        console.log("No hay productos guardados en Local Storage.");
    }
}


// ======================================================
// FUNCIÓN PARA ACTUALIZAR RESUMEN
// Aquí usamos Set y Map:
// Set: obtener nombres únicos de productos.
// Map: relacionar categoría con cantidad de productos.
// ======================================================

function actualizarResumen() {
    // Set para guardar nombres únicos
    const nombresUnicos = new Set();

    // Map para contar productos por categoría
    const categoriasMap = new Map();

    productos.forEach(function (producto) {
        nombresUnicos.add(producto.nombre);

        if (categoriasMap.has(producto.categoria)) {
            const cantidadActual = categoriasMap.get(producto.categoria);

            categoriasMap.set(producto.categoria, cantidadActual + 1);
        } else {
            categoriasMap.set(producto.categoria, 1);
        }
    });

    // Convertimos el Map en texto descriptivo
    let textoCategorias = "";

    categoriasMap.forEach(function (cantidad, categoria) {
        textoCategorias += `${categoria}: ${cantidad} producto(s). `;
    });

    resumenProductos.textContent = 
        `Total: ${productos.length}. ` +
        `Nombres únicos: ${nombresUnicos.size}. ` +
        `Categorías: ${textoCategorias || "Sin categorías."}`;

    console.log("Set de nombres únicos:", nombresUnicos);
    console.log("Map de categorías:", categoriasMap);
}


// ======================================================
// FUNCIÓN PARA LIMPIAR LA LISTA DEL DOM
// Se usa removeChild para cumplir el criterio de aceptación.
// ======================================================

function limpiarListaProductos() {
    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
    }
}


// ======================================================
// FUNCIÓN PARA RENDERIZAR PRODUCTOS EN EL DOM
// Renderizar significa mostrar datos en pantalla.
// Aquí se crean elementos li dinámicamente.
// ======================================================

function renderizarProductos() {
    limpiarListaProductos();

    productos.forEach(function (producto) {
        // Creamos el elemento li
        const li = document.createElement("li");

        // Creamos un span para mostrar la información
        const spanInfo = document.createElement("span");

        spanInfo.textContent = 
            `${producto.nombre} - $${producto.precio} - Categoría: ${producto.categoria}`;

        // Creamos botón para editar
        const btnEditar = document.createElement("button");

        btnEditar.textContent = "Editar";

        // Creamos botón para eliminar
        const btnEliminar = document.createElement("button");

        btnEliminar.textContent = "Eliminar";

        // Agregamos los elementos al li
        li.appendChild(spanInfo);
        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);

        // Agregamos el li a la lista usando appendChild
        listaProductos.appendChild(li);

        // Evento para editar producto
        btnEditar.addEventListener("click", function () {
            editarProducto(producto.id);
        });

        // Evento para eliminar producto
        btnEliminar.addEventListener("click", function () {
            eliminarProducto(producto.id, li);
        });
    });

    actualizarResumen();
}


// ======================================================
// FUNCIÓN PARA VALIDAR PRODUCTOS
// Retorna true si el producto es válido.
// Retorna false si el producto tiene datos incorrectos.
// ======================================================

function validarProducto(nombre, precio, categoria) {
    if (nombre === "") {
        mostrarMensaje("El nombre no puede estar vacío.", "ERROR");
        return false;
    }

    if (isNaN(precio) || precio <= 0) {
        mostrarMensaje("El precio debe ser un número mayor que 0.", "ERROR");
        return false;
    }

    if (categoria === "") {
        mostrarMensaje("La categoría no puede estar vacía.", "ERROR");
        return false;
    }

    return true;
}


// ======================================================
// TASK 2 Y TASK 3
// CAPTURAR DATOS, VALIDAR Y AGREGAR PRODUCTOS AL DOM
// ======================================================

formProducto.addEventListener("submit", async function (evento) {
    // Evita que el formulario recargue la página
    evento.preventDefault();

    // Capturamos los valores del usuario
    const nombre = inputNombre.value.trim();
    const precio = Number(inputPrecio.value);
    const categoria = inputCategoria.value.trim();

    // Validamos los datos
    if (!validarProducto(nombre, precio, categoria)) {
        return;
    }

    // Creamos un objeto producto
    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        precio: precio,
        categoria: categoria
    };

    // Agregamos el producto al arreglo local
    productos.push(nuevoProducto);

    // Guardamos en Local Storage
    guardarEnLocalStorage();

    // Renderizamos nuevamente la lista
    renderizarProductos();

    // Intentamos guardar también en la API con POST
    await crearProductoEnApi(nuevoProducto);

    // Mostramos mensaje de éxito
    mostrarMensaje("Producto agregado correctamente.", "ÉXITO");

    // Limpiamos el formulario
    inputNombre.value = "";
    inputPrecio.value = "";
    inputCategoria.value = "";

    // Enfocamos de nuevo el primer input
    inputNombre.focus();
});


// ======================================================
// TASK 5 - GET
// Obtener productos desde la API
// ======================================================

async function obtenerProductosDeApi() {
    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los productos de la API.");
        }

        const productosApi = await respuesta.json();

        productos = productosApi;

        guardarEnLocalStorage();

        renderizarProductos();

        mostrarMensaje("Productos obtenidos correctamente desde la API.", "ÉXITO");

        console.log("Respuesta GET de la API:", productosApi);
    } catch (error) {
        mostrarMensaje("Error al obtener productos desde la API.", "ERROR");

        console.error("Error en GET:", error);
    }
}


// ======================================================
// TASK 5 - POST
// Crear producto en la API
// ======================================================

async function crearProductoEnApi(producto) {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo crear el producto en la API.");
        }

        const productoCreado = await respuesta.json();

        console.log("Respuesta POST de la API:", productoCreado);
    } catch (error) {
        mostrarMensaje("Producto guardado localmente, pero no se pudo sincronizar con la API.", "ADVERTENCIA");

        console.error("Error en POST:", error);
    }
}


// ======================================================
// TASK 5 - PUT
// Actualizar producto en la API
// ======================================================

async function actualizarProductoEnApi(producto) {
    try {
        const respuesta = await fetch(`${API_URL}/${producto.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo actualizar el producto en la API.");
        }

        const productoActualizado = await respuesta.json();

        console.log("Respuesta PUT de la API:", productoActualizado);
    } catch (error) {
        mostrarMensaje("Producto editado localmente, pero no se pudo actualizar en la API.", "ADVERTENCIA");

        console.error("Error en PUT:", error);
    }
}


// ======================================================
// TASK 5 - DELETE
// Eliminar producto en la API
// ======================================================

async function eliminarProductoEnApi(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo eliminar el producto en la API.");
        }

        console.log(`Respuesta DELETE de la API: producto ${id} eliminado.`);
    } catch (error) {
        mostrarMensaje("Producto eliminado localmente, pero no se pudo eliminar en la API.", "ADVERTENCIA");

        console.error("Error en DELETE:", error);
    }
}


// ======================================================
// FUNCIÓN PARA EDITAR PRODUCTO
// Usa prompt para solicitar nuevos datos al usuario.
// Luego actualiza Local Storage, DOM y API.
// ======================================================

async function editarProducto(id) {
    const productoEncontrado = productos.find(function (producto) {
        return producto.id === id;
    });

    if (!productoEncontrado) {
        mostrarMensaje("No se encontró el producto para editar.", "ERROR");
        return;
    }

    const nuevoNombre = prompt("Nuevo nombre:", productoEncontrado.nombre);
    const nuevoPrecioTexto = prompt("Nuevo precio:", productoEncontrado.precio);
    const nuevaCategoria = prompt("Nueva categoría:", productoEncontrado.categoria);

    if (nuevoNombre === null || nuevoPrecioTexto === null || nuevaCategoria === null) {
        mostrarMensaje("Edición cancelada.", "INFO");
        return;
    }

    const nombre = nuevoNombre.trim();
    const precio = Number(nuevoPrecioTexto);
    const categoria = nuevaCategoria.trim();

    if (!validarProducto(nombre, precio, categoria)) {
        return;
    }

    productoEncontrado.nombre = nombre;
    productoEncontrado.precio = precio;
    productoEncontrado.categoria = categoria;

    guardarEnLocalStorage();

    renderizarProductos();

    await actualizarProductoEnApi(productoEncontrado);

    mostrarMensaje("Producto editado correctamente.", "ÉXITO");

    console.log("Producto editado:", productoEncontrado);
}


// ======================================================
// FUNCIÓN PARA ELIMINAR PRODUCTO
// Elimina del DOM con removeChild, del arreglo,
// de Local Storage y de la API.
// ======================================================

async function eliminarProducto(id, elementoLi) {
    // Eliminamos el elemento visual del DOM usando removeChild
    listaProductos.removeChild(elementoLi);

    // Eliminamos el producto del arreglo usando filter
    productos = productos.filter(function (producto) {
        return producto.id !== id;
    });

    guardarEnLocalStorage();

    actualizarResumen();

    await eliminarProductoEnApi(id);

    mostrarMensaje("Producto eliminado correctamente.", "ÉXITO");

    console.log("Producto eliminado con id:", id);
    console.log("Lista actualizada:", productos);
}


// ======================================================
// FUNCIÓN PARA SINCRONIZAR PRODUCTOS LOCALES CON LA API
// Recorre los productos del arreglo y los envía con POST.
// ======================================================

async function sincronizarProductosConApi() {
    try {
        for (const producto of productos) {
            await crearProductoEnApi(producto);
        }

        mostrarMensaje("Productos locales sincronizados con la API.", "ÉXITO");

        console.log("Sincronización finalizada:", productos);
    } catch (error) {
        mostrarMensaje("Error durante la sincronización con la API.", "ERROR");

        console.error("Error al sincronizar:", error);
    }
}


// ======================================================
// EVENTOS DE BOTONES DE API
// ======================================================

btnObtenerApi.addEventListener("click", function () {
    obtenerProductosDeApi();
});

btnSincronizarApi.addEventListener("click", function () {
    sincronizarProductosConApi();
});


// ======================================================
// INICIO DE LA APLICACIÓN
// Al cargar la página:
// 1. Recupera productos desde Local Storage.
// 2. Los renderiza automáticamente.
// ======================================================

cargarDesdeLocalStorage();

renderizarProductos();