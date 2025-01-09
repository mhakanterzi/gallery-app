import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import Register from './Register';
import axios from 'axios';

function Login({ setIsLoggedIn, setUser, setIsAdmin}) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier,  
        password,
      });
      setIsLoggedIn(true);
      if(identifier.endsWith('@gallery.com')){
        setIsAdmin(true)
      }
      else{
        setIsAdmin(false);
      }
      setUser(identifier);
        alert('Login Succesfuly')
    } catch (error) {
      alert('Login Failed. Check email or password...');
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formIdenidier">
            <Form.Label>Email or username</Form.Label>
            <Form.Control
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="button-container">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setShowRegister(true)}
              style={{ marginLeft: '10px' }} 
            >
              Register
            </Button>
          </div>
        </Form>
        {showRegister && <Register setShowRegister={setShowRegister} />}
      </Card.Body>
    </Card>
  );
}

export default Login;
