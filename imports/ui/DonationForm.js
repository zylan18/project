import React, {useState} from 'react';
import {Form, FloatingLabel,Button,Alert,Spinner,Modal,Row,Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { DonationList } from '../api/links';
//import {Meteor} from 'meteor/meteor';
import {Files} from '../api/links';


const DonationForm = () =>{
        if(Meteor.user()){
        var fileinput;
        const [donorname,handleDonornameChange]=useState(Meteor.user().profile.name);
        const [address,handleAddressChange]=useState(Meteor.user().profile.address);
        const [phone,handlePhoneChange]=useState(Meteor.user().profile.phone)
        const [medname,handleMednameChange]=useState('');
        const [expdate,handleExpdateChange]=useState('');
        const [medfile,handleFileChange]=useState([]);
        const [fileerror,handleFileError]=useState('');

        const [modalmessage,handleModalMessage]=useState('');
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => {setShow(true)};
        const navigate = useNavigate();
        handleSubmit=(event)=>{
            // if(confirm(`Are you sure your details correct?\nDonor Name:${donorname}\nAddress:${address}\nMedicine Name:${medname}\nExpiry Date:${expdate}
            date=new Date;
            handleShow();
            handleModalMessage('Submitting please wait ....');
            Meteor.call('submitDonationForm',Meteor.user()._id,Meteor.user().username,donorname,address,phone,medname,expdate,
            (error,result)=>{
                if(error){
                    handleModalMessage('Error in submiting donation form\nForm not submitted');
                    document.querySelector("#modalokayerror").style.display = "inline";
                    event.preventDefault();
                }
                else{
                    handleModalMessage('form submitted successfully');
                    event.preventDefault();
                   }
            });

            handleModalMessage('Submitting image please wait ....');
            console.log(medfile);
            Meteor.call('saveFile',Meteor.user()._id,Meteor.user().username,medfile,
            (error,result)=>{
                if(error){
                    handleModalMessage('error in uploading image\nImage not upladed');
                    document.querySelector("#modalokayerror").style.display = "inline";
                    event.preventDefault();   
                }
                else{
                    handleModalMessage('Form and Images Submitted successfully');
                    document.querySelector("#modalokay").style.display = "inline";
                    // if(confirm('Do you want to donate again?')){
                    //     window.location.reload();
                    // }else{
                    //     navigate(`/yourdonations`);
                    // } 
                }
            });
        event.preventDefault();
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
        var img=URL.createObjectURL(new Blob([medfile]))
        return (
            <div className="form">
            <Form onSubmit={this.handleSubmit}>
                
                
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
                    <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-3">
                                <input type='tel' pattern='[0-9]{10}' value={phone} className="form-control" required onChange={e=>handlePhoneChange(e.target.value)}
                                placeholder="Phone Number"
                                />        
                        </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Address" className="mb-3">
                                <textarea value={address} className="form-control" required onChange={e=>handleAddressChange(e.target.value)}
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
                        <input className='file-input' type='file' accept="image/png, image/jpeg, image/jpg" id='file' required onChange={fileInput}/>
                        <Form.Label className="loginError" style={{'display':'inline-block'}}>{fileerror}</Form.Label>
                   <br/><br/>     

                <Button className="btn-primary" variant="primary" type="submit">Submit</Button>
                </Form>
                <Modal show={show} onHide={handleClose} backdrop="static" centered keyboard={false}>
                    <Modal.Header>  
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{'textAlign':'center'}}>{modalmessage}</p>
                    <Row style={{'width': '50%','margin': 'auto'}}>
                        <Col ><Button id='modalyes' style={{'display':'none'}} 
                        onClick={()=>{window.location.reload()}}
                        >Yes</Button></Col>
                        
                        <Col id='modalokay' style={{'display':'none'}}><Button 
                        onClick={()=>{document.getElementById("modalokay").style.display = "none";
                        handleModalMessage('Do you want donate again?');
                        document.querySelector("#modalyes").style.display = "inline";
                        document.querySelector("#modalno").style.display = "inline";}}
                        >Okay</Button>
                         <Button variant='danger' id='modalokayerror' style={{'display':'none'}}
                            onClick={()=>{console.log(modalmessage);window.location.reload()}}
                            >Retry</Button>
                        </Col>
                        
                        <Col><Button id='modalno' style={{'display':'none'}}
                        onClick={()=>{navigate(`/yourdonations`);}}
                        >No</Button></Col>
                    </Row>
                        
                    </Modal.Body>
              </Modal>
                </div>
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