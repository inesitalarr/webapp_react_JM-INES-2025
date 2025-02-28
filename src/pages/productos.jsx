import React, { useEffect } from 'react';
import axios from 'axios';

function Productos() {

    useEffect(() => {
        axios.get('https://dsm-demo-firebase-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
          .then((response) => {
            let arrayProductos = [];
            for (const key in response.data) {
              arrayProductos.push({
                id: key,
                nombre: response.data[key].nombre,
                precio: response.data[key].precio,
                fecha: new Date(response.data[key].fecha),
                descripcion: response.data[key].descripcion
              })
            }
            setProductosFirebase(arrayProductos);
          })
          .catch((error) => { console.log('¡Se ha producido un error!') })
      }, [])

    return (
        <>
        </>
    );
}

export default Productos;