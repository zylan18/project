import React, {useState,useEffect} from 'react';
import {Form, FloatingLabel,Button,Alert,Spinner} from 'react-bootstrap';
import { DonationList } from '../api/links';
//import {Meteor} from 'meteor/meteor';
import {Files} from '../api/links';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useTracker} from 'meteor/react-meteor-data';

const DonationForm = () =>{

        if(Meteor.user()){
        let { id } = useParams();
        const navigate = useNavigate();   
        const [donorname,handleDonornameChange]=useState();
        const [address,handleAddressChange]=useState();
        const [phone,handlePhoneChange]=useState();
        const [medname,handleMednameChange]=useState();
        const [expdate,handleExpdateChange]=useState();
        const [medfile,handleFileChange]=useState();  
        var fileinput;
        const [fileerror,handleFileError]=useState();
        const isLoadingData = useTracker(()=>{
            const handle=Meteor.subscribe('donationStatus',id);//used useTracker to continuously check if subscribe is ready 
            return(!handle.ready());
            })
    
        const isLoadingImg=useTracker(()=>{
            const handle=Meteor.subscribe('donationStatusImages',id);
            return(!handle.ready());
        })    
        useEffect(()=>{
            if(!isLoadingData && !isLoadingImg){
               const donation=DonationList.findOne({_id:id});
                if((DonationList.findOne({_id:id})).edit){
                handleDonornameChange(donation.donor_name);
                handleAddressChange(donation.address);
                handlePhoneChange(donation.phone);
                handleMednameChange(donation.medicine_name);
                handleExpdateChange(donation.exp_date);
                handleFileChange((Files.findOne({donation_id:id}).data));
                }
            }
        },[(isLoadingImg)])//added is loadingImage as dependency to update state
        
        handleSubmit=(event)=>{
            if(confirm(`Are you sure your details correct?\nDonor Name:${donorname}\nAddress:${address}\nMedicine Name:${medname}\nExpiry Date:${expdate}`)){
            date=new Date;
            Meteor.call('updateDonationForm',id,donorname,address,phone,medname,expdate,
            (error,result)=>{
                if(error){
                    alert('Error in updating donation form\nForm not submitted')
                    event.preventDefault();
                }
                else{
                    alert('form updated successfully');
                    window.location.reload(false);
                }
            });
            
            console.log(medfile);
            // Files.update((Files.findOne({donation_id:id})._id),{$set:{data:medfile}});
            Meteor.call('updateDonationImages',id,medfile,
            (error,result)=>{
                if(error){
                    alert('Error! images not updated');
                }else{
                    alert('Images updated successfully');
                }
            });

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
                handleAddMedfile(buffer);
            }
            reader.readAsArrayBuffer(file); //read the file as arraybuffer
        }
        else{
            handleFileError('Only jpg, jpeg and png files support');
            document.getElementById("file").value=null;
        }
    }
        else{
            handleFileError('File Size more than 5MB');
            document.getElementById("file").value=null;
        }
    }    
    const handleAddMedfile = (file) => {
        const newmedfile = [...medfile];
        newmedfile.push(file);
        handleFileChange(newmedfile);
        console.log(medfile)
      }

      const handleRemoveMedfile = (file) => {
        const newmedfile = medfile.filter((t) => t !== file);
        handleFileChange(newmedfile);
        if(medfile.length==1){//to make value of file input when there are files uploaded and all are cleared
            console.log(medfile.length);
            document.getElementById('file').value=null;
        }
      }
        // var dbimg = Files.find({user_id:Meteor.user()._id},{fields:{}}).fetch();
        // dbimg=new Blob([dbimg[0].data]);
        // dbimg=URL.createObjectURL(dbimg);
        // console.log(img);
        if(!isLoadingData && !isLoadingImg){
        if((DonationList.findOne({_id:id})).edit){ 
        
            var img=URL.createObjectURL(new Blob([medfile]))
        return (
            <Form onSubmit={this.handleSubmit}>
                
                <div className="form">
                 <Form.Label><h1 style={{'display':'inline'}}>Donation Form </h1>
                 <h2 style={{'color':'#888','display':'inline'}}>Edit</h2>
                 </Form.Label>              
                <FloatingLabel controlId="floatingInput" label="Donor Name" className="mb-3">
                        <input id='donorname' type='text' value={donorname} className="form-control" onChange={e=>handleDonornameChange(e.target.value)}
                        placeholder="Donor Name" required
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Medicine Name" className="mb-3">
                        <input id='medname' type='text' value={medname}className="form-control" onChange={e=>handleMednameChange(e.target.value)}
                        placeholder="Medicine Name" required
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Expiry Date" className="mb-3">
                        <input type='date' id='expdate' value={expdate} className='form-control' onChange={e=>handleExpdateChange(e.target.value)}
                        required/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-3">
                                <input type='tel' pattern='[0-9]{10}' value={phone} className="form-control" required onChange={e=>handlePhoneChange(e.target.value)}
                                placeholder="Phone Number"
                                />        
                        </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Address" className="mb-3">
                                <textarea id='address' value={address} className="form-control" required onChange={e=>handleAddressChange(e.target.value)}
                                placeholder="Address"
                                />        
                        </FloatingLabel>
                    <br/>
                    <Form.Label>Upload images of Medicine</Form.Label><br/>
                        {medfile?(
                         medfile.map((img,index) => (   
                        <div className="upload-image-container">
                        <img src={URL.createObjectURL(new Blob([img]))}
                        className="upload-preview-image"/>
                        <button className="circle-x-button" onClick={()=>{handleRemoveMedfile(img);}}
                        >X</button>
                        </div>))):(null)
                        }
                        <input className='file-input' type='file' id='file' onChange={fileInput}/>
                        <Form.Label className="loginError" style={{'display':'inline-block'}}>{fileerror}</Form.Label>
                   <br/><br/>     

                <Button className="btn-primary" variant="primary" type="submit">Update</Button>
                </div>
                </Form>
        )
      
        }//if edit
        else{
            return(
                <Alert variant='warning'>You cannot edit this donation. 
                    <Alert.Link href="/yourdonations" variant="warning"> Click here </Alert.Link>
                     to go back to your donations
                </Alert>)
    }
        }//if !isLoading
        else{
            return(<div>
                <Spinner className="spinner" animation="grow" variant="primary" />
            </div>) 
        }
    }//if user
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