import React from 'react';

const PedidosContext = React.createContext({
    pedidos: pedidos,
    borrarPedido: () => {}
});



export default PedidosContext;