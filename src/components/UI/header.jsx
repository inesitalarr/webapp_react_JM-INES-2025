import './header.css';
import { Nav, OverlayTrigger, Tooltip, Dropdown, DropdownButton, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router'; // Cuidado, usa 'react-router-dom' no 'react-router'
import { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../store/globalContext';
import CarritoContext from '../../store/carritoContext';
import 'animate.css'; // Importa animate.css
import Login from '../../pages/login_desp.jsx';
import Register from '../../pages/register_desp.jsx';


function Header(props) {

    const login = useContext(GlobalContext).login;
    const { listaProductos, setListaProductos } = useContext(CarritoContext);
    const [numItems, setNumItems] = useState(0);

    useEffect(() => {
        // Obtener datos de localStorage al cargar el componente
        const storedCartItems = localStorage.getItem('listaProductos');
        if (storedCartItems) {
            try {
                const parsedCartItems = JSON.parse(storedCartItems);
                if (Array.isArray(parsedCartItems)) {
                    setListaProductos(parsedCartItems);
                }
            } catch (error) {
                console.error('Error parsing JSON from localStorage:', error);
                localStorage.removeItem('listaProductos'); // Eliminar datos inválidos
            }
        }
    }, [setListaProductos]);

    useEffect(() => {
        // Actualizar el número de items en el carrito
        if (listaProductos.length === 0) {
            setNumItems(0);
        } else {
            setNumItems(listaProductos.reduce((acc, item) => acc + item[1], 0));
        }

        // Guardar datos en localStorage cada vez que listaProductos cambie
        if (listaProductos && listaProductos.length > 0) {
            localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
        } else {
            localStorage.removeItem('listaProductos'); // Eliminar datos si el carrito está vacío
        }
    }, [listaProductos]);

    console.log("numItems: ", numItems);


    let parteLogin, parteLink, parteDesplegable;
    if (login) {
        parteLogin = (
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-logged-in">Ver mis pedidos</Tooltip>}
            >
                <img src='/imgs/icons/logged_in.png' alt='Login' width='70' />
            </OverlayTrigger>
        );
        parteLink = "/pedidos";
        parteDesplegable = (
            <>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            </>
        );
    } else {
        parteLogin = (
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-logged-out">Iniciar sesión</Tooltip>}
            >
                <img src='/imgs/icons/logged_out.png' alt='Login' width='70' />
            </OverlayTrigger>
        );
        parteLink = "/login"
        parteDesplegable = (
            <Tabs
                defaultActiveKey="login"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="login" title="Iniciar sesión">
                    <Login />
                </Tab>
                <Tab eventKey="register" title="Registrarse">
                    <Register />
                </Tab>
            </Tabs>
        );
    }

    return (
        <header className='header'>
            <div className='header-left'>
                <img src='/imgs/icons/logo.png' alt='Logo' width='80' />
            </div>

            <div className='header-center'>
                <img src='/imgs/icons/titulo_eslogan.png' alt='Eslogan' width='250' className="animate__animated animate__fadeInDown" />
            </div>

            <div className='header-right'>
                <Nav>
                    <Nav.Item>
                        <Link to='/' className='nav-link' style={{ color: '#ADD8E6', textDecoration: 'none', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Página principal    |</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-cart">Ver carrito</Tooltip>}
                        >
                            <Link to='/carrito'>
                                <div className={`cart-icon ${props.isCartHighlighted ? 'highlighted' : ''} ${props.isCartHighlightedRed ? 'highlighted-red' : ''}`}>
                                    {numItems > 0 ?
                                        <span className="position-absolute top-20 start-99 translate-middle badge rounded-pill bg-danger" >
                                            {numItems}
                                            < span className="visually-hidden" > unread messages</span>
                                        </span>
                                        : null}

                                    <img src='/imgs/icons/carrito.png' alt='Carrito' width='70' />

                                </div>
                            </Link>
                        </OverlayTrigger>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to={parteLink}>
                            {parteLogin}
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Dropdown className="d-inline mx-2" autoClose="outside" data-bs-theme="dark" drop='down-centered'>
                            <Dropdown.Toggle id="dropdown-autoclose-outside" variant='dark'>
                                {parteLogin}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {parteDesplegable}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav.Item>
                </Nav>
            </div >

        </header >

    );
}

export default Header;
