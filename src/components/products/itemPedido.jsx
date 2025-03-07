import { Image, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';



function ItemPedido(props) {


    const key = props.key;
  const producto = props.producto;

  useEffect(() => {
    axios.get('https://webapp-react-jm-ines-2025-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
      .then((response) => {
        let arrayProductos = [];
        for (const key in response.data) {
          arrayProductos.push({
            id: key,
            nombre: response.data[key].nombre,
            precio: response.data[key].precio,
            stock: response.data[key].stock,
            categoría: response.data[key].categoría,
            imagen: response.data[key].imagen
          })
        }
        setProductArray(arrayProductos);
      })
      .catch((error) => { console.log('¡Ha ocurrido un error!') })
  }, [])


    return (
        <></>
    );
}

export default ItemPedido;