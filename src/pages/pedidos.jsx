import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PedidosContext from '../store/pedidosContext';
import { Accordion } from 'react-bootstrap';
import Pedido from '../components/products/pedido.jsx';
import GlobalContext from '../store/globalContext';

function Pedidos() {

    const [pedidos, setPedidos] = useState([]);

    const idToken = useContext(GlobalContext).idToken;
    const uid = useContext(GlobalContext).uid;
    console.log(uid);

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
    }, [uid]);

    const borrarPedido = (id) => {
        axios.delete(`https://webapp-react-jm-ines-2025-default-rtdb.europe-west1.firebasedatabase.app/pedidos/${id}.json?auth=${idToken}`)
            .then((response) => {
                console.log(response);
                const updatedPedidos = pedidos.filter(pedido => pedido.id !== id);
                setPedidos(updatedPedidos);
            })
            .catch((error) => { console.log('¡Ha ocurrido un error!') })
    }



    return (
        <PedidosContext.Provider value={{ pedidos: pedidos, borrarPedido: borrarPedido }}>
            <h2>Lista de pedidos</h2>
            {pedidos.length === 0 ? (
                <p>No hay pedidos</p>
            ) : (
                <Accordion>
                    {pedidos.map((pedido) => {
                        return(<Pedido key={pedido.id} id={pedido.id} fecha={pedido.fecha} total={pedido.total} listaProductos={pedido.listaProductos} opcionPago={pedido.opcionPago} tarjeta={pedido.tarjeta} />
                        );
                    })}
                </Accordion>
            )}
        </PedidosContext.Provider>
    );
}

export default Pedidos;