import './itemConfirmation.css';
import { Image, Button } from 'react-bootstrap';
import CarritoContext from '../../store/carritoContext';
import { useContext } from 'react';
import deleteIcon from '/public/imgs/icons/papelera.png'; // Asegúrate de que la ruta sea correcta


function ItemConfirmation(props) {


    const listaProductos = useContext(CarritoContext).listaProductos;
    const setListaProductos = useContext(CarritoContext).setListaProductos;

    


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
                <div className='producto__cantidad'>{props.producto.cantidad}</div>
            </td>
            <td>

                <img
                    src={deleteIcon}
                    alt="Eliminar"
                    style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                    onClick={() => props.deteleItem(props.indice)}
                />

            </td>

        </tr>
    );
}

export default ItemConfirmation;