import './itemCarrito.css';
import { Image, Button } from 'react-bootstrap';
import CarritoContext from '../../store/carritoContext';
import { useContext } from 'react';

function ItemCarrito(props) {


    const menosHandler = useContext(CarritoContext).menosHandler;
    const masHandler = useContext(CarritoContext).masHandler;

    

    return (
        <tr>
            <td>
                <Image src={`/imgs/products/${props.producto.imagen}`} roundedCircle width='100' />
            </td>
            <td>
                <div className='producto__categoria'>{props.producto.categoría}</div>
            </td>
            <td>
                <h4>{props.producto.nombre}</h4>
            </td>
            <td>
                <div className='producto__precio'>{props.producto.precio}</div>
            </td>
            <td>
                <div className='producto__cantidad'>{props.producto.cantidad}</div>
            </td>
            <td>
                <Button variant='secondary' onClick={menosHandler} value={props.indice}>-</Button>
            </td>
            <td>
                <Button variant='secondary' onClick={masHandler} value={props.indice}>+</Button>
            </td>
        </tr>
    );
}

export default ItemCarrito;