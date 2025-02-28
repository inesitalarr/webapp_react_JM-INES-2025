import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/products/product';
import { Alert } from 'react-bootstrap';


function Products() {

  const [productArray, setProductArray] = useState([]);

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

  let contenido = <Alert>Non ci sono produtti</Alert>;

  if (productArray.length > 0) {
      contenido =
          <div>
              {productArray.map((elemento) => {
                  return <Product key={elemento.id} producto={elemento} />
              })}
          </div>;
  }

  return (
    <>
      <h2>Productos:</h2>
      {contenido}
    </>
  );
}

export default Products;