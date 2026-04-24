def agregar_producto(inventario, nombre, precio, cantidad):
    producto = {"nombre": nombre, "precio": precio, "cantidad": cantidad}
    inventario.append(producto)

def mostrar_inventario(inventario):

    if not inventario:
        print("\n[!] El inventario está vacío.")
        return
    print(f"\n{'Nombre':<20} | {'Precio':<10} | {'Cantidad':<10}")
    print("-" * 45)
    for p in inventario:
        print(f"{p['nombre']:<20} | ${p['precio']:<9.2f} | {p['cantidad']:<10}")

def buscar_producto(inventario, nombre):
    for p in inventario:
        if p["nombre"].lower() == nombre.lower():
            return p
    return None

def eliminar_producto(inventario, nombre):
   
    p = buscar_producto(inventario, nombre)
    if p:
        inventario.remove(p)
        return True
    return False

def calcular_estadisticas(inventario):

    if not inventario:
        return None
    
    unidades_totales = 0
    valor_total = 0
    prod_caro = inventario[0]
    prod_stock = inventario[0]

    for p in inventario:
        unidades_totales += p["cantidad"]
        valor_total += (p["precio"] * p["cantidad"])
        
        
        if p["precio"] > prod_caro["precio"]:
            prod_caro = p
            
      
        if p["cantidad"] > prod_stock["cantidad"]:
            prod_stock = p

    return {
        "unidades": unidades_totales,
        "valor": valor_total,
        "caro": prod_caro,
        "stock": prod_stock
    }
