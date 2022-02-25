import React,{useState} from 'react';
import { DonationList } from '../api/links';
import {Alert,Spinner,Button,Modal,Carousel,} from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import {Files} from '../api/links';
import {useNavigate} from 'react-router-dom';

function verifyColor(t){
    if(t==true){
        return "verified";
    }
    else{
        return "not-verified"
    }
}

const YourDonations = () => {  
    
    if(Meteor.user()){  
    const [donation_id,setDonation_id]=useState('');
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    const [show, setShow] = useState(false);
    
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('yourDonations');//used useTracker to continuously check if subscribe is ready 
        return(!handle.ready());
        })

    const isLoadingImg=useTracker(()=>{
        const handle=Meteor.subscribe('yourDonationImages')
        return(!handle.ready());
    })    
    if(!isLoadingData && !isLoadingImg){
    const donationList=DonationList.find({username:(Meteor.user()).username},{fields:{}}).fetch();
        console.log(donationList)
        return (
            <div className="admin-page">
                <h1>Your Donations</h1>
                <table className="admin-table">
                    <tbody>
                    
                    <tr>
                        <th width="100px"></th>
                        <th width='100px'>Medicine Name</th>
                        <th width='100px'>Donated at</th>
                       
                        <th width='100px'>Status</th>
                        <th width='100px'>Remarks</th>
                        <th width='100px'></th>
                        <th width='75px'></th>
                      
                    </tr>
                {donationList.map((donor,index) => (
                    <tr data-index={index} className={(verifyColor(donor.verify_status))}>
                        <td>
                        {((Files.findOne({donation_id:donor._id})).data.length == 1)?//it checks if one image is uploaded then display one image else display carousel
                        ((image=(Files.findOne({donation_id:donor._id})).data)?
                        (<img className='preview-image' src={URL.createObjectURL(new Blob([image[0]]))}
                        onClick={()=>{setDonation_id(donor._id);handleShow()}}/>)
                        :"Not found")
                        :(<Carousel variant="dark">
                                    {(image=(Files.findOne({donation_id:donor._id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='preview-image' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{setDonation_id(donor._id);handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                        </Carousel>)
                        }
                        </td>
                        <td>{donor.medicine_name}</td>
                        <td>{donor.donatedat}</td>
                       
                        <td>{donor.status}</td>
                        <td>{donor.remark}</td>
                        {/* {(donor.status!='rejected' && donor.status!='canceled')?(
                        <td>
                            <Button className="btn-danger" onClick={()=>cancelDonation(index)}>Cancel</Button>
                        </td>):null}  */}
                        <td><a href={`/donationstatus/${donor._id}`}>click here for more details</a></td>
                        <td>{(donor.edit)?(<Button onClick={()=>navigate(`/editdonation/${donor._id}`)}>edit</Button>):(null)}</td>
                    </tr>
                    
                    )
                    )
                }
                </tbody>
                </table>
                <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                {donation_id?
                (<Carousel variant="dark">
                            {(image=(Files.findOne({donation_id:donation_id})).data)?
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
        )
    }else{
        return(<div>
            <Spinner className="spinner" animation="grow" variant="primary" 
           />
        </div>)  
    }
    }
    else if(Meteor.loggingIn()){
        return(<div>
            <Spinner className="spinner" animation="border" variant="primary" 
           />
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

export default YourDonations
