import React, {useState} from 'react';
import {Form, FloatingLabel,Button,Alert,Spinner} from 'react-bootstrap';
import { DonationList } from '../api/links';
//import {Meteor} from 'meteor/meteor';
import {Files} from '../api/links';


const DonationForm = () =>{
        if(Meteor.user()){
        var fileinput;
        const [donorname,handleDonornameChange]=useState(Meteor.user().profile.name);
        const [address,handleAddressChange]=useState(Meteor.user().profile.address);
        const [medname,handleMednameChange]=useState('');
        const [expdate,handleExpdateChange]=useState('');
        const [medfile,handleFileChange]=useState('');
        const [fileerror,handleFileError]=useState('');
        handleSubmit=(event)=>{
            if(confirm(`Are you sure your details correct?\nDonor Name:${donorname}\nAddress:${address}\nMedicine Name:${medname}\nExpiry Date:${expdate}
            `)){
            date=new Date;
            DonationList.insert({user_id:Meteor.user()._id,donatedat:date.toLocaleString(),
            username:Meteor.user().username,donor_name:donorname,address:address, 
            medicine_name:medname, exp_date:expdate,verify_status:false,verified_by:'',status:'in verification'})
            console.log(medfile);
            Meteor.call('saveFile',Meteor.user()._id,Meteor.user().username,medfile);
            alert('Donation form submitted');
            window.location.reload(false);

            }else{
                event.preventDefault();
            }
        }
       
        function fileInput(event){ 
            var file = event.target.files[0]; //assuming 1 file only
            if (!file) return;
             
            if(file.size<=5243000){ //used to check file size
                console.log(file.type);
                if (file.type=='image/jpeg'||file.type=='image/png'){ //used to check file type
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
            handleFileError('Only jpg, jpeg and png files support');
            handleFileChange('');
            document.getElementById("file").value=null;
        }
    }
        else{
            handleFileError('File Size more than 5MB');
            handleFileChange('');
            document.getElementById("file").value=null;
        } 
    }
        
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
                        <input type='text' value={donorname} className="form-control" onChange={e=>handleDonornameChange(e.target.value)}
                        placeholder="Donor Name" required
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Medicine Name" className="mb-3">
                        <input type='text' className="form-control" onChange={e=>handleMednameChange(e.target.value)}
                        placeholder="Medicine Name" required
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Expiry Date" className="mb-3">
                        <input type='date' className='form-control' onChange={e=>handleExpdateChange(e.target.value)}
                        required/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Address" className="mb-3">
                                <textarea value={address} className="form-control" required onChange={e=>handleAddressChange(e.target.value)}
                                placeholder="Address"
                                />        
                        </FloatingLabel>
                    <Form.Control type='file' id='file' required onChange={fileInput}/>
                    <Form.Label className="loginError">{fileerror}</Form.Label>
                    <br/>
                        {medfile?(
                        <div className="upload-image-container"><img src={img} className="upload-preview-image"/>
                        <button className="circle-x-button" onClick={()=>{handleFileChange('');
                        document.getElementById("file").value=null;}}>X</button>
                        </div>
                        ):null}
                        

                <Button className="btn-primary" variant="primary" type="submit">Submit</Button>
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
