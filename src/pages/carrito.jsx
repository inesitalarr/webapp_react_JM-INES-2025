import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemCarrito from '../components/products/itemCarrito';
import { Alert, Table, Nav, Button } from 'react-bootstrap';
import CarritoContext from '../store/carritoContext';
import { Link } from 'react-router'; // Cuidado, usa 'react-router-dom' no 'react-router'


function Carrito() {
  const cartItems = useContext(CarritoContext).listaProductos;
  const [productArray, setProductArray] = useState([]);

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
          <Button variant='dark'><Link to="/confirmacion">REALIZAR PEDIDO</Link></Button>
        </>
      )}
    </div>
  );


}

export default Carrito;
