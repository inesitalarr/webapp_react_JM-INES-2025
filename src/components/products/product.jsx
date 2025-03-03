import './product.css';
import { Image, Button } from 'react-bootstrap';
import CarritoContext from '../../store/carritoContext';
import { useContext } from 'react';

function Product(props) {


    //const listaProductos = useContext(CarritoContext).listaProductos;

    const menosHandler = () => {
        console.log('Quitar ' + props.indice);
    }

    const masHandler = () => {
        console.log('Añadir ' + props.indice);
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