import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router'; // Cambiado a 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function Agradecimiento() {
  return (
    <Container className="text-center mt-1">
      <Row>
        <Col>
          <h1 className="display-4" style={{color: 'white'}}>¡Gracias por tu compra!</h1>
          <p className="lead" style={{color: 'white'}}>Tu pedido ha sido realizado con éxito.</p>
          <div className="my-4">
            <img
              src="/imgs/icons/final.gif"
              alt="Gracias"
              className="img-fluid rounded-circle"
              style={{ animation: 'bounce 2s infinite',width: '200px', height: '200px' }}
            />
          </div>
          <Button variant="success" size="lg">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              REALIZAR NUEVO PEDIDO
            </Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Agradecimiento;