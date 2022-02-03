import React,{useState,useEffect} from 'react'
import { DonationList } from '../api/links'
import { useTracker } from 'meteor/react-meteor-data';
import {Alert,Modal,Spinner,Form,Row,Col,Button} from 'react-bootstrap';
import {Files} from '../api/links';
import {GiConfirmed} from '@react-icons/all-files/gi/GiConfirmed';//to use icon
import {GiCancel} from '@react-icons/all-files/gi/GiCancel';
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
    const donname=DonationList.find({},{fields:{}}).fetch();
    let verifyIcon = { color: "#26bd00"};//used to change color of icon
    let cancelIcon = { color: "#ff2222"};//used to change color of icon
    const [show, setShow] = useState(false);
    const [donation_id,setDonation_id]=useState('');
    const [status,handleStatus]=useState('');
    const [medtype,handleMedType]=useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    const [donindex,setDonindex]=useState('');
    const [detailshow, setDetailShow] = useState(false);
    const handleDetailClose = () => setDetailShow(false);
    const handleDetailShow = () => {setDetailShow(true)};
    
    setStatus=(index)=>{
        if(status!=''){
        DonationList.update(donname[index]._id,{$set:{status:status}});
        console.log(donname)
        window.location.reload(false);
        }
        else{
        alert('select a status');
        }
    }
    setMedType=(index)=>{
        if(medtype!=''){
            DonationList.update(donname[index]._id,{$set:{type:medtype}});
            console.log(donname)
            window.location.reload(false);//reload page
            }
            else{
            alert('select a medtype');
            }
    }
    useEffect(() => {
        console.log(donname.lenght)
        for(i=0;i<donname.length;i++){
            if('in collection'||'storage'||'in delivery'||'delivered'){
                document.getElementById(`status${i}`).value=donname[i].status;
                document.getElementById(`type${i}`).value=donname[i].type;
                }
        }
        }, []);
    
    var image;
    //console.log(donname);
    return (
        <div className='admin-page'>
          <div className="table-scrollbar Flipped"> {/*used to flip the div to get horizontal scrollbar */}
          <div className='Flipped'> {/*used to flip back the table contents*/}
            <table className="admin-table">
                <tbody>
                <tr>
                    <th width='100px'></th>
                    <th width="100px">Donor Name</th>
                    <th width="100px">Medicine Name</th>
                    <th width="100px">Medicine Type</th>
                    <th width='210px'>Set Medicine Type</th>
                    <th width="100px">Expiry Date</th>
                    <th width="100px">Status</th>
                    <th width="210px">Set Status</th>
                    <th width="130px">Verification Status</th>
                    <th width="100px">Verified by</th>
                    <th width="100px">Verify</th>
                    <th width="100px"></th>
                </tr>
            {
            donname.map((name,index) => (
                
                <tr data-index={index}  className={(verifyColor(name.verify_status))}>
                    {/* {console.log(index)} */}
                    <td><Button variant='info' onClick={()=>{setDonindex(name._id);handleDetailShow();}}>detail</Button></td>
                    <td>{name.donor_name}</td>
                    {/* {console.log(name.donor_name)} */}
                    <td>{name.medicine_name}</td>
                    <td>{name.type}</td>
                    <td><td>
                        <tr>{/*select for medicine type*/}
                            <td>
                                
                                <Form.Select size="sm" id={`type${index}`} onChange={e=>handleMedType(e.target.value)} onLoad={()=>changeSelected(index,name.status)}>
                                    <option>select medicine type</option>
                                    <option value='antipyretic'>antipyretic</option>
                                    <option value='antibiotic'>antibiotic</option>
                                    <option value='antiseptic'>antiseptic</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Button variant='warning' onClick={()=>{setMedType(index)}}>set</Button>
                            </td>
                        </tr>
                    </td></td>
                    <td>{name.exp_date}</td>
                    <td>{name.status}</td>
                    <td>{/*select for status*/}
                        <tr>
                            <td>      
                                <Form.Select size="sm" onChange={e=>handleStatus(e.target.value)} id={`status${index}`}>
                                    <option>select status</option>
                                    <option value='in collection'>in collection</option>
                                    <option value='storage'>storage</option>
                                    <option value='in delivery'>in delivery</option>
                                    <option value='delivered'>delivered</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Button variant='warning' onClick={()=>{setStatus(index)}}>set</Button>
                            </td>
                        </tr>
                    </td>
                    <td>
                    <span className={"status "+(verifyColor(name.verify_status))}>
                    {(name.verify_status==true)?(<span style={verifyIcon}><GiConfirmed style={verifyIcon}/> Verified</span>)
                    :(name.verify_status=="rejected")?(<span style={cancelIcon}><GiCancel style={cancelIcon}/> Rejected</span>)
                    :("Not Verified")}
                    </span>
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
                            {(image=(Files.findOne({donation_id:name._id})).data)?(<img className="preview-image"src={URL.createObjectURL(new Blob([image]))}
                            onClick={()=>{setDonation_id(name._id);handleShow()}}/>):"Not found"}
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
                {donation_id?(<img className="modal-image" src={URL.createObjectURL(new Blob([(Files.findOne({donation_id:donation_id})).data]))}/>):null}
                </Modal.Body>
              </Modal>
              <Modal show={detailshow} onHide={handleDetailClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                {(donindex)?    
                (<table>
                    <tr>
                        <td align='right'>_id:</td>
                        <td>{donindex}</td>
                    </tr>
                    <tr>
                        <td align='right'>user_id:</td>
                        <td>{((DonationList.findOne({_id:donindex})).user_id)?((DonationList.findOne({_id:donindex})).user_id):('not found')}</td>
                    </tr>
                    <tr>
                        <td align='right'>donatdeat:</td>
                        <td>{(DonationList.findOne({_id:donindex})).donatedat}</td>
                    </tr>
                    <tr>
                        <td align='right'>username:</td>
                        <td>{(DonationList.findOne({_id:donindex})).username}</td>
                    </tr>
                    <tr>
                        <td align='right'>donor_name:</td>
                        <td>{(DonationList.findOne({_id:donindex})).donor_name}</td>
                    </tr>
                    <tr>
                        <td align='right'>medicine_name:</td>
                        <td>{(DonationList.findOne({_id:donindex})).medicine_name}</td>
                    </tr>
                    <tr>
                        <td align='right'>exp_date:</td>
                        <td>{(DonationList.findOne({_id:donindex})).exp_date}</td>
                    </tr>
                    <tr>
                        <td align='right'>verify_status:</td>
                        <td>{((DonationList.findOne({_id:donindex})).verify_status)?('true'):('false')}</td>
                    </tr>
                    <tr>
                        <td align='right'>status:</td>
                        <td>{(DonationList.findOne({_id:donindex})).status}</td>
                    </tr>
                    <tr>
                        <td align='right'>verified_by:</td>
                        <td>{(DonationList.findOne({_id:donindex})).verified_by}</td>
                    </tr>
                </table>):(null)
    }
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