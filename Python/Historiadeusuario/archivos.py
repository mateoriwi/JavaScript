import csv

def guardar_csv(inventario, ruta):
    if not inventario:
        print("\n[!] Error: No hay datos para guardar.")
        return
    try:
        with open(ruta, 'w', newline='', encoding='utf-8') as f:
            campos = ["nombre", "precio", "cantidad"]
            writer = csv.DictWriter(f, fieldnames=campos)
            writer.writeheader()
            writer.writerows(inventario)
        print(f"\n[+] Inventario guardado con éxito en: {ruta}")
    except Exception as e:
        print(f"\n[!] Error al guardar: {e}")

def cargar_csv(ruta):

    productos_cargados = []
    errores = 0
    try:
        with open(ruta, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for fila in reader:
                try:
                    nombre = fila['nombre']
                    precio = float(fila['precio'])
                    cantidad = int(fila['cantidad'])
                    
                    if precio < 0 or cantidad < 0:
                        raise ValueError
                        
                    productos_cargados.append({
                        "nombre": nombre, 
                        "precio": precio, 
                        "cantidad": cantidad
                    })
                except (ValueError, KeyError):
                    errores += 1
        return productos_cargados, errores
    except FileNotFoundError:
        print("\n[!] Archivo no encontrado.")
        return None, 0
