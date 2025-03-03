import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import Product from '../components/products/product';
import { Alert, Table ,Nav, Button} from 'react-bootstrap';
import CarritoContext from '../store/carritoContext';
import { Link } from 'react-router'; // Cuidado, usa 'react-router-dom' no 'react-router'


function Carrito() {
  const cartItems= useContext(CarritoContext).listaProductos;



  return (
    <div>
      <h2>Carrito de Compra</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
       
          <Button variant='dark'><Link to="/confirmacion">REALIZAR PEDIDO</Link></Button>
        </>
      )}
    </div>
  );
}

export default Carrito;
