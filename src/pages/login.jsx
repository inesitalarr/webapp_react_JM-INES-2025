import { Form, Col, Row, Container, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import GlobalContext from '../store/globalContext';

function Login() {

    const login = useContext(GlobalContext).login;
    const setLogin = useContext(GlobalContext).setLogin;
    const username = useContext(GlobalContext).username;
    const setUsername = useContext(GlobalContext).setUsername;

    const [usernameTemp, setUsernameTemp] = useState('');
    const [passwordTemp, setPasswordTemp] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(usernameTemp);
        console.log(passwordTemp);
    }



    return (
        <>
            <Form onSubmit={submitHandler}>
                <Container>
                    <Row>
                        <Col>
                            <Form.Label>Nombre de usuario:</Form.Label>
                            <Form.Control type='text' onChange={(event) => setUsernameTemp(event.target.value)} value={usernameTemp} />
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