import { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Container, Modal, Button, Form } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import jwt_decode from "jwt-decode";

import { login } from './tools/Api';


import './App.css'

function App() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');

  const navigateTo = useNavigate();
  const goHome = () => {
    navigateTo('/')
  };

  useEffect(()=>{
    const tk = localStorage.getItem('loginfront');
    if (tk){
      setToken(tk)
    }
  },[])

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUsername(decoded.name);
      localStorage.setItem('loginfront', token);
    } else {
      setUsername('');
    }
    goHome();
  }, [token])


  const handleLogin = () => {
 
    login(name, password)
      .then(resp => {
        if (resp.ok===true) {
          setToken(resp.token);
          setShow(false);
        } else {
          console.log("resp", resp)
          setError(resp.msg);
        }
      })
      .catch(e => setError(e))
  };

  function logout(){
    setToken('');
    localStorage.removeItem('loginfront');
  }

  const contexto = { token, username };
  return (
    <>
      <UserContext.Provider value={contexto}>
        <Navbar bg="secondary" variant="dark" expand="lg">
          <Container>
            <Link to="/" className="navbar-brand">HOME</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <Link to="/nou_article" className='nav-link'>Article nou</Link> */}
                <Link to="/registre" className='nav-link'>Registre</Link>
                <Link to="/usuaris" className='nav-link'>Usuaris</Link>
                <Link to="/open" className='nav-link'>Open</Link>
                <Link to="/secret" className='nav-link'>Secret</Link>
              </Nav>
            </Navbar.Collapse>
            {username ?
              <>
                <span className='nav-item pointer' onClick={logout}>Logout</span>
                <span className="nav-item ms-1">({username})</span>
              </>
              : <span onClick={() => setShow(true)} className="nav-item pointer">Login</span>
            }
          </Container>
        </Navbar>
        <Container>
          <Outlet />
          <br />
          {token}
        </Container>
      </UserContext.Provider>

      <Modal show={show} >
        <Modal.Header >
          <Modal.Title>Login required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onInput={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onInput={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Form>
          {error ? <span className="error-msg">{error}</span> : <span>Enter credentials</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App


