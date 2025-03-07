import './pedido.css';
import { Image, Button } from 'react-bootstrap';
import { useContext } from 'react';
import PedidosContext from '../../store/pedidosContext';


function Pedido(props) {


    const fecha = props.fecha;
    const total = props.total;
    const opcionPago = props.opcionPago;
    const tarjeta = props.tarjeta;
    const listaProductos = props.listaProductos;
    const idPedido = props.idPedido;
    const borrarPedido =  useContext(PedidosContext).borrarPedido; //se le introduce a la funcion la id del pedido

    


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

                <Button
                    variant='secondary'
                    onClick={menosHandler}
                    value={props.indice}
                    disabled={!productoEnCarrito}
                >
                -
                </Button>


            </td>
            <td>
                <Button variant='secondary' onClick={masHandler} value={props.indice}>+</Button>
            </td>
        </tr>
    );
}

export default Pedido;