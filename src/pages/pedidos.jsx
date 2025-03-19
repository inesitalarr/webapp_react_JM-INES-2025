import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PedidosContext from '../store/pedidosContext';
import { Accordion, Row, Button, Toast } from 'react-bootstrap';
import Pedido from '../components/products/pedido.jsx';
import GlobalContext from '../store/globalContext';
import { Link } from 'react-router';
import ToastContext from '../store/toastContext.jsx';

function Pedidos() {

    const [pedidos, setPedidos] = useState([]);

    const idToken = useContext(GlobalContext).idToken;
    const uid = useContext(GlobalContext).uid;
    console.log(uid);

    const generarToast = useContext(ToastContext).generarToast;

    const provocarLogout = useContext(GlobalContext).provocarLogout;

    useEffect(() => {
        axios.get('https://webapp-react-jm-ines-2025-default-rtdb.europe-west1.firebasedatabase.app/pedidos.json')
            .then((response) => {
                let arrayPedidos = [];
                for (const key in response.data) {
                    console.log(response.data[key].uid === uid);
                    if (response.data[key].uid === uid) {
                        arrayPedidos.push({
                            id: key,
                            fecha: response.data[key].fecha,
                            total: response.data[key].total,
                            listaProductos: response.data[key].listaProductos,
                            opcionPago: response.data[key].opcionPago,
                            tarjeta: response.data[key].tarjeta
                        })
                    }
                }
                setPedidos(arrayPedidos);
            })
            .catch((error) => { console.log('¡Ha ocurrido un error!') })
    }, [uid, pedidos.length]);

    const borrarPedido = (id) => {
        axios.delete(`https://webapp-react-jm-ines-2025-default-rtdb.europe-west1.firebasedatabase.app/pedidos/${id}.json?auth=${idToken}`)
            .then((response) => {
                console.log(response);
                const updatedPedidos = pedidos.filter(pedido => pedido.id !== id);
                setPedidos(updatedPedidos);
                generarToast('Pedido eliminado correctamente', 'success');
            })
            .catch((error) => { console.log('¡Ha ocurrido un error!') })
    }



    return (

        <>
            <div style={{ position: 'fixed', top: '120px', left: '20px' }}>
                <Link to="/">
                    <Button variant="danger" onClick={provocarLogout}>
                        LOGOUT
                    </Button>
                </Link>
            </div>
            <PedidosContext.Provider value={{ pedidos: pedidos, borrarPedido: borrarPedido }}>
                <Row>
                    <h2 style={{color: 'white'}}>Historial de tus pedidos</h2>
                </Row>
                <Row>
                    {pedidos.length === 0 ? (
                        <p>No hay pedidos</p>
                    ) : (
                        <Accordion>
                            {pedidos.map((pedido) => {
                                return (<Pedido key={pedido.id} id={pedido.id} fecha={pedido.fecha} total={pedido.total} listaProductos={pedido.listaProductos} opcionPago={pedido.opcionPago} tarjeta={pedido.tarjeta} />
                                );
                            })}
                        </Accordion>
                    )}
                </Row>
            </PedidosContext.Provider>
        </>
    );

}

export default Pedidos;