import { createContext, useState } from 'react';
import React from 'react';

const CarritoContext = React.createContext({
    listaProductos: []
});



export default CarritoContext;