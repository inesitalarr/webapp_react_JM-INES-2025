import React from 'react';

const CarritoContext = React.createContext({
    listaProductos: [],
    setListaProductos: () => {},
    menosHandler: () => {},
    masHandler: () => {}
});



export default CarritoContext;