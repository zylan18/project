import React,{useState,useEffect} from 'react'
import { Request } from '../api/links'
import { DonationList } from '../api/links';
import { useTracker } from 'meteor/react-meteor-data';
import {Alert,Modal,Spinner,Carousel,Form,Button} from 'react-bootstrap';
import {Files} from '../api/links';
import {GiConfirmed} from '@react-icons/all-files/gi/GiConfirmed';//to use icon
import {GiCancel} from '@react-icons/all-files/gi/GiCancel';

function verify(index){
    
    const user=Meteor.user();
    const reqname=Request.find({},{fields:{}}).fetch();
    if(reqname[index].verify_status == true){
    Request.update(reqname[index]._id,{$set:{verify_status:false}});
    Request.update(reqname[index]._id,{$set:{status:'not verified'}});
    Request.update(reqname[index]._id,{$set:{edit:true}});
    DonationList.update(reqname[index].donation_id,{$set:{status:'storage'}})
    console.log(reqname[index].verify_status);
    }
    else if(reqname[index].verify_status == "rejected"){
        Request.update(reqname[index]._id,{$set:{verify_status:false}});
        Request.update(reqname[index]._id,{$set:{status:'in verification'}});
        Request.update(reqname[index]._id,{$set:{edit:true}});
        console.log(reqname[index].verified_by);
    }
    else{
        Request.update(reqname[index]._id,{$set:{verify_status:true}});
        Request.update(reqname[index]._id,{$set:{status:'verified'}});
        Request.update(reqname[index]._id,{$set:{edit:false}});
        DonationList.update(reqname[index].donation_id,{$set:{status:'request verified'}})
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
        if(Meteor.user().profile.admin){
        const reqname=Request.find({},{fields:{}}).fetch();
        let verifyIcon = { color: "#26bd00"};//used to change color of icon
        let cancelIcon = { color: "#ff2222"};//used to change color of icon
        
        const [request_id,setRequest_id]=useState('');
        const [status,handleStatus]=useState('');
        const [remark,handleRemark]=useState('');

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => {setShow(true)};

        const [remarkshow,setRemarkShow]=useState(false);
        const handleRemarkClose = () => setRemarkShow(false);
        const handleRemarkShow = () => {setRemarkShow(true)};
        
        setStatus=(id)=>{
            Request.update(id,{$set:{edit:status}});
            window.location.reload(false);
        }

        setRemark=(id)=>{
            Request.update(id,{$set:{remark:remark,edit:true}});
            window.location.reload(false);
        }
        useEffect(() => {
            for(i=0;i<reqname.length;i++){
                if('in collection'||'storage'||'in delivery'||'delivered'){
                    document.getElementById(`status${i}`).checked=reqname[i].edit;
                    }
            }
            }, []);

        var image;
        //console.log(reqname);
        return (
            <div className='admin-page'>
              <div className="table-scrollbar Flipped"> {/*used to flip the div to get horizontal scrollbar */}
              <div className='Flipped'> {/*used to flip back the table contents*/}
                <table className="admin-table">
                    <tbody>
                    <tr>
                        <th width="150px"></th>
                        <th width="100px">Requester Name</th>
                        <th width="100px">Medicine Name</th>
                        <th width='100px'>Medicine Type</th>
                        <th width="100px">Requested date</th>
                        <th width="100px">Expiry Date</th>
                        <th width="200px">Reason</th>
                        <th width="200px">Address</th>
                        <th width='210px'>Set Edit</th>
                        <th width="100px">Verify Status</th>
                        <th width="130px">Status</th>
                        <th width="100px">Verified by</th>
                        <th width="100px">Verify</th>
                        <th width="100px"></th>
                        <th width="150px">Remarks</th>
                        
                    </tr>
                {
                reqname.map((medicine,index) => (
                    <tr data-index={index} className={(verifyColor(medicine.verify_status))}>
                        {/* {console.log(index)} */}
                        <td>
                        {((Files.findOne({request_id:medicine._id})).data.length == 1)?//it checks if one image is uploaded then display one image else display carousel
                        ((image=(Files.findOne({request_id:medicine._id})).data)?
                        (<img className='preview-image' src={URL.createObjectURL(new Blob([image[0]]))}
                        onClick={()=>{setRequest_id(medicine._id);handleShow()}}/>)
                        :"Not found")
                        :(<Carousel variant="dark">
                                    {(image=(Files.findOne({request_id:medicine._id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='preview-image' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{setRequest_id(medicine._id);{console.log(request_id)};handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                            </Carousel>)}
                        </td>
                        <td>{medicine.requester_name}</td>
                        {/* {console.log(medicine.donor_name)} */}
                        <td><a href={`/donationstatus/${medicine.donation_id}`}>{medicine.medicine_name}</a></td>
                        <td>{medicine.type}</td>
                        <td>{medicine.requestdate}</td>
                        <td>{medicine.exp_date}</td>
                        <td>{medicine.reason}</td>
                        <td>{medicine.address}</td>
                        <td>
                            <tr>
                            <td>
                            <Form.Check 
                                type="switch"
                                id={`status${index}`}
                                onChange={e=>{handleStatus(e.target.checked)}}
                                label={(medicine.edit)?('Disable Edit'):('Enable Edit')}
                            />
                            </td>
                                <td>
                                    <Button variant='warning' onClick={()=>{setStatus(medicine._id)}}>set</Button>
                                </td>
                            </tr>
                        </td>
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
                        <td>
                            <tr>
                                <td>
                                    {(medicine.remark)?(medicine.remark):('no remarks yet')}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button className='btn-danger' onClick={()=>{setRequest_id(medicine._id);handleRemarkShow()}}>Remark</Button>
                                </td>
                            </tr>
                            
                        </td> 
                    </tr>
                    
                )
                
            )
            
        }
                </tbody>
                </table>
                </div>
               </div> 
                <Modal show={show} onHide={handleClose} fullscreen={true}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                    {request_id?(<Carousel variant="dark">
                                    {(image=(Files.findOne({request_id:request_id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='admin-image' src={URL.createObjectURL(new Blob([img]))}
                                    />
                                    </Carousel.Item>))):"Not found"
                                    }
                            </Carousel>):null}
                    </Modal.Body>
                  </Modal>
                <Modal show={remarkshow} onHide={handleRemarkClose}>
                    <Modal.Header closeButton>  
                        Set Remark
                    </Modal.Header>
                    <Modal.Body>
                        <input type='text' onChange={e=>handleRemark(e.target.value)} className='form-control'/>
                        <br/>
                        <Button className='btn-primary' onClick={()=>{setRemark(request_id);console.log('click')}}>submit</Button>
                    </Modal.Body>
              </Modal>
            </div>)
        }
        else{
            return(<div>You do not have permission to access this page</div>)
        }
    }
        else if(Meteor.loggingIn()){
            return(<div>
                <Spinner className="spinner" animation="border" variant="primary" 
               />
              
            </div>)         
          }
        else{
            return(
                <div>You do not have permission to access this page</div>
            )
        }
    }

export default AdminRequest;
