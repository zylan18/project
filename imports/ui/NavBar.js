import React,{Component,Fragment,useState,useEffect}from 'react';
import { Navbar,Container,Nav,NavDropdown } from 'react-bootstrap';
import {Button,Modal} from 'react-bootstrap';
import { LoginForm } from './LoginForm';
import { BrowserRouter as Router, Switch, Route, Link,} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate=useNavigate();

  const logout = () => {
    Meteor.logout();
    navigate('/');
  }
    //const [show, setShow] = useState(false);
   // const user = useTracker(() => Meteor.user());
   // console.log(user);
   if(Meteor.user()){
  return (
        <div>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Navbar bg="primary" className="w-auto" variant="dark" expand='lg'>
          <Container>
            <Navbar.Brand>
              <img src='/images/logo.png' width="110" style={{'object-fit':'contain'}} className="d-inline-block align-top logo" onClick={()=>navigate('/')}/>
            </Navbar.Brand>
          
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                    
                <Nav className="container-fluid">{/*used container-fluid to get username div to left of navbar */}
                  <Link className="nav-link" to={"/donate"}>Donate</Link>
                  <Link className="nav-link" to={"/request"}>Request</Link>
                  <Link className="nav-link" to={"/aboutus"}>About Us</Link>
                  <Link className="nav-link" to={"/contactus"}>Contact Us</Link>
               <div className='ms-auto'> 
                  <NavDropdown title={Meteor.user().username} id="navbarScrollingDropdown">
                  <NavDropdown.Item onClick={()=>navigate("/profile")}>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>navigate("/yourdonations")}>Your Donations</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>navigate("/yourrequests")}>Your Requests</NavDropdown.Item>
                  {(Meteor.user().profile.role=='admin')?(<NavDropdown.Item onClick={()=>navigate("/admin")}>Admin</NavDropdown.Item>):null}
                  {(Meteor.user().profile.role=='delivery')?(<NavDropdown.Item onClick={()=>navigate("/delivery")}>Delivery</NavDropdown.Item>):null}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    <span className="red-text">Signout</span>
                  </NavDropdown.Item>
                </NavDropdown>
               </div>
            </Nav>
            </Navbar.Collapse>
          </Container>
          </Navbar>
        </div>
 
    )
  }
  else if(Meteor.loggingIn()){
    return(
      <div>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Navbar bg="primary" className="w-auto" variant="dark" expand='lg'>
            <Container>
            <Navbar.Brand  href="/">
              <img src='/images/logo.png' width="110" style={{'object-fit':'contain'}} className="d-inline-block align-top logo"/>
            </Navbar.Brand>        
                <Nav className="container-fluid">
              </Nav>
            </Container>
            </Navbar>
            </div>
            )
  }
  else{
    return(
      <div>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <Navbar bg="primary" className="w-auto" variant="dark" expand='lg'>
          <Container>
          <Navbar.Brand  href="/">
              <img src='/images/logo.png' width="110" style={{'object-fit':'contain'}} className="d-inline-block align-top logo"/>
            </Navbar.Brand>   
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">    
              <Nav className="container-fluid">
               
              <Link className="nav-link" to={"/register"}>Donate</Link>
              <Link className="nav-link" to={"/register"}>Request</Link>
              <Link className="nav-link" to={"/register"}>Register</Link>
              <Link className="nav-link" to={"/aboutus"}>About Us</Link>
              <Link className="nav-link" to={"/contactus"}>Contact Us</Link>
              <div className='ms-auto'>
                <LoginForm/>
              </div>  
            </Nav>
            </Navbar.Collapse>
          </Container>
          </Navbar>
          </div>
          )
  }
}

export default NavBar
