#Este while true nos permite en un bucle, seguir en la misma función en caso de que ingresemos algo inválido, en precio del producto
while True:
    #Aquí le pedimos el nombre del producto al usuario
    nombre_producto = input("Ingrese el nombre del producto: \n")

    #Este bucle se repite hasta que el usuario ingrese un nombre válido.
    #Verifica que el texto contenga al menos una letra,
    #permitiendo números o símbolos pero no solos de por sí
    #(Es lo único que encontré para poder hacerlo así, no encontré otra manera sin este if)
    if any(letra.isalpha() for letra in nombre_producto):
        break
    else:
        print("Valor no válido. El nombre debe contener al menos una letra.")



while True:
    try:                  #Aquí convertimos el precio del producto en un float para que solo se puedan ingresar números, y en caso de una letra, ir al except
        precio_producto = float(input("Ingrese el precio del producto: \n"))
        #break Nos permite salir del bucle
        break
    except:
        print("Valor no válido. Ingrese un número válido.")

#A su vez, el bucle nos permite validar que sea un número entero ya que en caso de que no sea un int, irá al "except"         
while True:
    try:                    #Aquí en vez, lo convertimos en int para que sea entero
        cantidad_producto = int(input("Ingrese la cantidad del producto: \n"))
        break
    except:
        print("Valor no válido. Ingrese un número entero.")

#Aquí multiplicamos la cantidad del producto por el precio para hacer un cálculo para el resumen como el "Total"   
costo_total = cantidad_producto * precio_producto

print("Resumen del producto:", "| Producto:", nombre_producto, "| Precio:", precio_producto, "| Cantidad:", cantidad_producto, "| Total:", costo_total)
#Y este ha sido mi código!!! Mateo Hernandez Mendoza