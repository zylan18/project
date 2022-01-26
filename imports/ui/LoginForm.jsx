import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import {Modal,Button,FloatingLabel,Form,Alert} from 'react-bootstrap'
export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError,setloginError]=useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = e => {
    e.preventDefault();
    console.log(username,password);
    Meteor.loginWithPassword(username, password,error => {
      if (error) {
        setloginError(error.reason);
      }
      else{
        handleClose();
      }
      });

    
  };

  return (
    <div>
    <Button variant="primary" onClick={handleShow}>
        Login
      </Button>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={submit} className="login-form">

      <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
      <Form.Control
        type="text"
        placeholder="Username"
        name="username"
        className={"form-control"}
        required
        onChange={e => setUsername(e.target.value)}
      />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput" label="Password" className="mb-3"> 
      <Form.Control
        type="password"
        placeholder="Password"
        className={"form-control"}
        name="password"
        required
        onChange={e => setPassword(e.target.value)}
      />
      </FloatingLabel>
      <Form.Label className="loginError">{loginError}</Form.Label>
      <Button type="submit" className={"btn-primary"}>Log In</Button>
    </Form>
      </Modal.Body>
    </Modal>
    </div>
  );
};