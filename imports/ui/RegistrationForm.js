import React, { useState } from 'react';
import {Form, FloatingLabel,Button,Alert} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { DonationList } from '../api/links';
//import {useNavigate} from 'react-router-dom';


const RegistrationForm = ()=>{
    const [name,handleNameChange]=useState('');
    const [username,handleUsernameChange]=useState('');
    const [email,handleEmailChange]=useState('');
    const [password,handlePasswordChange]=useState('');
    const [confpassword,handleConfPasswordChange]=useState('');
    const [usernameError,handleUsernameError]=useState('');
    const [passwordError,handlePasswordError]=useState('');
    const [address,handleAddressChange]=useState('');
    handleSubmit=(event)=>{
      
       if(password == confpassword){   
           handlePasswordError('');
       if(!Meteor.call('Account.create',username,password,email,name,address,
            err=>{
                handleUsernameError(`*${err.error}`);
            })){
                Meteor.loginWithPassword(username,password)
                alert(`Name:${name}\n Username: ${username}\n password:${password}\n email:${email}\n address:${address}`)
            }
         }
        else{
            handlePasswordError('*Passwords do not match');
        }
        event.preventDefault(); 
    }
        if(!Meteor.user()){
            return (
                <Form onSubmit={handleSubmit}>
                    
                    <div className="form">    
                        <Form.Label className="form-label"><h1>Registration Form</h1></Form.Label> <br/>         
                        <Alert variant='warning'>You need to register inorder to donate or request medicine</Alert>          
                        <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                                <input type='text' className="form-control" onChange={e=>handleNameChange(e.target.value)}
                                placeholder="Name"
                                />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                                <input type='text' className="form-control" onChange={e=>handleEmailChange(e.target.value)}
                                placeholder="Email"
                                /> 
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                                <input type='text' className="form-control" onChange={e=>handleUsernameChange(e.target.value)}
                                placeholder="Username"
                                /> 
                        </FloatingLabel>
                        <Form.Label className="loginError">{usernameError}</Form.Label>
                        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
                            <input type='password' className='form-control' onChange={e=>handlePasswordChange(e.target.value)} 
                            placeholder='Password'
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3">
                            <input type='password' className='form-control' onChange={e=>handleConfPasswordChange(e.target.value)} 
                            placeholder='Confirm Password'
                            />
                        </FloatingLabel>
                            <Form.Label className="loginError">{passwordError}</Form.Label><br/>
                        <FloatingLabel controlId="floatingTextarea" label="Address" className="mb-3">
                            <Form.Control as="textarea" className="form-control" onChange={e=>handleAddressChange(e.target.value)}
                            placeholder="Enter address" />
                        </FloatingLabel>
                        <Button variant="primary" type="submit">Submit</Button>
                    </div>
                </Form>
            )
    }
    else{
        return(
            <div>
                <Alert variant="success">You are already registered.
                <Alert.Link href="/">Click here</Alert.Link> to go to home page</Alert>
            </div>
        )
    }
}

export default RegistrationForm
