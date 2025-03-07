import './header.css';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router'; // Cuidado, usa 'react-router-dom' no 'react-router'
import { useContext } from 'react';
import GlobalContext from '../../store/globalContext';

function Header(props) {

    const login = useContext(GlobalContext).login;

    let parteLogin, parteLink;
    if (login) {
        parteLogin = <img src='/imgs/icons/logged_in.png' alt='Login' width='70' />;
        parteLink = "/login";
    } else {
        parteLogin = <img src='/imgs/icons/logged_out.png' alt='Login' width='70' />;
        parteLink = "/pedidos"

    }

    return (
        <header className='header'>
            <div className='header-left'>
                <img src='/imgs/icons/logo.png' alt='Logo' width='80' />
            </div>

            <div className='header-center'>
                <img src='/imgs/icons/titulo_eslogan.png' alt='Eslogan' width='250' />
            </div>

            <div className='header-right'>
                <Nav>
                    <Nav.Item>
                        <Link to='/' className='nav-link' style={{ color: '#ADD8E6', textDecoration: 'none', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Página principal    |</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/carrito'>
                        <div className={`cart-icon ${props.isCartHighlighted ? 'highlighted' : ''} ${props.isCartHighlightedRed ? 'highlighted-red' : ''}`}>
                            <img src='/imgs/icons/carrito.png' alt='Carrito' width='70' />
                        </div>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to={parteLink}>
                            {parteLogin}
                        </Link>
                    </Nav.Item>
                </Nav>
            </div>
            
        </header>
       
    );
}

export default Header;
