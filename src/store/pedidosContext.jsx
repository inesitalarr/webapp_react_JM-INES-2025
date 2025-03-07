import React from 'react';

const PedidosContext = React.createContext({
    pedidos: [],
    borrarPedido: () => {}
});



export default PedidosContext;