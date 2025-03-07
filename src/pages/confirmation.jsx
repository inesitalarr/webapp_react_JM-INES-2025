import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemConfirmation from '../components/products/itemConfirmation';
import { Alert, Table, Nav, Button } from 'react-bootstrap';
import CarritoContext from '../store/carritoContext';
import { Link } from 'react-router'; // Cambiado a 'react-router-dom'

function Confirmation() {
  const { listaProductos, setListaProductos } = useContext(CarritoContext);
  const cartItems = listaProductos;
  const [productArray, setProductArray] = useState([]);
  const total = useContext(CarritoContext).total;
  const totalHandler = useContext(CarritoContext).totalHandler;

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
              imagen: response.data[key].imagen
            })
          }
        }
        setProductArray(arrayProductos);

        // Calcular el precio total
        const total = arrayProductos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        totalHandler(total);
      })
      .catch((error) => { console.log('¡Ha ocurrido un error!') })
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item[0] !== id);
    setListaProductos(updatedCartItems);
  };

  return (
    <>
      <h2>Carrito de Compra</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {productArray.map((elemento) => {
                return (<ItemConfirmation key={elemento.id} indice={elemento.id} producto={elemento} deteleItem = {handleRemoveItem}/>
                );
              })}
            </tbody>
          </Table>
          <h2>Total: {total.toFixed(2)} €</h2>
          <Button variant='dark'><Link to="/formulario">CONTINUAR CON EL PAGO</Link></Button>
        </>
      )}
    </>
  );
}

export default Confirmation;