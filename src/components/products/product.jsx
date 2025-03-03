import './product.css';
import { Image } from 'react-bootstrap';

function Product(props) {
    //return (
    //    <div className='producto'>
    //        <div className='producto__descripcion'>
    //            <Image src={`/imgs/products/${props.producto.imagen}`} roundedCircle width='100' />
    //            <div className='producto__categoria'>{props.producto.categoría}</div>
    //            <h2>{props.producto.nombre}</h2>
    //            <div className='producto__precio'>{props.producto.precio}</div>
    //            <div className='producto__stock'>{props.producto.stock}</div>
    //        </div>
    //    </div>
    //);
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
        </tr>
    );
}

export default Product;