import './header.css';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className='header d-flex align-items-center justify-content-between p-3'>
            <div className='header-left'>
                <img src='../../public/imgs/icons/logo.png' alt='Logo' width='80' />
            </div>

            <div className='header-center'>
                <img src='../../public/imgs/icons/titulo_eslogan.png' alt='Banner' width='200' />
            </div>

            <div className='header-right'>
                <Nav className='justify-content-end'>
                    <Nav.Item>
                        <Link to='/' className='nav-link'>Pagina principal</Link> |
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/carrito'>
                            <img src='../../public/imgs/icons/carrito.png' alt='Carrito' width='30' />
                        </Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    );
}

export default Header;
