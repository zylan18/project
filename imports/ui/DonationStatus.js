import React,{useEffect,useState} from 'react';
import { DonationList } from '../api/Collections';
import { Files } from '../api/Collections';
import {FaCheck} from '@react-icons/all-files/fa/FaCheck';
import { Spinner ,Col,Row,Button,Carousel,Modal} from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import {useTracker} from 'meteor/react-meteor-data'

const DonationStatus = () => { 
 if(Meteor.user()){
    let { id } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('donationStatus',id);//used useTracker to continuously check if subscribe is ready 
        return(!handle.ready());
        })

    const isLoadingImg=useTracker(()=>{
        const handle=Meteor.subscribe('donationStatusImages',id);
        return(!handle.ready());
    })    
    
    function cancelDonation(){
        if(confirm("Are you sure you want to cancel your donation?")){
            // DonationList.update(id,{$set:{status:'canceled'}});
            Meteor.call('cancelDonation',id,
            (error,result)=>{
                if(error){
                    alert('error donation not cancelled');
                }else{
                    alert('donation cancelled');
                    window.location.reload(false);
                }
            });
            
        }   
    }
    useEffect(()=>{
        if(!isLoadingData&&!isLoadingImg){
        const donation=DonationList.findOne({_id:id})
        if(Meteor.user().profile.role=='admin'||Meteor.user()._id==donation.user_id){ 
        console.log((DonationList.find({_id:id}).fetch())[0].status)
        switch(donation.status){
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
            case 'pickup in progress':{
                document.getElementById("verification").classList.add('is-done');
                document.getElementById("pick-up").classList.add('current');
                break;
            }
            case 'collected':{
                document.getElementById("verification").classList.add('is-done');
                document.getElementById("pick-up").classList.add('is-done');
                document.getElementById("collected").classList.add('current');

                break;
            }
            case 'in transit':{
                document.getElementById("verification").classList.add('is-done');
                document.getElementById("pick-up").classList.add('is-done');
                document.getElementById("collected").classList.add('is-done');
                document.getElementById("in-transit").classList.add('current');  
                break;
            }
            case 'storage':{
                document.getElementById("verification").classList.add('is-done');
                document.getElementById("pick-up").classList.add('is-done');
                document.getElementById("collected").classList.add('is-done');
                document.getElementById("in-transit").classList.add('is-done');  
                document.getElementById("storage").classList.add('is-done');  
                break;
            }
        }
        console.log('useEffect');
        }
    }
    })//removed the array parameter of useEffect as it makes it run useEffect only once

  if(!isLoadingData&&!isLoadingImg){
  const donation=DonationList.findOne({_id:id});
  if(Meteor.user().profile.role=='admin'||Meteor.user()._id==donation.user_id){ 
  return( 
  <div className='form'>
      
        <Row>
        <Col sm>    
        <h1>Current Status: {donation.status}</h1>
        <div class="delivery-progress">
            <ul class="StepProgress">
                <li id='verification' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>Verification</strong>
                    </div>
                </li>
                <li id='pick-up' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>Pick Up in progress</strong>
                    </div>
                </li>
                <li id='collected' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>Collected</strong>
                    </div>   
                </li>
                <li id ='in-transit' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>In Transit</strong>
                    </div>    
                </li>
                <li id='storage' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>Sucessfully Donated</strong>
                    </div>    
                </li>
            </ul>
        </div>
        </Col>
        <Col sm>
        <Row>
            <Col> {((Files.findOne({donation_id:id})).data.length == 1)?//it checks if one image is uploaded then display one image else display carousel
                        ((image=(Files.findOne({donation_id:id})).data)?
                        (<img className='preview-image' src={URL.createObjectURL(new Blob([image[0]]))}
                        onClick={()=>{handleShow()}}/>)
                        :"Not found")
                        :(<Carousel variant="dark">
                                    {(image=(Files.findOne({donation_id:id})).data)?
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
            <Col style={{'text-align':'right'}}>Donor Name:</Col><Col>{donation.donor_name}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Address:</Col><Col>{donation.address}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Medicine Name:</Col><Col>{donation.medicine_name}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Medicine type:</Col><Col>{donation.type}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Donated At:</Col><Col>{donation.donatedat}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Expiry Date:</Col><Col>{donation.exp_date}</Col>
        </Row>
        <Row>
            <Col style={{'text-align':'right'}}>Status:</Col><Col>{donation.status}</Col>
        </Row>
        <br/>
        <Row>
            <Col></Col>
            <Col></Col>
            <Col>{(donation.status!='rejected' && donation.status!='canceled')?(
                <td>
                    {(donation.status=='verified' || donation.status=='in verification')?(<Button className="btn-danger" onClick={()=>cancelDonation()}>Cancel</Button>):(null)}
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
                    {(image=(Files.findOne({donation_id:id})).data)?
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
    return(
        <div>You do not have permission to view this page</div>
)  
} 
}else{
    return(
    <div>
        <Spinner className="spinner" animation="grow" variant="primary" />
    </div>);     
 }
}
 else if(Meteor.loggingIn()){
    return(<div>
        <Spinner className="spinner" animation="border" variant="primary" />
    </div>)         
  }
  else{
      return(<div>You have to be logged in to acces this page</div>)
  } 
};

export default DonationStatus;
