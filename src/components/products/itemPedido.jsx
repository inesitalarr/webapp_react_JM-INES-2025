import { Image } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';



function ItemPedido(props) {

  const [productInfo, setProductInfo] = useState(null);
  const productId = props.producto[0]; // El índice del producto
  const cantidad = props.producto[1]; // La cantidad del producto
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer una solicitud a Firebase para obtener la información del producto
    axios.get('https://webapp-react-jm-ines-2025-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
      .then((response) => {

        if (response.data && response.data[productId]) {
          setProductInfo(response.data[productId]);
        } else {
          console.log('Producto no encontrado');
          setError('Producto no encontrado');
        }
      })
      .catch((error) => {
        console.log('¡Ha ocurrido un error!', error);
        setError('¡Ha ocurrido un error!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);


  if (error) {
    return <tr><td colSpan="5">{error}</td></tr>; // Mostrar error
  }

  if (!productInfo) {
    return <tr><td colSpan="5">Información del producto no disponible</td></tr>;
  }

  return (
    <tr>
      <td>
        <Image src={`/public/imgs/products/${productInfo.imagen}`} roundedCircle width='50' />
      </td>
      <td>{productInfo.nombre}</td>
      <td>{productInfo.precio} €</td>
      <td>{cantidad}</td>
      <td>{(productInfo.precio * cantidad).toFixed(2)} €</td>
    </tr>
  );
}

export default ItemPedido;