import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import GlobalContext from "../store/globalContext";
import CarritoContext from "../store/carritoContext";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import ToastContext from "../store/toastContext";

function Formulario() {


    const [emailTemp, setEmailTemp] = useState('');
    const [passwordTemp, setPasswordTemp] = useState('');
    const [nombreTemp, setNombreTemp] = useState('');
    const [apellidosTemp, setApellidosTemp] = useState('');
    const [telefonoTemp, setTelefonoTemp] = useState(0);
    const [direccionTemp, setDireccionTemp] = useState('');
    const [codigoPostalTemp, setCodigoPostalTemp] = useState(0);
    const [ciudadTemp, setCiudadTemp] = useState('');
    const [provinciaTemp, setProvinciaTemp] = useState('');
    const [opcionPagoTemp, setOpcionPagoTemp] = useState('');
    const [tarjetaTemp, setTarjetaTemp] = useState(0);
    const [caducidadMesTemp, setCaducidadMesTemp] = useState(0);
    const [caducidadAnioTemp, setCaducidadAnioTemp] = useState(0);
    const [cvvTemp, setCvvTemp] = useState(0);

    const login = useContext(GlobalContext).login;
    const loginHandler = useContext(GlobalContext).loginHandler;
    const idToken = useContext(GlobalContext).idToken;
    const uid = useContext(GlobalContext).uid;
    const listaProductos = useContext(CarritoContext).listaProductos;
    const vaciarCarrito = useContext(CarritoContext).vaciarCarrito;
    const total = useContext(CarritoContext).total;

    const generarToast = useContext(ToastContext).generarToast;

    const navega = useNavigate();

    useEffect(() => {
        if (login) {
            const authData = {
                idToken: idToken
            }
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDw-qrJJtrzAnjQY1eB6tUbruo3TanpKRc', authData)
                .then((response) => {
                    setEmailTemp(response.data.users[0].email);
                })
                .catch((error) => {
                    generarToast('¡Login incorrecto!', 'danger');
                    console.log(error);
                })
        }
    }, [login]);

    const actualizarStockProducto = (indice, cantidad) => {
        axios.get('https://webapp-react-jm-ines-2025-default-rtdb.europe-west1.firebasedatabase.app/productos/' + indice + '.json')
            .then((response) => {
                const stock_producto = response.data.stock;
                let aux;
                if (stock_producto - cantidad > 5) {
                    aux = stock_producto - cantidad;
                } else {
                    aux = 100;
                }

                const stockActualizado = {
                    imagen: response.data.imagen,
                    categoría: response.data.categoría,
                    nombre: response.data.nombre,
                    precio: response.data.precio,
                    stock: aux
                }
                axios.put('https://webapp-react-jm-ines-2025-default-rtdb.europe-west1.firebasedatabase.app/productos/' + indice + '.json?auth=' + idToken, stockActualizado)
                    .then((response) => {
                        console.log('Producto editado correctamente');
                    })
                    .catch((error) => {
                        generarToast('¡Se ha producido un error!', 'danger');
                    })
            })
            .catch((error) => { console.log('¡Ha ocurrido un error!') })
    }

    const actualizarStock = () => {
        for (let i = 0; i < listaProductos.length; i++) {
            actualizarStockProducto(listaProductos[i][0], listaProductos[i][1]);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(emailTemp);
        console.log(passwordTemp);
        console.log(nombreTemp);
        console.log(apellidosTemp);
        console.log(telefonoTemp);
        console.log(direccionTemp);
        console.log(codigoPostalTemp);
        console.log(ciudadTemp);
        console.log(provinciaTemp);
        console.log(opcionPagoTemp);
        console.log(tarjetaTemp);
        console.log(caducidadMesTemp);
        console.log(caducidadAnioTemp);
        console.log(cvvTemp);
        console.log(listaProductos);


        if (login) {
            const current_time = new Date();
            const pedidoData = {
                uid: uid,
                nombre: nombreTemp,
                apellidos: apellidosTemp,
                telefono: telefonoTemp,
                direccion: direccionTemp,
                codigoPostal: codigoPostalTemp,
                ciudad: ciudadTemp,
                provincia: provinciaTemp,
                opcionPago: opcionPagoTemp,
                tarjeta: tarjetaTemp,
                caducidadMes: caducidadMesTemp,
                caducidadAnio: caducidadAnioTemp,
                cvv: cvvTemp,
                listaProductos: listaProductos,
                total: total,
                fecha: current_time.getDate() + '/' + (current_time.getMonth() + 1) + '/' + current_time.getFullYear()
            }
            axios.post('https://webapp-react-jm-ines-2025-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json?auth=' + idToken, pedidoData)
                .then((response) => {
                    generarToast('Pedido realizado correctamente', 'success');
                    actualizarStock();
                    vaciarCarrito();
                    setTimeout(() => { navega('/agradecimiento') }, 500);
                })
                .catch((error) => {
                    console.log('¡Se ha producido un error!');
                })
        } else {
            const authData = {
                email: emailTemp,
                password: passwordTemp,
                returnSecureToken: true
            }
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDw-qrJJtrzAnjQY1eB6tUbruo3TanpKRc', authData)
                .then((response) => {
                    console.log(response);
                    loginHandler(response.data.idToken, response.data.localId);

                    const current_time = new Date();
                    const pedidoData = {
                        uid: response.data.localId,
                        nombre: nombreTemp,
                        apellidos: apellidosTemp,
                        telefono: telefonoTemp,
                        direccion: direccionTemp,
                        codigoPostal: codigoPostalTemp,
                        ciudad: ciudadTemp,
                        provincia: provinciaTemp,
                        opcionPago: opcionPagoTemp,
                        tarjeta: tarjetaTemp,
                        caducidadMes: caducidadMesTemp,
                        caducidadAnio: caducidadAnioTemp,
                        cvv: cvvTemp,
                        listaProductos: listaProductos,
                        total: total,
                        fecha: current_time.getDate() + '/' + (current_time.getMonth() + 1) + '/' + current_time.getFullYear()
                    }
                    axios.post('https://webapp-react-jm-ines-2025-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json?auth=' + response.data.idToken, pedidoData)
                        .then((response) => {
                            generarToast('Pedido realizado correctamente', 'success');
                            actualizarStock();
                            vaciarCarrito();
                            setTimeout(() => { navega('/agradecimiento') }, 500);
                        })
                        .catch((error) => {
                            console.log('¡Se ha producido un error!');
                        })
                })
                .catch((error) => {
                    generarToast('¡Login incorrecto!', 'danger');
                    console.log(error);
                })
        }
    }

    return (
        <>
            <Form onSubmit={submitHandler}>
                <Container fluid='sm'>
                    <Row>
                        <Col className='p-2'>
                            <Form.Label style={{color: 'white'}}>Correo electrónico:</Form.Label>
                            <Form.Control type='text' onChange={(event) => setEmailTemp(event.target.value)} value={emailTemp} disabled={login} />
                        </Col>
                        <Col className='p-2'>
                            <Form.Label style={{color: 'white'}}>Contraseña:</Form.Label>
                            <Form.Control type='password' onChange={(event) => setPasswordTemp(event.target.value)} value={passwordTemp} disabled={login} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='p-2'>
                            <Form.Label style={{color: 'white'}}>Nombre:</Form.Label>
                            <Form.Control type='text' onChange={(event) => setNombreTemp(event.target.value)} value={nombreTemp} />
                        </Col>
                        <Col className='p-2'>
                            <Form.Label style={{color: 'white'}}>Apellidos:</Form.Label>
                            <Form.Control type='text' onChange={(event) => setApellidosTemp(event.target.value)} value={apellidosTemp} />
                        </Col>
                        <Col className='p-2'>
                            <Form.Label style={{color: 'white'}}>Teléfono:</Form.Label>
                            <Form.Control type='number' onChange={(event) => setTelefonoTemp(event.target.value)} value={telefonoTemp ? telefonoTemp : ''} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='p-2'>
                            <Form.Label style={{color: 'white'}}>Dirección:</Form.Label>
                            <Form.Control type='text' onChange={(event) => setDireccionTemp(event.target.value)} value={direccionTemp} />
                        </Col>
                        <Col className='p-2'>
                            <Form.Label style={{color: 'white'}}>Código Postal:</Form.Label>
                            <Form.Control type='number' onChange={(event) => setCodigoPostalTemp(event.target.value)} value={codigoPostalTemp ? codigoPostalTemp : ''} />
                        </Col>
                        <Col className='p-2'>
                            <Form.Label style={{color: 'white'}}>Ciudad:</Form.Label>
                            <Form.Control type='text' onChange={(event) => setCiudadTemp(event.target.value)} value={ciudadTemp} />
                        </Col>
                        <Col className='p-2'>
                            <Form.Label style={{color: 'white'}}>Provincia:</Form.Label>
                            <Form.Control type='text' onChange={(event) => setProvinciaTemp(event.target.value)} value={provinciaTemp} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2} className='p-2'>
                            <Form.Check style={{color: 'white'}}
                                value="crédito"
                                type="radio"
                                aria-label="radio 1"
                                label="Crédito"
                                onChange={(event) => setOpcionPagoTemp(event.target.value)}
                                checked={opcionPagoTemp === "crédito"}
                            />
                            <Form.Check style={{color: 'white'}}
                                value="débito"
                                type="radio"
                                aria-label="radio 2"
                                label="Débito"
                                onChange={(event) => setOpcionPagoTemp(event.target.value)}
                                checked={opcionPagoTemp === "débito"}
                            />
                        </Col>
                        {opcionPagoTemp === "crédito" || opcionPagoTemp === "débito" ?
                            <>
                                <Col className='p-2' sm={5}>
                                    <Form.Label style={{color: 'white'}}>Número de la tarjeta de {opcionPagoTemp}:</Form.Label>
                                    <Form.Control type='number' onChange={(event) => setTarjetaTemp(event.target.value)} value={tarjetaTemp ? tarjetaTemp : ''} />
                                </Col>
                                <Col className='p-2' sm={3}>
                                    <Form.Label style={{color: 'white'}}>Caducidad:</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control type='number' onChange={(event) => setCaducidadMesTemp(event.target.value)} value={caducidadMesTemp ? caducidadMesTemp : ''} placeholder="mm" />
                                        </Col>
                                        <Col>
                                            <Form.Control type='number' onChange={(event) => setCaducidadAnioTemp(event.target.value)} value={caducidadAnioTemp ? caducidadAnioTemp : ''} placeholder="aa" />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className='p-2' sm={1}>
                                    <Form.Label style={{color: 'white'}}>CVV:</Form.Label>
                                    <Form.Control type='number' onChange={(event) => setCvvTemp(event.target.value)} value={cvvTemp ? cvvTemp : ''} />
                                </Col>
                            </>
                            : null}

                    </Row>
                    <Row>
                        <Col className='p-2'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant='danger'><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>CANCELAR PEDIDO</Link></Button>
                                <div>
                                    <Button type='submit' variant='success' style={{ fontWeight: 'bold' }}>REALIZAR PEDIDO</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>
    );
}

export default Formulario;