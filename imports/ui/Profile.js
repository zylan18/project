import React,{useState} from 'react';
import {Form, FloatingLabel,Button,Alert,Spinner} from 'react-bootstrap';


const Profile = () => {
    const user=Meteor.user();
    if(user){
        const user=Meteor.user();
        const [name,handleNameChange]=useState(user.profile.name);
        const [email,handleEmailChange]=useState(user.emails[0].address);
        const [address,handleAddressChange]=useState(user.profile.address);
        const [phone,handlePhoneChange]=useState(user.profile.phone);
        handleSubmit=()=>{
            const user=Meteor.user();
            Meteor.call("updateProfile",user._id,name,email,address,phone);
        }
       
        console.log(user.profile.name);
            return(
                <div className="form">
                    <h1>Profile</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder={user.username} disabled />
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={e=>handleNameChange(e.target.value)}/>
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control type="text" value={email} onChange={e=>handleEmailChange(e.target.value)}/>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" pattern='[0-9]{10}' value={phone} onChange={e=>handlePhoneChange(e.target.value)}/>
                        <Form.Label>Address</Form.Label>
                        <textarea className='form-control' value={address} onChange={e=>handleAddressChange(e.target.value)}/>
                        <Form.Text muted>
                            Clicking the change button will change your profile details to the ones in the textbox
                        </Form.Text><br/>
                        <Button type="submit" variant="primary">Change</Button>
                    </Form>
                </div>  
        )
        
    }
    else if(Meteor.loggingIn()){
        return(<div>
            <Spinner className="spinner" animation="border" variant="primary" 
           />
        </div>)         
      }
    else{
        return(
            <div>
                    <Alert variant="danger">You need to login in order to access this page</Alert>
                </div>
            )
    }        
}

export default Profile
