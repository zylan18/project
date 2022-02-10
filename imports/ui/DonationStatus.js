import React,{useEffect,useState} from 'react';
import { DonationList } from '../api/links';
import { Files } from '../api/links';
import {FaCheck} from '@react-icons/all-files/fa/FaCheck';
import { Spinner ,Col,Row,Button,Carousel,Modal} from 'react-bootstrap';
import { useParams } from 'react-router-dom'

const DonationStatus = () => { 
 if(Meteor.user()){
    let { id } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    const donation=DonationList.findOne({_id:id})
    function cancelDonation(){
        if(confirm("Are you sure you want to cancel your donation?")){
            DonationList.update(id,{$set:{status:'canceled'}});
            window.location.reload(false);
        }   
    }
    useEffect(()=>{
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
    },[])
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
                    <Button className="btn-danger" onClick={()=>cancelDonation()}>Cancel</Button>
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
 }
 else if(Meteor.loggingIn()){
    return(<div>
        <Spinner className="spinner" animation="border" variant="primary" />
    </div>)         
  } 
};

export default DonationStatus;