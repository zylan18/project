import React from 'react';
import DonationForm from './DonationForm'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from './RegistrationForm';
import { LoginForm } from './LoginForm';
import { useTracker } from 'meteor/react-meteor-data';
import { Navbar,Nav,Container} from 'react-bootstrap';
import Home from './Home.js';
import NavBar from './NavBar';
import Admin from './Admin'
import AdminDonation from './AdminDonation';
import Request from'./Request';
import RequestForm from './RequestForm';
import Profile from './Profile';
import YourDonations from './YourDonations';
import AboutUs from './AboutUs'
import RequestList from './RequestList';
import AdminRequest from './AdminRequest';
import Delivery  from './Delivery';
import DonationStatus from './DonationStatus';
import YourRequests from './YourRequests';
import RequestStatus from './RequestStatus';
import EditDonationForm from './EditDonationForm';
import EditRequestForm from './EditRequestForm';
import ContactUs from './ContactUs';

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
          <Route exact path='/contactus' element={<ContactUs/>}/>
          <Route exact path="/editdonation/:id" element={<EditDonationForm/>}/>
          <Route exact path="/admindonation" element={<AdminDonation/>}/>
          <Route exact path="/request" element={<Request/>}/>
          <Route exact path="/requestform/:id" element={<RequestForm/>}/>{/*here :id is used for sending any value to the requestform*/}
          <Route exact path="/editrequest/:id" element={<EditRequestForm/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/yourdonations" element={<YourDonations/>}/>
          <Route exact path="/yourrequests" element={<YourRequests/>}/>
          <Route exact path="/aboutus" element={<AboutUs/>}/>
          <Route exact path="/requestlist/:type" element={<RequestList/>}/>
          <Route exact path="/adminrequest" element={<AdminRequest/>}/>
          <Route exact path='/delivery' element={<Delivery/>}/>
          <Route exact path='/donationstatus/:id' element={<DonationStatus/>}/>
          <Route exact path='/requeststatus/:id' element={<RequestStatus/>}/>
          <Route exact path='/admin' element={<Admin/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
