import './pedido.css';
import { Image, Button, Accordion, Card, Table } from 'react-bootstrap'; // Asegúrate de importar Card y Table
import { useContext } from 'react';
import PedidosContext from '../../store/pedidosContext';
import ItemPedido from './itemPedido';

function Pedido(props) {


    const fecha = props.fecha;
    const total = props.total;
    const opcionPago = props.opcionPago;
    const tarjeta = props.tarjeta;
    const listaProductos = props.listaProductos;
    const idPedido = props.id;
    const borrarPedido =  useContext(PedidosContext).borrarPedido; //se le introduce a la funcion la id del pedido


    return (
        <Accordion>
          <Card>
          <Accordion>
            Pedido ID: {idPedido} - Fecha: {fecha}
            <Button variant="link" onClick={borrarPedido} style={{ float: 'right' }}>
                <Image src="/public/imgs/icons/papelera.png" width="40" />
            </Button>
            </Accordion>
            <Accordion>
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
                    {listaProductos.map((producto) => (
                      <ItemPedido producto={producto} />
                    ))}
                  </tbody>
                </Table>
                <div className="total">
                  <h5>Total pedido: {total} €</h5>
                </div>
              </Card.Body>
            </Accordion>
          </Card>
        </Accordion>
      );
}

export default Pedido;