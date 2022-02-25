import React,{useState} from 'react'
import {Alert,Form,FloatingLabel,Modal,Spinner,Col,Row,Carousel,Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { DonationList } from '../api/links'
import { Files } from '../api/links'
import {Request} from '../api/links'
import { useTracker } from 'meteor/react-meteor-data';

const RequestForm = () => {
    
    
    const user=Meteor.user();
    if (user){
    let { id } = useParams();//used to get values from address bar
    medicine=DonationList.findOne({_id:id})
    const [medfile,handleFileChange]=useState('');
    const [show, setShow] = useState(false);
    const [donation_id,setDonation_id]=useState('');
    const [reason,handleReasonChange]=useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    const [address,handleAddressChange]=useState(user.profile.address);
    const [phone,handlePhoneChange]=useState(Meteor.user().profile.phone);
    const [fileerror,handleFileError]=useState('');
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('donationStatus',id);//used useTracker to continuously check if subscribe is ready 
        return(!handle.ready());
        })

    const isLoadingImg=useTracker(()=>{
        const handle=Meteor.subscribe('donationStatusImages',id);
        return(!handle.ready());
    })    


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
    handleSubmit=()=>{
        //alert(`user_id:${Meteor.user()._id}\nrequestdate:${date.toLocaleString()}\nusername:${user.username}\nrequester_name:${user.profile.name}\ndonation_id:${id}\nmedicine_name:${medicine.medicine_name}\nexp_date:${medicine.exp_date}\nverify_status:${false}\nverified_by:${''}\nstatus:${'in verification'}\ntype:${medicine.type}`);
        Request.insert({user_id:Meteor.user()._id,requestdate:date.toLocaleString(),
        username:user.username,requester_name:user.profile.name,donation_id:id, 
        medicine_name:medicine.medicine_name, exp_date:medicine.exp_date,verify_status:false,verified_by:'',
        status:'in verification',type:medicine.type,reason:reason,address:address,phone:phone,edit:true,remark:''})
        Meteor.call('requestFormSaveFile',Meteor.user()._id,Meteor.user().username,medfile);    
    }
        var img=URL.createObjectURL(new Blob([medfile]))
        if(!isLoadingData&&!isLoadingImg){
        return (
            <div className="form">
                <Form onSubmit={handleSubmit}>
                    <Form.Label><h1>Request Form:</h1></Form.Label><br/>              
                        <table className='admin-table' style={{border:'1px solid #11999E'}}>
                            <tbody>
                            <tr padding='1px'><b>Medicine Details:</b></tr>
                            <tr>
                                <td rowspan="2">
                                <Carousel variant="dark">
                                    {(image=(Files.findOne({donation_id:medicine._id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='request-preview-image' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{setDonation_id(medicine._id);{console.log(donation_id)};handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                            </Carousel></td>
                                <td><b>Medicine Name: </b></td>
                                <td>{medicine.medicine_name}</td>
                            </tr>
                            <tr>
                                <td><b>Expiry Date:   </b></td>
                                <td>{medicine.exp_date}</td>
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
                        <input type='file' id='file' className="file-input" required onChange={fileInput}/>
                        <Form.Label className="loginError">{fileerror}</Form.Label>
                        <br/>
                         <Button type='submit'>Submit</Button>   
                    </Form>
                    <Modal show={show} onHide={handleClose} size='lg'>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                    {donation_id?(<Carousel variant="dark">
                                    {(image=(Files.findOne({donation_id:medicine._id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='admin-image' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{setDonation_id(medicine._id);{console.log(donation_id)};handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                            </Carousel>):null}
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
