import React,{Component,Fragment,useState,useEffect}from 'react';
import { Navbar,Container,Nav,NavDropdown } from 'react-bootstrap';
import {Button,Modal} from 'react-bootstrap';
import { LoginForm } from './LoginForm';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Switch, Route, Link,} from "react-router-dom";

const logout = () => {
  Meteor.logout();
}

function NavBar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const user = useTracker(() => Meteor.user());
   // console.log(user);
  return (
        <div>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Navbar bg="primary" className="w-auto" variant="dark" expand='lg'>
          <Container>
            <Navbar.Brand href="/">We care for you</Navbar.Brand>    
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">    
              <Nav className="me-auto">
                {user ? (<Link className="nav-link" to={"/donate"}>Donate</Link>):
                        (<Link className="nav-link" to={"/register"}>Donate</Link>)
                }
                 
                {user ? (<Link className="nav-link" to={"/request"}>Request</Link>):
                        (<Link className="nav-link" to={"/register"}>Request</Link>)
                }
              
                {user ? (null):
                (<Link className="nav-link" to={"/register"}>Register</Link>)
                }
                <Link className="nav-link" to={"/aboutus"}>About Us</Link>

                {user ? (
                  <NavDropdown title={user.username} id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/donationandrequest">Donations and<br/>Requests</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    <span className="red-text">Signout</span>
                  </NavDropdown.Item>
                </NavDropdown>
                )
                :(
                <LoginForm/>
                )
              }
           
            </Nav>
            </Navbar.Collapse>
          </Container>
          </Navbar>
          
        </div>
 
    )
}

export default NavBar
