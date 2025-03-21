import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { useState, useContext,useEffect } from 'react';
import GlobalContext from '../store/globalContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';
import './login.css'; // Importa el archivo CSS
import ToastContext from '../store/toastContext';

function Register() {

    const [emailTemp, setEmailTemp] = useState('');
    const [passwordTemp, setPasswordTemp] = useState('');
    const [password2Temp, setPassword2Temp] = useState('');

    const loginHandler = useContext(GlobalContext).loginHandler;

    const generarToast = useContext(ToastContext).generarToast;

    const navega = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(emailTemp);
        console.log(passwordTemp);
        console.log(password2Temp);

        if (passwordTemp === password2Temp) {
            const authData = {
                email: emailTemp,
                password: passwordTemp,
                returnSecureToken: true
            }
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDw-qrJJtrzAnjQY1eB6tUbruo3TanpKRc', authData)
                .then((response) => {
                    generarToast('¡Registro completado correctamente!', 'primary');
                    console.log(response);
                    loginHandler(response.data.idToken, response.data.localId);
                    setTimeout(() => { navega('/') }, 500);
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.error?.message || '¡Registro incompleto!';
                switch (errorMessage) {
                    case 'EMAIL_EXISTS':
                        generarToast('El correo electrónico ya está en uso.', 'danger');
                        break;
                    case 'INVALID_EMAIL':
                        generarToast('El correo electrónico no es válido.', 'danger');
                        break;
                    case 'WEAK_PASSWORD : Password should be at least 6 characters':
                        generarToast('Contraseña débil. Mínimo 6 carácteres o números.', 'danger');
                        break;
                    default:
                        generarToast('¡Registro incompleto!', 'danger');
                        break;
                }
                console.log(errorMessage);
                })
        } else {
            generarToast('Las dos contraseñas deben coincidir', 'danger');
        }
    }


    return (
        <div>
            <Form onSubmit={submitHandler}>
                <Container>
                    <Row>
                        <Col className='p-2'>
                            <Form.Label>Correo electrónico:</Form.Label>
                            <Form.Control type='text' onChange={(event) => setEmailTemp(event.target.value)} value={emailTemp} style={{minWidth: 350}} />
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
                            <Form.Label>Repetir contraseña:</Form.Label>
                            <Form.Control type='password' onChange={(event) => setPassword2Temp(event.target.value)} value={password2Temp} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='p-2'>
                            <Button type='submit' variant='primary'>REGISTRARSE</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>
    );
}

export default Register;