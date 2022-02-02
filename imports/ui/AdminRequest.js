import React,{useState} from 'react'
import { Request } from '../api/links'
import { useTracker } from 'meteor/react-meteor-data';
import {Alert,Modal,Spinner} from 'react-bootstrap';
import {Files} from '../api/links';
import {GiConfirmed} from '@react-icons/all-files/gi/GiConfirmed';//to use icon
import {GiCancel} from '@react-icons/all-files/gi/GiCancel';

function verify(index){
    
    const user=Meteor.user();
    const reqname=Request.find({},{fields:{}}).fetch();
    if(reqname[index].verify_status == true){
    Request.update(reqname[index]._id,{$set:{verify_status:false}});
    Request.update(reqname[index]._id,{$set:{status:'not verified'}});
    console.log(reqname[index].verify_status);
    }
    else if(reqname[index].verify_status == "rejected"){
        Request.update(reqname[index]._id,{$set:{verify_status:false}});
        Request.update(reqname[index]._id,{$set:{status:'in verification'}});
        console.log(reqname[index].verified_by);
    }
    else{
        Request.update(reqname[index]._id,{$set:{verify_status:true}});
        Request.update(reqname[index]._id,{$set:{status:'verified'}});
        console.log(reqname[index].verified_by);
    }
    console.log("update");
    Request.update(reqname[index]._id,{$set:{verified_by:user.username}});
    window.location.reload(false);
}
function rejectVerification(index){
    const user=Meteor.user();
    const reqname=Request.find({},{fields:{}}).fetch();
    Request.update(reqname[index]._id,{$set:{verify_status:'rejected'}});
    Request.update(reqname[index]._id,{$set:{status:'rejected'}});
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

const AdminRequest = () => {
    if(Meteor.user()){
        let verifyIcon = { color: "#26bd00"};//used to change color of icon
        let cancelIcon = { color: "#ff2222"};//used to change color of icon
        const [show, setShow] = useState(false);
        const [request_id,setRequest_id]=useState('');
        const handleClose = () => setShow(false);
        const handleShow = () => {setShow(true)};
        const reqname=Request.find({},{fields:{}}).fetch();
    
        var image;
        //console.log(reqname);
        return (
            <div className='admin-page'>
              <div className="table-scrollbar Flipped"> {/*used to flip the div to get horizontal scrollbar */}
              <div className='Flipped'> {/*used to flip back the table contents*/}
                <table className="admin-table">
                    
                    <tr>
                        <th width="100px">Requester Name</th>
                        <th width="100px">Medicine Name</th>
                        <th width='100px'>Medicine Type</th>
                        <th width="100px">Requested date</th>
                        <th width="100px">Expiry Date</th>
                        <th width="200px">Reason</th>
                        <th width="200px">Address</th>
                        <th width="100px">Verify Status</th>
                        <th width="130px">Status</th>
                        <th width="100px">Verified by</th>
                        <th width="100px">Verify</th>
                        <th width="100px"></th>
                    </tr>
                {
                reqname.map((medicine,index) => (
                    <tr data-index={index} className={(verifyColor(medicine.verify_status))}>
                        {/* {console.log(index)} */}
                        <td>{medicine.requester_name}</td>
                        {/* {console.log(medicine.donor_name)} */}
                        <td>{medicine.medicine_name}</td>
                        <td>{medicine.type}</td>
                        <td>{medicine.requestdate}</td>
                        <td>{medicine.exp_date}</td>
                        <td>{medicine.reason}</td>
                        <td>{medicine.address}</td>
                        <td>{medicine.status}</td>
                        <td>
                        <span className={"status "+(verifyColor(medicine.verify_status))}>
                        {(medicine.verify_status==true)?(<span style={verifyIcon}><GiConfirmed style={verifyIcon}/> Verified</span>)
                        :(medicine.verify_status=="rejected")?(<span style={cancelIcon}><GiCancel style={cancelIcon}/> Rejected</span>)
                        :("Not Verified")}
                        </span>
                        </td>
                        <td>{medicine.verified_by}</td>
                        <td>
                            <button id={index} className={(verifyColor(!medicine.verify_status))} onClick={()=>{verify(index)}}>
                                {(medicine.verify_status==true)?("Cancel")
                                :(medicine.verify_status=="rejected")?("Cancel Rejection")
                                :("Verify")}</button>
                        </td> 
                        <td>   
                            <button style={{"color":"red"}} onClick={()=>rejectVerification(index)}>Reject</button>
                        </td> 
                        <td className="image-table">
                                {(image=(Files.findOne({request_id:medicine._id})).data)?(<img className="preview-image"src={URL.createObjectURL(new Blob([image]))}
                                onClick={()=>{setRequest_id(medicine._id);handleShow()}}/>):"Not found"}
                        </td>
                    </tr>
                    
                )
                
            )
            
        }
                </table>
                </div>
               </div> 
                <Modal show={show} onHide={handleClose} fullscreen={true}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                    {request_id?(<img className="modal-image" src={URL.createObjectURL(new Blob([(Files.findOne({request_id:request_id})).data]))}/>):null}
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

export default AdminRequest;
