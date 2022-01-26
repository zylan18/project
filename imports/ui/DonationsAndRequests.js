import React,{useState} from 'react';
import { DonationList } from '../api/links';
import {Alert,Spinner,Button,Modal} from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import {Files} from '../api/links';

function verifyColor(t){
    if(t==true){
        return "verified";
    }
    else{
        return "not-verified"
    }
}
function cancelDonation(index){
    if(confirm("Are you sure you want to cancel your donation?")){
        const donationList=DonationList.find({username:Meteor.user().username},{fields:{}}).fetch();
        DonationList.update(donationList[index]._id,{$set:{status:'canceled'}});
        window.location.reload(false);
    }
    
}

const DonationsAndRequests = () => {
    
    
    if(Meteor.user()){
    const [donation_id,setDonation_id]=useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    const [show, setShow] = useState(false);
    const donationList=DonationList.find({username:(Meteor.user()).username},{fields:{}}).fetch();
        return (
            <div className="form">
                <table className="admin-table">
                    
                    <tr>
                        <th>Medicine Name</th>
                        <th>Donated at</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                        <th>Verified by</th>
                    </tr>
                {donationList.map((donor,index) => (
                    <tr data-index={index} className={(verifyColor(donor.verify_status))}>
                        <td>{donor.medicine_name}</td>
                        <td>{donor.donatedat}</td>
                        <td>{donor.exp_date}</td>
                        <td>{donor.status}</td>
                        <td>{donor.verified_by?(donor.verified_by):("Not verified yet")}</td>
                        {(donor.status!='rejected' && donor.status!='canceled')?(
                        <td>
                            <Button className="btn-danger" onClick={()=>cancelDonation(index)}>Cancel</Button>
                        </td>):null} 
                        <td>
                            {}
                            {console.log((Files.findOne({donation_id:donor._id})).data)}
                       <img className="preview-image"src={URL.createObjectURL(new Blob([(Files.findOne({donation_id:donor._id})).data]))}
                       onClick={()=>{setDonation_id(donor._id);handleShow()}}/>
                       </td>
                    </tr>)
                    )
                }
                </table>
                <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                {donation_id?(<img className="modal-image" src={URL.createObjectURL(new Blob([(Files.findOne({donation_id:donation_id})).data]))}/>):null}
                </Modal.Body>
              </Modal>
            </div>
        )
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

export default DonationsAndRequests
