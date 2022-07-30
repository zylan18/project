import React, {useState} from 'react';
import {Form, FloatingLabel,Button,Alert,Spinner,Modal,Row,Col,Stack} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
//import {Meteor} from 'meteor/meteor';
import ImageUploader from './ImageUploader'


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
        // if(Meteor.user().emails[0].verified){
        handleSubmit=(event)=>{
            // if(confirm(`Are you sure your details correct?\nDonor Name:${donorname}\nAddress:${address}\nMedicine Name:${medname}\nExpiry Date:${expdate}
            date=new Date;
            handleShow();
            handleModalMessage('Submitting please wait ....');
            Meteor.call('submitDonationForm',Meteor.user()._id,Meteor.user().username,donorname,address,phone,medname,expdate,medfile,
            (error,result)=>{
                if(error){
                    handleModalMessage('Error in submiting donation form\nForm not submitted');
                    document.querySelector("#modalokayerror").style.display = "inline";
                    event.preventDefault();
                }
                else{
                    handleModalMessage('form submitted successfully');
                    handleModalMessage(`Form and Images Submitted successfully\nYour donation will soon be verified\nThank You`);
                    document.querySelector("#modalokay").style.display = "inline";
                    event.preventDefault();
                   }
            });

        event.preventDefault();
    }
       
        const getImage=(image)=>{ 
            handleFileChange(image)
            console.log(image);
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
                        <input type='date' className='form-control' min={(new Date(Date.now() +  28* 24 * 60 * 60 * 1000).toISOString().split("T")[0])}//setting offset to 28 days from today
                         onChange={e=>handleExpdateChange(e.target.value)}
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
                        {/* Image Uploader */}
                    <ImageUploader getImage={getImage}/>
                   <br/><br/>     

                <Button className="btn-primary" variant="primary" type="submit">Submit</Button>
                </Form>
                <Modal show={show} onHide={handleClose} backdrop="static" centered keyboard={false}>
                    <Modal.Header>  
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{'textAlign':'center','white-space': 'pre-wrap'}}>{modalmessage}</p>
                        <Stack direction="horizontal" className='justify-content-center' gap={5}>
                        <div>
                            <Button id='modalyes' style={{'display':'none'}} 
                            onClick={()=>{window.location.reload()}}
                            >Yes</Button>
                        </div>
                        
                        <div id='modalokay' style={{'display':'none'}}><Button 
                        onClick={()=>{document.getElementById("modalokay").style.display = "none";
                        handleModalMessage('Do you want donate again?');
                        document.querySelector("#modalyes").style.display = "inline";
                        document.querySelector("#modalno").style.display = "inline";}}
                        >Okay</Button>
                         <Button variant='danger' id='modalokayerror' style={{'display':'none'}}
                            onClick={()=>{console.log(modalmessage);window.location.reload()}}
                            >Retry</Button>
                        </div>
                        
                        <div><Button id='modalno' style={{'display':'none'}}
                        onClick={()=>{navigate(`/yourdonations`);}}
                        >No</Button>
                        </div>
                    </Stack>
                        
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
              <Alert.Link onClick={()=>navigate("/register")} variant="danger"> click here </Alert.Link>
              to register
              </Alert>
          </div>)
      }
    }
export default DonationForm