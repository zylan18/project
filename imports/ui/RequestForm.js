import React,{useState} from 'react'
import { Alert,Form,FloatingLabel,Modal,Spinner,Col,Row,Carousel,Button,Stack} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { DonationList } from '../api/Collections'
import { Files } from '../api/Collections'
import {Request} from '../api/Collections'
import { useTracker } from 'meteor/react-meteor-data';
import {useNavigate} from 'react-router-dom';
import ImageUploader from './ImageUploader'

const RequestForm = () => {
    
    const user=Meteor.user();
    if (user){
    let { id } = useParams();//used to get values from address bar
    medicine=DonationList.findOne({_id:id})
    const [prescriptionImg,handleFileChange]=useState('');
    const [show, setShow] = useState(false);
    const [donation_id,setDonation_id]=useState('');
    const [requestername,handleRequesterNameChange]=useState(Meteor.user().profile.name);

    const [reason,handleReasonChange]=useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    
    const [modalmessage,handleModalMessage]=useState('');
    const [showsubmit, setShowSubmit] = useState(false);
    const handleSubmitClose = () => setShowSubmit(false);
    const handleSubmitShow = () => {setShowSubmit(true)};
    
    const [address,handleAddressChange]=useState(user.profile.address);
    const [phone,handlePhoneChange]=useState(Meteor.user().profile.phone);
    const [fileerror,handleFileError]=useState('');
    const navigate=useNavigate();
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('donationStatus',id);//used useTracker to continuously check if subscribe is ready 
        return(!handle.ready());
        })

const getImage=(image)=>{
    handleFileChange(image)
}
  
    var date=new Date;
    handleSubmit=(event)=>{
        handleSubmitShow()
        handleModalMessage('Submitting details.....');
        //submit form details
        Meteor.call('submitReuqestForm',Meteor.user()._id,Meteor.user().username,requestername,id,reason,address,phone,prescriptionImg,
        (error,result)=>{
            if(error){
                //error in submit
                handleModalMessage('Error request form not submitted');
                document.querySelector("#modalokayerror").style.display = "inline";
                event.preventDefault();
            }else{
                //submit success
                handleModalMessage(`Form Submitted Successfully\nYour Request will soon be verified\nThank You`); 
                document.querySelector("#modalokay").style.display = "inline";
            }
        });
        
        event.preventDefault();  
    }
        
        if(!isLoadingData){
        return (
            <div className="form">
                <Form onSubmit={handleSubmit}>
                    <Form.Label><h1>Request Form:</h1></Form.Label><br/>              
                        <table className='admin-table' style={{border:'1px solid #11999E'}}>
                            <tbody>
                            <tr padding='1px'><b>Medicine Details:</b></tr>
                            <tr>
                                <td rowspan="4">

                         {   ((medicine.images).length==1)?
                            (<img className='request-preview-image' src={URL.createObjectURL(new Blob(medicine.images))}
                                    onClick={()=>{setDonation_id(medicine._id);{console.log(donation_id)};handleShow()}}/>)
                            :(<Carousel variant="dark">
                                    {(image=medicine.images)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='request-preview-image' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{setDonation_id(medicine._id);{console.log(donation_id)};handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                            </Carousel>)
                            }
                            </td>
                                <td><b>Medicine Name: </b></td>
                                <td>{medicine.medicine_name}</td>
                            </tr>
                            <tr>
                                <td><b>Brand:   </b></td>
                                <td>{medicine.brand}</td>
                            </tr>
                            <tr>
                                <td><b>composition:   </b></td>
                                <td>{medicine.composition}</td>
                            </tr>
                            <tr>
                                <td><b>Expiry Date:   </b></td>
                                <td>{medicine.exp_date}</td>
                            </tr>
                            </tbody>
                        </table>
                        <br/>
                        <FloatingLabel controlId="floatingInput" label="Requester Name" className="mb-3">
                                <input type='text' value={requestername} className="form-control" required onChange={e=>handleRequesterNameChange(e.target.value)}
                                placeholder="Requester Name"
                                />        
                        </FloatingLabel> 
                        <FloatingLabel controlId="floatingInput" label="Reason for Requesting Medicine" className="mb-3">
                                <textarea value={reason} className="form-control" required onChange={e=>handleReasonChange(e.target.value)}
                                placeholder="Reason for Requesting Medicine"
                                />        
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
                        </FloatingLabel><br/>
                        <Form.Label>Upload Prescription/Documents</Form.Label>
                        <br/>
                        <ImageUploader getImage={getImage}/>
                        <br/>
                        <br/>
                         <Button type='submit'>Submit</Button>   
                    </Form>
                    <Modal show={show} onHide={handleClose} size='lg'>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                    {donation_id?(<Carousel variant="dark">
                                    {(image=medicine.images)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='admin-image' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{setDonation_id(medicine._id);{console.log(donation_id)};handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                            </Carousel>):null}
                    </Modal.Body>
                </Modal>

                <Modal show={showsubmit} onHide={handleSubmitClose} backdrop="static" centered keyboard={false}>
                    <Modal.Header>  
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{'textAlign':'center','white-space': 'pre-wrap'}}>{modalmessage}</p>
                    <Stack direction="horizontal" className='justify-content-center' gap={5}>
                        <Button id='modalokay' style={{'display':'none'}}
                        onClick={()=>{navigate('/yourrequests')}}
                        >Okay</Button>
                         <Button variant='danger' id='modalokayerror' style={{'display':'none'}}
                            onClick={()=>{console.log(modalmessage);window.location.reload()}}
                            >Retry</Button>
                    </Stack>    
                    </Modal.Body>
              </Modal>                    

            </div>
        )
        }else{
            return(<div>
                <Spinner className="spinner" animation="grow" variant="primary" />
            </div>) 
        }
    }
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
export default RequestForm
