import React, { useContext } from 'react';
import  CarritoContext  from '../store/carritoContext';
import { ListGroup, Button } from 'react-bootstrap';

function Carrito() {
  const { cartItems, removeFromCart } = useContext(CarritoContext);

  const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div>
      <h2>Carrito de Compra</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                {item.nombre} - {item.cantidad} x {item.precio}€
                <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Eliminar</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h4>Total: {total}€</h4>
          <NavLink to="/confirmacion">REALIZAR PEDIDO</NavLink>
        </>
      )}
    </div>
  );
}

export default Carrito;
