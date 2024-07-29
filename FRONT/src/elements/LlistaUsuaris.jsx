
import { useEffect, useState, useContext } from "react";
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { URL } from './config';

import { TitolContainer } from './styled_common';
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../UserContext.js";


function Llista() {
  const { token } = useContext(UserContext);

  const [usuaris, setUsuaris] = useState([]);
  const [elimina, setElimina] = useState(null);

  function getUsuaris() {

    const opcions =   {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }
    fetch(URL + "/api/users",opcions)
      .then(results => results.json())
      .then(results => setUsuaris(results))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getUsuaris();
  }, [])

  function eliminaUsuari() {
    fetch(URL + "/api/users/" + elimina.id, { method: "DELETE" })
      .then(results => results.json())
      .then(res => {
        console.log("resultats: ", res);
        if (res.ok) {
          toast.success("Usuari eliminat", { onClose: () => { setElimina(null); getUsuaris(); } });
        } else {
          console.log(res);
          toast.error("Error: " + res.error);
        }
      })
      .catch(err => toast.error("Error: " + err.message));
  }

  if (!usuaris.length) {
    return <>Carregant...</>;
  }

  const filesTaula = usuaris.map((el) =>
    <tr key={el.id}>
      <td>{el.id}</td>
      <td>{el.name}</td>
      <td><img src={URL+'/img/'+el.image} alt={el.name} width={'150px'}/></td>
    </tr>
  );

  return (
    <>
      <TitolContainer>
        <h3>Usuaris</h3>
        <Link className="btn btn-success" to={"/registre"}>Afegir usuari</Link>
      </TitolContainer>
      <ToastContainer />
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>foto</th>
              </tr>
            </thead>
            <tbody>
              {filesTaula}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={elimina} >
        <Modal.Header >
          <Modal.Title>Confirmar eliminació</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {elimina ?
            <div className="text-center">
              <p>{elimina.name}</p>
            </div>
            : <></>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setElimina(null)}>
            Cancel.lar
          </Button>
          <Button variant="danger" onClick={eliminaUsuari}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Llista
