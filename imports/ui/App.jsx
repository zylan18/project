import React from 'react';
import DonationForm from './DonationForm'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from './RegistrationForm';
import { LoginForm } from './LoginForm';
import { useTracker } from 'meteor/react-meteor-data';
import { Navbar,Nav,Container} from 'react-bootstrap';
import Home from './Home.js';
import NavBar from './NavBar';
import Admin from './Admin';
import Request from'./Request';
import Profile from './Profile';
import DonationsAndRequests from './DonationsAndRequests';
import AboutUs from './AboutUs'

const logout = () => Meteor.logout();
const App = () => {
  const user = useTracker(() => Meteor.user());
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/register" element={<RegistrationForm/>}/>
          <Route exact path="/donate" element={<DonationForm/>}/>
          <Route exact path="/admin" element={<Admin/>}/>
          <Route exact path="/request" element={<Request/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/donationandrequest" element={<DonationsAndRequests/>}/>
          <Route exact path="/aboutus" element={<AboutUs/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
