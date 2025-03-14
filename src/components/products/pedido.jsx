import './pedido.css';
import { Image, Button, Accordion, Table, Row, Col } from 'react-bootstrap'; // Asegúrate de importar Card y Table
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
  const borrarPedido = useContext(PedidosContext).borrarPedido; //se le introduce a la funcion la id del pedido

  const borrarHandler = () => {
    borrarPedido(idPedido);
  }


  return (
    <Accordion.Item eventKey={idPedido}>
      <Accordion.Header>
        Pedido ID: {idPedido} - Fecha: {fecha}
      </Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col>
            <p>Opción de pago: {opcionPago}</p>
          </Col>
          <Col>
            <p>Número de tarjeta: {tarjeta}</p>
          </Col>
        </Row>
        <Row>
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
              {listaProductos.map((producto) => {
                return (<ItemPedido key={producto[0]} producto={producto} />)
              })}
            </tbody>
          </Table>
          <Row className="total">
            <Col>
              <h5>Total pedido: {total.toFixed(2)} €</h5>
            </Col>
            <Col>
              <Button variant="link" onClick={borrarHandler} style={{ float: 'right' }}>
                <Image src="/imgs/icons/papelera.png" width="40" />
              </Button>
            </Col>
          </Row>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Pedido;