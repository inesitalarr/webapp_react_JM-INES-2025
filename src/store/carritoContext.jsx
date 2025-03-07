import React from 'react';

const CarritoContext = React.createContext({
    listaProductos: [],
    setListaProductos: () => {},
    menosHandler: () => {},
    masHandler: () => {},
    vaciarCarrito: () => {},
    total: 0,
    totalHandler: () => {}
});



export default CarritoContext;