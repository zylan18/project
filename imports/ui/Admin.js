import React,{useState} from 'react'
import { DonationList } from '../api/links'
import { useTracker } from 'meteor/react-meteor-data';
import {Alert,Modal,Spinner} from 'react-bootstrap';
import {Files} from '../api/links';

function verify(index){
    const user=Meteor.user();
    const donname=DonationList.find({},{fields:{}}).fetch();
    if(donname[index].verify_status == true){
    DonationList.update(donname[index]._id,{$set:{verify_status:false}});
    DonationList.update(donname[index]._id,{$set:{status:'not verified'}});
    console.log(donname[index].verify_status);
    }
    else if(donname[index].verify_status == "rejected"){
        DonationList.update(donname[index]._id,{$set:{verify_status:false}});
        DonationList.update(donname[index]._id,{$set:{status:'in verification'}});
        console.log(donname[index].verified_by);
    }
    else{
        DonationList.update(donname[index]._id,{$set:{verify_status:true}});
        DonationList.update(donname[index]._id,{$set:{status:'verified'}});
        console.log(donname[index].verified_by);
    }
    console.log("update");
    DonationList.update(donname[index]._id,{$set:{verified_by:user.username}});
    window.location.reload(false);
}
function rejectVerification(index){
    const user=Meteor.user();
    const donname=DonationList.find({},{fields:{}}).fetch();
    DonationList.update(donname[index]._id,{$set:{verify_status:'rejected'}});
    DonationList.update(donname[index]._id,{$set:{status:'rejected'}});
    window.location.reload(false);
}
function verifyColor(t){
    if(t==true){
        return "verified";
    }
    else{
        return "not-verified"
    }
}
const Admin = () => {
    if(Meteor.user()){
    const [show, setShow] = useState(false);
    const [donation_id,setDonation_id]=useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    const donname=DonationList.find({},{fields:{}}).fetch();


    //console.log(donname);
    return (
        <div>
            <table className="admin-table">
                
                <tr>
                    <th>Donor Name</th>
                    <th>Medicine Name</th>
                    <th>Expiry Date</th>
                    <th>Verify Status</th>
                    <th>Status</th>
                    <th>Verified by</th>
                    <th>Verify</th>
                    <th></th>
                </tr>
            {
            donname.map((name,index) => (
                <tr data-index={index} className={(verifyColor(name.verify_status))}>
                    {/* {console.log(index)} */}
                    <td>{name.donor_name}</td>
                    {/* {console.log(name.donor_name)} */}
                    <td>{name.medicine_name}</td>
                    <td>{name.exp_date}</td>
                    <td>{name.status}</td>
                    <td>{(name.verify_status==true)?("Verified")
                    :(name.verify_status=="rejected")?("Rejected")
                    :("Not Verified")}
                    </td>
                    <td>{name.verified_by}</td>
                    <td>
                        <button id={index} className={(verifyColor(!name.verify_status))} onClick={()=>{verify(index)}}>
                            {(name.verify_status==true)?("Cancel")
                            :(name.verify_status=="rejected")?("Cancel Rejection")
                            :("Verify")}</button>
                    </td> 
                    <td>   
                        <button style={{"color":"red"}} onClick={()=>rejectVerification(index)}>Reject</button>
                    </td> 
                    <td className="image-table">
                            {(Files.findOne({donation_id:name._id}))?(<img className="preview-image"src={URL.createObjectURL(new Blob([(Files.findOne({donation_id:name._id})).data]))}
                            onClick={()=>{setDonation_id(name._id);handleShow()}}/>):"Not found"}
                    </td>
                </tr>
                
            )
            
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
        </div>)
    }
    else if(Meteor.loggingIn()){
        return(<div>
            <Spinner className="spinner" animation="border" variant="primary" 
           />
          
        </div>)         
      }
    else{
        return(
            <div>You need to login</div>
        )
    }
}
export default Admin
