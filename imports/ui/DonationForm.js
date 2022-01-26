import React, {useState} from 'react';
import {Form, FloatingLabel,Button,Alert,Spinner} from 'react-bootstrap';
import { DonationList } from '../api/links';
//import {Meteor} from 'meteor/meteor';
import {Files} from '../api/links';

const DonationForm = () =>{
    var fileinput;
    const [medname,handleMednameChange]=useState('');
    const [expdate,handleExpdateChange]=useState('');
    const [donorname,handleDonornameChange]=useState('');
    const [medfile,handleFileChange]=useState('');
    const [fileerror,handleFileError]=useState('');
   console.log(Meteor.call("fetchfrommedicine","donor_name","yash"));
    handleSubmit=(event)=>{
        alert(`Donor Name:${donorname}\n Medicine Name: ${medname}\n Expiry Date:${expdate}`);
        date=new Date;
        DonationList.insert({user_id:Meteor.user()._id,donatedat:date.toLocaleString(),
        username:Meteor.user().username,donor_name:donorname, 
        medicine_name:medname, exp_date:expdate,verify_status:false,verified_by:'',status:'in verification'})
        console.log(medfile);
        Meteor.call('saveFile',Meteor.user()._id,Meteor.user().username,medfile);
    
        event.preventDefault();
    }
   
    function fileInput(event){ 
        var file = event.target.files[0]; //assuming 1 file only
        if (!file) return;
        if(file.size<=5243000){
        handleFileError('');
        console.log(file.size);
        var reader = new FileReader(); //create a reader according to HTML5 File API
    
        reader.onload = function(event){          
          var buffer = new Uint8Array(reader.result) // convert to binary
          handleFileChange(buffer);
        }
        reader.readAsArrayBuffer(file); //read the file as arraybuffer
    }
    else{
        handleFileError('File Size more than 5MB');
        handleFileChange('');
    }
     
    }
        if(Meteor.user()){
        
        // var dbimg = Files.find({user_id:Meteor.user()._id},{fields:{}}).fetch();
        // dbimg=new Blob([dbimg[0].data]);
        // dbimg=URL.createObjectURL(dbimg);
        // console.log(img);
        var img=URL.createObjectURL(new Blob([medfile]))
        return (
            <Form onSubmit={this.handleSubmit}>
                
                <div className="form">
                 <Form.Label><h1>Donation Form</h1></Form.Label>              
                <FloatingLabel controlId="floatingInput" label="Donor Name" className="mb-3">
                        <input type='text' className="form-control" onChange={e=>handleDonornameChange(e.target.value)}
                        placeholder="Donor Name"
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Medicine Name" className="mb-3">
                        <input type='text' className="form-control" onChange={e=>handleMednameChange(e.target.value)}
                        placeholder="Medicine Name"
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Expiry Date" className="mb-3">
                        <input type='date' className='form-control' onChange={e=>handleExpdateChange(e.target.value)}
                        />
                    </FloatingLabel>
                    <Form.Control type='file' id='file' onChange={fileInput}/>
                    <Form.Label className="loginError">{fileerror}</Form.Label>
                    <br/>
                        {medfile?(
                        <div className="upload-image-container"><img src={img} className="upload-preview-image"/>
                        <button className="circle-x-button" onClick={()=>{handleFileChange('');
                        document.getElementById("file").value=null;}}>X</button>
                        </div>
                        ):null}
                        

                <Button variant="primary" type="submit">Submit</Button>
                </div>
                </Form>
        )
      }//if
      else if(Meteor.loggingIn()){
      return(<div>
          <Spinner className="spinner" animation="border" variant="primary" />
      </div>)         
    }
    else{
          return(<div>
              <Alert variant="danger">Login to access this page. 
              If you have not registered then 
              <Alert.Link href="/register" variant="danger"> click here </Alert.Link>
              to register
              </Alert>
          </div>)
      }
    }

export default DonationForm
