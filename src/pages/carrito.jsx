import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import Product from '../components/products/product';
import { Alert, Table } from 'react-bootstrap';
import CarritoContext from '../store/carritoContext';

function Carrito() {
  const cartItems= useContext(CarritoContext).listaProductos;



  return (
    <div>
      <h2>Carrito de Compra</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
       
          <NavLink to="/confirmacion">REALIZAR PEDIDO</NavLink>
        </>
      )}
    </div>
  );
}

export default Carrito;
