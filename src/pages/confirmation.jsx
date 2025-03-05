import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Alert, Table, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router'; // Cuidado, usa 'react-router-dom' no 'react-router'


function Confirmation() {


  useEffect(() => {
    axios.get('https://webapp-react-jm-ines-2025-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
      .then((response) => {
        let arrayProductos = [];
        for (const key in response.data) {
          if (cartItems.find((item) => item[0] === key)) {
            arrayProductos.push({
              id: key,
              nombre: response.data[key].nombre,
              precio: response.data[key].precio,
              cantidad: cartItems.find((item) => item[0] === key)[1],
              categoría: response.data[key].categoría,
              imagen: response.data[key].imagen
            })
          }
        }
        setProductArray(arrayProductos);

          // Calcular el precio total
          const total = arrayProductos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
          setTotalPrice(total);
      })
      .catch((error) => { console.log('¡Ha ocurrido un error!') })
      console.log("Estoy actualizando el carrito");
  }, );



  return (
    <div>
      <h2>Carrito de Compra</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Categoría</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {productArray.map((elemento) => {
                return <ItemCarrito key={elemento.id} indice={elemento.id} producto={elemento} />
              })}
            </tbody>
          </Table>
          <h2>Total: {totalPrice.toFixed(2)} €</h2>
          <Button variant='dark'><Link to="/confirmacion">REALIZAR PEDIDO</Link></Button>
        </>
      )}
    </div>
  );


}

export default Confirmation;
