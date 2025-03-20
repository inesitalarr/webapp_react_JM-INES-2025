import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemCarrito from '../components/products/itemCarrito';
import { Table, Button } from 'react-bootstrap';
import CarritoContext from '../store/carritoContext';
import { Link } from 'react-router'; // Cuidado, usa 'react-router-dom' no 'react-router'


function Carrito() {
  const cartItems = useContext(CarritoContext).listaProductos;
  const [productArray, setProductArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const vaciarCarrito = useContext(CarritoContext).vaciarCarrito;


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
  }, [cartItems]);



  return (
    <div>
      {cartItems.length === 0 ? (
        <h3 style={{color: 'white', textAlign: 'center'}}>El carrito está vacío</h3>
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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productArray.map((elemento) => {
                return <ItemCarrito key={elemento.id} indice={elemento.id} producto={elemento} />
              })}
            </tbody>
          </Table>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='danger' onClick={vaciarCarrito} disabled={productArray.length === 0}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>VACIAR CESTA</Link>
            </Button>
            <div>

              <Button variant='secondary' style={{ marginLeft: '50px', marginRight:'10px' }} ><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>SEGUIR COMPRANDO</Link></Button>
              <Button variant='success' disabled={productArray.length === 0}>
                <Link to="/confirmation" style={{ color: 'white', textDecoration: 'none' }}>REALIZAR PEDIDO</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );


}

export default Carrito;
