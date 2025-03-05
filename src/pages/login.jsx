import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import GlobalContext from '../store/globalContext';
import axios from 'axios';

function Login() {

    const setLogin = useContext(GlobalContext).setLogin;
    const setUsername = useContext(GlobalContext).setUsername;

    const [emailTemp, setEmailTemp] = useState('');
    const [passwordTemp, setPasswordTemp] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(emailTemp);
        console.log(passwordTemp);

        const authDAta = {
            email: emailTemp,
            password: passwordTemp,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDw-qrJJtrzAnjQY1eB6tUbruo3TanpKRc', authDAta)
        .then((response) => {
            alert('¡Login correcto!');
            console.log(response);
            setLogin(true);
            setUsername(response.data.email);
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
                        <Col>
                            <Form.Label>Correo electrónico:</Form.Label>
                            <Form.Control type='text' onChange={(event) => setEmailTemp(event.target.value)} value={emailTemp} />
                        </Col>
                        <Col>
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control type='password' onChange={(event) => setPasswordTemp(event.target.value)} value={passwordTemp} />
                        </Col>
                        <Col>
                            <Button type='submit' variant='primary'>LOGIN</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>
    );
}

export default Login;