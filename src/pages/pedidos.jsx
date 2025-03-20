import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PedidosContext from '../store/pedidosContext';
import { Accordion, Row, Alert } from 'react-bootstrap';
import Pedido from '../components/products/pedido.jsx';
import GlobalContext from '../store/globalContext';
import ToastContext from '../store/toastContext.jsx';

function Pedidos() {

    const [pedidos, setPedidos] = useState([]);

    const idToken = useContext(GlobalContext).idToken;
    const uid = useContext(GlobalContext).uid;
    console.log(uid);

    const generarToast = useContext(ToastContext).generarToast;

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
            <PedidosContext.Provider value={{ pedidos: pedidos, borrarPedido: borrarPedido }}>
                <Row className='p-6'>
                    <h2 style={{color: 'white'}}>Historial de tus pedidos</h2>
                </Row>
                <Row>
                    {pedidos.length === 0 ? (
                        <Alert>No se han realizado pedidos</Alert>
                    ) : (
                        <Accordion style={{ minWidth:1200, maxWidth:1200 }}>
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