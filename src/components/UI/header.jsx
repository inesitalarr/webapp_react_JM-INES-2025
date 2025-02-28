import './header.css';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router';

function Header() {


    return (
        <div className='header'>
            <></>
            <p>With description, date and price</p>
          
            <Nav className='justify-content-end'>
                <Nav.Item>
                    <Link to='/'>Inicio</Link> |
                </Nav.Item>
                <Nav.Item>
                    <Link to='/about-us'>Sobre nosotros</Link> |
                </Nav.Item>
                <Nav.Item>
                    <Link to='/products'>Productos</Link> |
                </Nav.Item>
                <Nav.Item>
                    <Link to='/product-new'>Nuevo producto</Link> |
                </Nav.Item>
                <Nav.Item>
                    <Link to='/contact?sede=PAMPLONA&persona=Julián'>Contacto</Link> |
                </Nav.Item>
                <Nav.Item>
                    <Link to='/login'>LOGIN</Link> |
                </Nav.Item>
                <Nav.Item>
                    <Link to='/register'>REGISTRO</Link> |
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default Header;