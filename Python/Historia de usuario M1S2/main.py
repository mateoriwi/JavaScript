#Diccionario padre
inventario = []

#Creamos la primera función
def agregar_producto():
    """Registra un producto validando el precio y la cantidad."""
    print("\n--- Agregar Nuevo Producto ---")
    nombre = input("Nombre del producto: \n")

    try:
        # Verificamos que sean las respectivas variables
        precio = float(input("Precio: \n"))
        cantidad = int(input("Cantidad: \n"))
        
        # Almacenamiento para el diccionario
        producto = {
            "nombre": nombre,
            "precio": precio,
            "cantidad": cantidad
        }
        
        # Guardamos para el inventario
        inventario.append(producto)
        print(f"{nombre} agregado correctamente.")
    except ValueError:
        # Manejo de error si el usuario ingresa texto en lugar de números
        print("Error: Precio y cantidad deben ser valores numéricos.")

#Segunda función
def mostrar_inventory():
    """Recorre la lista con un bucle for y muestra los productos formateados."""
    print("\n--- Inventario Actual ---")
    # Validación de que el inventario está vacío
    if not inventario:
        print("El inventario está vacío.")
    else:
        # Bucle for para iterar sobre cada diccionario en la lista
        for i in inventario:
            print(f"Producto: {i['nombre']} | Precio: {i['precio']} | Cantidad: {i['cantidad']}")

#Tercera función
def calcular_estadisticas():
    """Calcula el valor financiero total y el conteo de unidades físicas."""
    print("\n--- Estadísticas del Inventario ---")
    if not inventario:
        print("No hay datos para procesar.")
        return

    total_valor = 0
    total_items = 0
    
    # Acumuladores de datos mediante recorrido de lista
    for i in inventario:
        total_valor += i['precio'] * i['cantidad'] # Sumatoria para el valor total
        total_items += i['cantidad']               # Sumatoria del stock
        
    print(f"Valor total del inventario: ${total_valor:,.2f}")
    print(f"Cantidad total de productos registrados: {total_items} unidad(es)")

#Cuarta función
def menu_principal():
    """Bucle principal que gestiona la interacción del usuario mediante condicionales."""
    while True: # Bucle infinito hasta que se seleccione 'Salir'
        print("\n===== SISTEMA DE GESTIÓN DE INVENTARIO =====")
        print("1. Agregar producto")
        print("2. Mostrar inventario")
        print("3. Calcular estadísticas")
        print("4. Salir")
        
        opcion = input("Seleccione una opción (1-4): \n")

        # Condicionales para procesar la opción que escojamos
        if opcion == "1":
            agregar_producto()
        elif opcion == "2":
            mostrar_inventory()
        elif opcion == "3":
            calcular_estadisticas()
        elif opcion == "4":
            print("Saliendo del sistema... ¡Vuelva pronto!")
            break # Cierre del ciclo while
        else:
            # Respuesta ante entradas incorrectas
            print("Opción inválida. Por favor, intente de nuevo.")

#Aquí llamamos a la función del menú principal osea el inicio del programa
menu_principal()


