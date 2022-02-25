import React,{useState,useEffect} from 'react'
import {Alert,Form,FloatingLabel,Modal,Spinner,Col,Row,Carousel,Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { DonationList } from '../api/links'
import { Files } from '../api/links'
import {Request} from '../api/links'
import {useTracker} from 'meteor/react-meteor-data';

const EditRequestForm = () => {
    const user=Meteor.user();
    if (user){    
    let { id } = useParams();//used to get values from address bar
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};

    const [medfile,handleFileChange]=useState();
    const [donation_id,setDonation_id]=useState();
    const [reason,handleReasonChange]=useState();
    const [address,handleAddressChange]=useState();
    const [phone,handlePhoneChange]=useState();
    const [fileerror,handleFileError]=useState();
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('requestStatus',id);//used useTracker to continuously check if subscribe is ready 
        return(!handle.ready());
        })

    const isLoadingImg=useTracker(()=>{
        const handle=Meteor.subscribe('requestStatusImages',id);
        return(!handle.ready());
    })    
    useEffect(()=>{
        if(!isLoadingData && !isLoadingImg){
           const request=Request.findOne({_id:id});
            if((Request.findOne({_id:id})).edit){
            handleAddressChange(request.address);
            handleReasonChange(request.reason);
            setDonation_id(request.donation_id);
            handlePhoneChange(request.phone);
            handleFileChange((Files.findOne({request_id:id}).data));
            }
        }
    },[(isLoadingImg)])
    var img;
    
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
  
    var date=new Date;
    handleSubmit=(event)=>{
        if(confirm(`Are you sure your details correct?\nAddress:${address}\nReason:${reason}`)){
        //alert(`user_id:${Meteor.user()._id}\nrequestdate:${date.toLocaleString()}\nusername:${user.username}\nrequester_name:${user.profile.name}\ndonation_id:${id}\nmedicine_name:${medicine.medicine_name}\nexp_date:${medicine.exp_date}\nverify_status:${false}\nverified_by:${''}\nstatus:${'in verification'}\ntype:${medicine.type}`);
        Request.update(id,{$set:{reason:reason,address:address,status:'in verification',edit:true,phone:phone}})
        Files.update(Files.findOne({request_id:id},{fields:{_id:1}})._id,{$set:{data:medfile}})
        alert('request form updated');
        window.location.reload(false);
        }else{
            event.preventDefault();
            alert('error request form was not updated');
        }
    }
    if(!isLoadingData && !isLoadingImg){
        const request=Request.findOne({});
        if(request.edit){
        var img=URL.createObjectURL(new Blob([medfile]))
        return (
            <div className="form">
                <Form onSubmit={handleSubmit}>
                <Form.Label><h1 style={{'display':'inline'}}>Request Form </h1>
                 <h2 style={{'color':'#888','display':'inline'}}>Edit</h2>
                 </Form.Label>              
                        <table className='admin-table' style={{border:'1px solid #11999E'}}>
                            <tbody>
                            <tr padding='1px'><b>Medicine Details:</b></tr>
                            <tr>
                                <td rowspan="2">
                                <Carousel variant="dark">
                                    {(image=(Files.findOne({donation_id:request.donation_id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='request-preview-image' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{setDonation_id(request.donation_id);{console.log(donation_id)};handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                            </Carousel></td>
                                <td><b>Medicine Name: </b></td>
                                <td>{request.medicine_name}</td>
                            </tr>
                            <tr>
                                <td><b>Expiry Date: </b></td>
                                <td>{request.exp_date}</td>
                            </tr>
                            </tbody>
                        </table>
                        <br/>
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
                        {medfile?(
                         medfile.map((img,index) => (   
                        <div className="upload-image-container">
                        <img src={URL.createObjectURL(new Blob([img]))}
                        className="upload-preview-image"/>
                        <button className="circle-x-button" onClick={()=>{handleRemoveMedfile(img);}}
                        >X</button>
                        </div>))):(null)
                        }
                        <input type='file' id='file' className="file-input" onChange={fileInput}/>
                        <Form.Label className="loginError">{fileerror}</Form.Label>
                        <br/>
                         <Button type='submit'>Submit</Button>   
                    </Form>
                    <Modal show={show} onHide={handleClose} size='lg'>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                    {donation_id?(<Carousel variant="dark">
                                    {(image=(Files.findOne({donation_id:donation_id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='admin-image' src={URL.createObjectURL(new Blob([img]))}
                                    />
                                    </Carousel.Item>))):"Not found"
                                    }
                            </Carousel>):null}
                    </Modal.Body>
                </Modal>
            </div>
        )
        }//if edit
        else{
            return(
                <Alert variant='warning'>You cannot edit this request. 
                    <Alert.Link href="/yourrequests" variant="warning"> Click here </Alert.Link>
                     to go back to your requests
                </Alert>) 
        }
    }//if isloading
    else{
        return(<div>
            <Spinner className="spinner" animation="grow" variant="primary" />
        </div>)  
    }
}// if user
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
export default EditRequestForm
