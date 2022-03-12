import React,{useEffect,useState} from 'react';
import { Request } from '../api/links';
import { Files } from '../api/links';
import {FaCheck} from '@react-icons/all-files/fa/FaCheck';
import { Spinner ,Col,Row,Button,Carousel,Modal} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {useTracker} from 'meteor/react-meteor-data'
const RequestStatus = () => { 
 if(Meteor.user()){
    let { id } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};

    const [donationshow, setDonationShow] = useState(false);
    const handleDonationClose = () => setDonationShow(false);
    const handleDonationShow = () => {setDonationShow(true)};

    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('requestStatus',id);//used useTracker to continuously check if subscribe is ready 
        return(!handle.ready());
        })

    const isLoadingImg=useTracker(()=>{
        const handle=Meteor.subscribe('requestStatusImages',id);
        return(!handle.ready());
    })    
    
    
        function cancelRequest(){
        if(confirm("Are you sure you want to cancel your request?")){
            // Request.update(id,{$set:{status:'canceled'}});
            Meteor.call('cancelRequest',id,
            (error,result)=>{
                if(error){
                  alert('Error Request not cancelled');  
                }else{
                  alert('Request Cancelled')
                }
            });
            window.location.reload(false);
        }   
    }
    
    useEffect(()=>{
        if(!isLoadingData&&!isLoadingImg){
            const request=Request.findOne({_id:id});
            if(Meteor.user().profile.role=='admin'||Meteor.user()._id==request.user_id){ 
        switch(request.status){
            case 'canceled':{
                document.getElementById("verification").classList.add('not-done');
                break;
            }
            case 'rejected':{
                document.getElementById("verification").classList.add('not-done');
                break;
            }
            case 'in verification':{
                document.getElementById("verification").classList.add('current');
                break;
            }
            case 'verified':{
                document.getElementById("verification").classList.add('is-done');
                break;
            }
            case 'dispatched':{
                document.getElementById("verification").classList.add('is-done');
                document.getElementById("dispatched").classList.add('current');
                break;
            }
            case 'in transit':{
                document.getElementById("verification").classList.add('is-done');
                document.getElementById("dispatched").classList.add('is-done');
                document.getElementById("in-transit").classList.add('current');

                break;
            }
            case 'out for delivery':{
                document.getElementById("verification").classList.add('is-done');
                document.getElementById("dispatched").classList.add('is-done');
                document.getElementById("in-transit").classList.add('is-done');
                document.getElementById("out-for-delivery").classList.add('current');  
                break;
            }
            case 'delivered':{
                document.getElementById("verification").classList.add('is-done');
                document.getElementById("dispatched").classList.add('is-done');
                document.getElementById("in-transit").classList.add('is-done');
                document.getElementById("out-for-delivery").classList.add('is-done');  
                document.getElementById("delivered").classList.add('is-done');  
                break;
            }
        }
    }
}
    })
    if(!isLoadingData&&!isLoadingImg){
        const request=Request.findOne({_id:id});
        console.log(request);
        if(Meteor.user().profile.role=='admin'||Meteor.user()._id==request.user_id){   
  return( 
  <div className='form'>
      
        <Row>
        <Col sm>    
        <h3>Current Status: {request.status}</h3>
        <div class="delivery-progress">
            <ul class="StepProgress">
                <li id='verification' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>Verification</strong>
                    </div>
                </li>
                <li id='dispatched' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>Dispatched</strong>
                    </div>
                </li>
                <li id='in-transit' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>In transit</strong>
                    </div>   
                </li>
                <li id ='out-for-delivery' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>Out for delivery</strong>
                    </div>    
                </li>
                <li id='delivered' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>Sucessfully Delivered</strong>
                    </div>    
                </li>
            </ul>
        </div>
        </Col>
        <Col sm>
        <Row>
            <Col> {((Files.findOne({donation_id:request.donation_id})).data.length == 1)?//it checks if one image is uploaded then display one image else display carousel
                        ((image=(Files.findOne({donation_id:request.donation_id})).data)?
                        (<img className='preview-image' src={URL.createObjectURL(new Blob([image[0]]))}
                        onClick={()=>{handleDonationShow()}}/>)
                        :"Not found")
                        :(<Carousel variant="dark">
                                    {(image=(Files.findOne({donation_id:request.donation_id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='preview-image' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{handleDonationShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                        </Carousel>)
                    }
            </Col>    
        </Row>
        <br/>   
        <Row>
            <Col style={{'text-align':'right'}}>Donor Name:</Col><Col>{request.requester_name}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Address:</Col><Col>{request.address}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Medicine Name:</Col><Col>{request.medicine_name}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Medicine type:</Col><Col>{request.type}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Donated At:</Col><Col>{request.requestdate}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Expiry Date:</Col><Col>{request.exp_date}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Status:</Col><Col>{request.status}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>
                Submitted Documents/Prescription
            </Col>
            <Col>
            {((Files.findOne({request_id:id})).data.length == 1)?//it checks if one image is uploaded then display one image else display carousel
                        ((image=(Files.findOne({request_id:id})).data)?
                        (<img className='preview-image' src={URL.createObjectURL(new Blob([image[0]]))}
                        onClick={()=>{handleShow()}}/>)
                        :"Not found")
                        :(<Carousel variant="dark">
                                    {(image=(Files.findOne({request_id:id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='preview-image' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                        </Carousel>)
                    }
            </Col>
        </Row>
        <br/>
        <Row>
            <Col></Col>
            <Col></Col>
            <Col>{(request.status!='rejected' && request.status!='canceled')?(
                <td>
                    {(request.status=='verified' || request.status=='in verification')?(<Button className="btn-danger" onClick={()=>cancelRequest()}>Cancel</Button>):(null)}
                </td>):null}
            </Col>
            <Col></Col>
            <Col></Col>
        </Row>
        </Col>
        </Row>
        <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                {id?
                (<Carousel variant="dark">
                    {(image=(Files.findOne({request_id:id})).data)?
                    ( image.map((img,index) => (
                    <Carousel.Item>
                    <img className='admin-image' src={URL.createObjectURL(new Blob([img]))}
                    />
                     </Carousel.Item>))):"Not found"
                    }
                </Carousel> ):null}
                </Modal.Body>
              </Modal>

              <Modal show={donationshow} onHide={handleDonationClose} fullscreen={true}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                {(request.donation_id)?
                (<Carousel variant="dark">
                    {(image=(Files.findOne({donation_id:request.donation_id})).data)?
                    ( image.map((img,index) => (
                    <Carousel.Item>
                    <img className='admin-image' src={URL.createObjectURL(new Blob([img]))}
                    />
                     </Carousel.Item>))):"Not found"
                    }
                </Carousel> ):null}
                </Modal.Body>
              </Modal>
    </div>
  );//return
}else{
    return(<div>you do not have permission to access this page</div>)
    
}
}
else{
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
      return(<div>You need to be logged in to access this page</div>)
  } 
};

export default RequestStatus;
