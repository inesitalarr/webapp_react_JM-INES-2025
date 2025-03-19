import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import GlobalContext from '../store/globalContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';
import ToastContext from '../store/toastContext';

function Login() {

    const [emailTemp, setEmailTemp] = useState('');
    const [passwordTemp, setPasswordTemp] = useState('');

    const loginHandler = useContext(GlobalContext).loginHandler;
    const generarToast = useContext(ToastContext).generarToast;

    const navega = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(emailTemp);
        console.log(passwordTemp);

        const authData = {
            email: emailTemp,
            password: passwordTemp,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDw-qrJJtrzAnjQY1eB6tUbruo3TanpKRc', authData)
            .then((response) => {
                //alert('¡Login correcto!');
                generarToast('¡Login correcto!');
                console.log(response);
                loginHandler(response.data.idToken, response.data.localId);
                setTimeout(() => { navega('/') }, 500);
            })
            .catch((error) => {
                alert('¡Login incorrecto!');
                console.log(error);
            })
    }


    return (
        <>
            <Form onSubmit={submitHandler}>
                <Container>
                    <Row>
                        <Col className='p-2'>
                            <Form.Label>Correo electrónico:</Form.Label>
                            <Form.Control type='text' onChange={(event) => setEmailTemp(event.target.value)} value={emailTemp} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='p-2'>
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control type='password' onChange={(event) => setPasswordTemp(event.target.value)} value={passwordTemp} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='p-2'>
                            <Button type='submit' variant='primary'>LOGIN</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='p-2'>
                            <p>¿Todavía no tienes cuenta con nosotros? <Link to="/registro">Regístrate aquí</Link></p>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>
    );
}

export default Login;