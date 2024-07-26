import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Registre() {

    const goTo = useNavigate();

    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');

    function submit(e) {
        e.preventDefault();

        const opcions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name:nom, password })
        };

        fetch("http://localhost:3001/api/users", opcions)

        goTo('/usuaris')


    }

    return (<>
        <h1>Nou usuari</h1>

        <Row>
            <Col xs="8" >
                <Form onSubmit={submit} >

                    <Form.Group className="mb-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" value={nom} onInput={(e) => setNom(e.target.value)} />
                    </Form.Group>


                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onInput={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>

                </Form>
            </Col>
        </Row>


    </>)
}


export default Registre;