import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { useState, useContext,useEffect } from 'react';
import GlobalContext from '../store/globalContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';
import './login.css'; // Importa el archivo CSS


function Register() {

    const [emailTemp, setEmailTemp] = useState('');
    const [passwordTemp, setPasswordTemp] = useState('');
    const [password2Temp, setPassword2Temp] = useState('');

    const loginHandler = useContext(GlobalContext).loginHandler;

    const navega = useNavigate();
    
    useEffect(() => {
        document.body.classList.add('login-background');
        return () => {
            document.body.classList.remove('login-background');
        };
    }, []);

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
                    alert('Registro correcto!');
                    console.log(response);
                    loginHandler(response.data.idToken, response.data.localId);
                    setTimeout(() => { navega('/') }, 500);
                })
                .catch((error) => {
                    alert('Registro incorrecto!');
                    console.log(error);
                })
        } else {
            alert('Las dos contraseñas deben coincidir');
        }
    }


    return (
        <div className='principal'>
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