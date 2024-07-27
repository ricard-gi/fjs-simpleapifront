import { useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Registre() {
    const goTo = useNavigate();

    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');
    const [foto, setFoto] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);

    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', nom);
        formData.append('password', password);
        if (foto) {
            formData.append('foto', foto);
        }

        const opcions = {
            method: 'POST',
            body: formData,
        };

        fetch("http://localhost:3001/api/users", opcions)
            .then(response => response.json())
            .then(data => {
                // Aquí pots gestionar la resposta de l'API si cal
                console.log(data);
                goTo('/usuaris');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function handleFotoChange(e) {
        const file = e.target.files[0];
        setFoto(file);
        setFotoPreview(URL.createObjectURL(file));
    }

    return (
        <>
            <h1>Nou usuari</h1>
            <Row>
                <Col xs="8">
                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" value={nom} onInput={(e) => setNom(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onInput={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Foto</Form.Label>
                            <Form.Control type="file" onChange={handleFotoChange} />
                        </Form.Group>

                        {fotoPreview && (
                            <div className="mb-3">
                                <Image src={fotoPreview} alt="Foto de l'usuari" thumbnail />
                            </div>
                        )}

                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default Registre;
