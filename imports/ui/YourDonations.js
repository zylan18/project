import React,{useState,useEffect} from 'react';
import { DonationList } from '../api/links';
import {Alert,Spinner,Button,Modal,Carousel,Toast} from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import {Files} from '../api/links';
import {useNavigate} from 'react-router-dom';
import {MdWarning} from '@react-icons/all-files/md/MdWarning';

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

    const [showtoast, setShowToast] = useState([]);
    const handleAdd = (toast) => {
    const newtoast = showtoast.slice();
        newtoast.push(toast);
        setShowToast(newtoast);
      }
      
    const handleUpdate = (index, toast) => {
        const newtoast = [...showtoast];
        newtoast[index] = toast;
        console.log(showtoast);
        setShowToast(newtoast);
      }
    
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('yourDonations');//used useTracker to continuously check if subscribe is ready 
        return(!handle.ready());
        })

    const isLoadingImg=useTracker(()=>{
        const handle=Meteor.subscribe('yourDonationImages')
        return(!handle.ready());
    })   

    useEffect(()=>{
        if(!isLoadingData && !isLoadingImg){
            const donor=DonationList.find({username:(Meteor.user()).username},{fields:{}}).fetch();
            for(i=0;i<donor.length;i++){
                handleAdd(true);
            }
        }
    },[isLoadingImg]) 

    if(!isLoadingData && !isLoadingImg){
    const donationList=DonationList.find({username:(Meteor.user()).username},{fields:{}}).fetch();
        console.log(donationList)
        return (
            <div className="admin-page">
                <h1>Your Donations</h1>
                <div className='toast-notification'>
                {donationList.map((donor,index) => (
                (donor.remark)?
                        (<Toast show={showtoast[index]} position='top-center' onClose={()=>{handleUpdate(index,false);}}>
                            <Toast.Header>    
                            <strong className="me-auto">Remarks on your donation {donor.medicine_name}</strong>
                            <small></small>
                            </Toast.Header>
                            <Toast.Body>{donor.remark}&nbsp;<a href={`/editdonation/${donor._id}`}>click here to edit</a></Toast.Body>
                        </Toast>)
                        :(null)))
                        }
                    </div>
                <table className="admin-table your-donation-table">
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
                        <td >
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
                        <td className='medicine-detail'>{donor.medicine_name}</td>
                        <td className='medicine-detail'>{donor.donatedat}</td>
                       
                        <td className='medicine-detail'>{donor.status}</td>
                        <td className='medicine-detail'>{(donor.remark)?(donor.remark):('no remarks yet')}</td>
                        {/* {(donor.status!='rejected' && donor.status!='canceled')?(
                        <td>
                            <Button className="btn-danger" onClick={()=>cancelDonation(index)}>Cancel</Button>
                        </td>):null}  */}
                        <td className='medicine-detail'><a href={`/donationstatus/${donor._id}`}>click here for more details</a></td>
                        <td className='request-button'>{(donor.edit)?(<Button onClick={()=>navigate(`/editdonation/${donor._id}`)}>edit</Button>):(null)}</td>
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
