import './pedido.css';
import { Image, Button, Accordion } from 'react-bootstrap';
import { useContext } from 'react';
import PedidosContext from '../../store/pedidosContext';
import ItemPedido from '../../products/pedidosContext'; // Asegúrate de que la ruta sea correcta


function Pedido(props) {


    const fecha = props.fecha;
    const total = props.total;
    const opcionPago = props.opcionPago;
    const tarjeta = props.tarjeta;
    const listaProductos = props.listaProductos;
    const idPedido = props.idPedido;
    const borrarPedido =  useContext(PedidosContext).borrarPedido; //se le introduce a la funcion la id del pedido


    return (
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Pedido ID: {idPedido} - Fecha: {fecha}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaProductos.map((producto, index) => (
                      <ItemPedido key={index} producto={producto} />
                    ))}
                  </tbody>
                </Table>
                <div className="total">
                  <h5>Total: {total} €</h5>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      );
}

export default Pedido;