from servicios import *
from archivos import *

def pedir_numero(mensaje, es_entero=False):
    while True:
        try:
            valor = input(mensaje)
            num = int(valor) if es_entero else float(valor)
            if num < 0:
                print("Error: El número no puede ser negativo.")
                continue
            return num
        except ValueError:
            print("Error: Ingrese un valor numérico válido.")

def main():
    inventario = []
    while True:
        print("\n--- MENÚ INVENTARIO ---")
        print("1. Agregar | 2. Mostrar | 3. Buscar | 4. Eliminar")
        print("5. Estadísticas | 6. Guardar CSV | 7. Cargar CSV | 9. Salir")
        
        op = input("Seleccione una opción: ")

        if op == "1":
            nom = input("Nombre del producto: ")
            pre = pedir_numero("Precio: ")
            can = pedir_numero("Cantidad: ", True)
            agregar_producto(inventario, nom, pre, can)
            print("Producto agregado.")

        elif op == "2":
            mostrar_inventario(inventario)

        elif op == "3":
            nom = input("Nombre a buscar: ")
            p = buscar_producto(inventario, nom)
            print(p if p else "Producto no encontrado.")

        elif op == "4":
            nom = input("Nombre a eliminar: ")
            if eliminar_producto(inventario, nom):
                print("Eliminado con éxito.")
            else:
                print("No se encontró el producto.")

        elif op == "5":
            s = calcular_estadisticas(inventario)
            if s:
                print(f"\n--- ESTADÍSTICAS ---")
                print(f"Total Unidades: {s['unidades']}")
                print(f"Valor en Inventario: ${s['valor']:.2f}")
                print(f"Producto más caro: {s['caro']['nombre']} (${s['caro']['precio']})")
                print(f"Mayor Stock: {s['stock']['nombre']} ({s['stock']['cantidad']} und)")
            else:
                print("Inventario vacío.")

        elif op == "6":
            ruta = input("Nombre del archivo para guardar (ej: datos.csv): ")
            guardar_csv(inventario, ruta)

        elif op == "7":
            ruta = input("Nombre del archivo a cargar: ")
            datos, err = cargar_csv(ruta)
            if datos is not None:
                op_carga = input("¿Sobrescribir inventario actual? (S/N): ").upper()
                if op_carga == 'S':
                    inventario.clear()
                    inventario.extend(datos)
                else:

                    for nuevo in datos:
                        exis = buscar_producto(inventario, nuevo['nombre'])
                        if exis:
                            exis['cantidad'] += nuevo['cantidad']
                            exis['precio'] = nuevo['precio'] # Actualiza al precio más reciente
                        else:
                            inventario.append(nuevo)
                print(f"Carga completa. Errores omitidos: {err}")

        elif op == "9":
            print("Saliendo...")
            break
        else:
            print("Opción no válida.")

if __name__ == "__main__":
    main()
