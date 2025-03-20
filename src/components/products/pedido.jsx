import './pedido.css';
import { Image, Button, Accordion, Table, Row, Col, Modal } from 'react-bootstrap'; // Asegúrate de importar Card y Table
import { useState, useContext } from 'react';
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

  const [show, setShow] = useState(false);

  const cerrarHandler = () => setShow(false);
  const mostrarHandler = () => setShow(true);

  const borrarHandler = () => {
    borrarPedido(idPedido);
    setShow(false);
  }


  return (
    <>
      <Modal show={show} onHide={cerrarHandler} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de eliminar este pedido?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarHandler}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={borrarHandler}>
            Borrar pedido
          </Button>
        </Modal.Footer>
      </Modal>


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
            <Table striped bordered hover variant='secondary'>
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
                <Button variant="link" onClick={mostrarHandler} style={{ float: 'right' }}>
                  <Image src="/imgs/icons/papelera.png" width="40" />
                </Button>
              </Col>
            </Row>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}

export default Pedido;