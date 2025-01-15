import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, Form, FormControl, FormLabel, Button } from 'react-bootstrap';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [,setShowRegister] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://34.38.235.50:1337/api/auth/local/register', {
        username,  
        email,
        password,
      });
      alert('Registration Succesfuly...');
    } catch (error) {
      alert('Registration failed. Please try again later or connect us...');
  };
}

  return (
    <Card>
      <CardBody>
        <CardTitle>Register</CardTitle>
        <Form onSubmit={handleRegister}>
          <Form.Group>
          <FormLabel>Name</FormLabel>
          <FormControl
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </Form.Group>
          <Form.Group>
          <FormLabel>Email</FormLabel>
          <FormControl
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </Form.Group>
          <Form.Group>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </Form.Group>
          <div className="button-container">
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Button variant="secondary" onClick={() => setShowRegister(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}

export default Register;
