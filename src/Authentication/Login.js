import React, { useState } from 'react';
import { Card,CardBody,CardTitle, Form,FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
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
  
      const userId = response.data.user.id; 
      localStorage.setItem("userId", userId);
  
      if(identifier.endsWith('@gallery.com')){
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
  
      setUser(identifier);
      alert('Login Successful');
    } catch (error) {
      alert('Login Failed. Check email or password...');
    }
  };
  
  return (
    <Card>
      <CardBody>
        <CardTitle>Login</CardTitle>
        <Form onSubmit={handleLogin}>
          <FormGroup controlId="formIdenidier">
            <FormLabel>Email or username</FormLabel>
            <FormControl
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup controlId="formPassword">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
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
      </CardBody>
    </Card>
  );
}

export default Login;
