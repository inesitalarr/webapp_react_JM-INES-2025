import './product.css';
import { Image, Button } from 'react-bootstrap';
import CarritoContext from '../../store/carritoContext';
import { useContext } from 'react';

function Product(props) {


    const listaProductos = useContext(CarritoContext).listaProductos;
    const setListaProductos = useContext(CarritoContext).setListaProductos;

    const menosHandler = () => {
        console.log('Quitar ' + props.indice);

        for (let i = 0; i < listaProductos.length; i++) {
            if (listaProductos[i][0] === props.indice) {
                if (listaProductos[i][1] == 1) {
                    let aux = listaProductos;
                    aux.splice(i, 1);
                    setListaProductos(aux);
                } else {
                    let aux = listaProductos;
                    aux[i][1] = listaProductos[i][1] + 1;
                    setListaProductos(aux);
                }
            }
        }
        console.log(listaProductos);
    }

    const masHandler = () => {
        console.log('Añadir ' + props.indice);

        let existe = false;
        for (let i = 0; i < listaProductos.length; i++) {
            if (listaProductos[i][0] === props.indice) {
                existe = true;

                let aux = listaProductos;
                aux[i][1] = listaProductos[i][1] + 1;

                setListaProductos(aux);
            }
        }

        if (!existe) {
            let aux = listaProductos;
            aux.push([props.indice, 1]);
            setListaProductos(aux);
        }
        console.log(listaProductos);
    }

    return (
        <tr>
            <td>
                <Image src={`/imgs/products/${props.producto.imagen}`} roundedCircle width='100' />
            </td>
            <td>
                <div className='producto__categoria'>{props.producto.categoría}</div>
            </td>
            <td>
                <h2>{props.producto.nombre}</h2>
            </td>
            <td>
                <div className='producto__precio'>{props.producto.precio}</div>
            </td>
            <td>
                <div className='producto__stock'>{props.producto.stock}</div>
            </td>
            <td>
                <Button variant='secondary' onClick={menosHandler}>-</Button>
            </td>
            <td>
                <Button variant='secondary' onClick={masHandler}>+</Button>
            </td>
        </tr>
    );
}

export default Product;