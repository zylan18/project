import React,{useState,useEffect} from 'react'
import { Request } from '../api/links'
import { DonationList } from '../api/links';
import { useTracker } from 'meteor/react-meteor-data';
import {Alert,Modal,Spinner,Carousel,Row,Col,Form,Button,Accordion,OverlayTrigger,Popover} from 'react-bootstrap';
import {Files} from '../api/links';
import {GiConfirmed} from '@react-icons/all-files/gi/GiConfirmed';//to use icon
import {GiCancel} from '@react-icons/all-files/gi/GiCancel';



const AdminRequest = () => {
        if(Meteor.user()){
        if(Meteor.user().profile.admin){
            
        let verifyIcon = { color: "#26bd00"};//used to change color of icon
        let cancelIcon = { color: "#ff2222"};//used to change color of icon
        
        const [request_id,setRequest_id]=useState('');
        const [status,handleStatus]=useState('');
        const [remark,handleRemark]=useState('');
        const [reload,setReload]=useState(0);

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => {setShow(true)};

        const [remarkshow,setRemarkShow]=useState(false);
        const handleRemarkClose = () => setRemarkShow(false);
        const handleRemarkShow = () => {setRemarkShow(true)};
        
        const isLoadingData = useTracker(()=>{
            const handle=Meteor.subscribe('requestAdmin');//used useTracker to continuously check if subscribe is ready 
            return(!handle.ready());
            })
        const isLoadingDonationData = useTracker(()=>{
            const handle=Meteor.subscribe('donationAdmin');//used useTracker to continuously check if subscribe is ready 
            return(!handle.ready());
            })    
    
        const isLoadingImg = useTracker(()=>{
            const handle=Meteor.subscribe('requestAdminImages');
            return(!handle.ready());
            })

        useEffect(() => {
            if(!isLoadingData && !isLoadingImg && !isLoadingDonationData){
                const reqname=Request.find({}).fetch()
                for(i=0;i<reqname.length;i++){
                    document.getElementById(`status${i}`).checked=reqname[i].edit;
                    }
                }
            }, [isLoadingImg,reload]);

        var image;
        //console.log(reqname);
        if(!isLoadingData && !isLoadingImg && !isLoadingDonationData){
            const reqname=Request.find({},{fields:{}}).fetch();
            setEditStatus=(id)=>{
                // Request.update(id,{$set:{edit:status}});
                Meteor.call('setRequestEditStatus',id,status,
                (error,result)=>{
                if(error){
                    alert('error edit status not updated');
                }else{
                    alert(`edit status changed to ${(Request.findOne({_id:id})).edit}`);
                    setReload(reload+1);
                }
            });
            }
    
            setRemark=(id)=>{
                // Request.update(id,{$set:{remark:remark,edit:true}});
                Meteor.call('setRequestRemark',id,remark,
                (error,result)=>{
                if(error){
                    alert('error remark not updated');
                }else{
                    alert(`remark changed to ${(Request.findOne({_id:id})).remark}`);
                    setReload(reload+1);
                }
            });
                handleRemarkClose();
               
            }
            function verify(id){
                const user=Meteor.user();
                Meteor.call('adminRequestVerify',id,user.username,
                (error,result)=>{
                    if(error){
                        alert('error status not updated');
                    }else{
                        alert(`verify status changed to ${(Request.findOne({_id:id})).status}`);
                        setReload(reload+1);
                    }
                });
                // if(reqname[index].verify_status == true){
                // Request.update(reqname[index]._id,{$set:{verify_status:false}});
                // Request.update(reqname[index]._id,{$set:{status:'not verified'}});
                // Request.update(reqname[index]._id,{$set:{edit:true}});
                // DonationList.update(reqname[index].donation_id,{$set:{status:'storage'}})
                // console.log(reqname[index].verify_status);
                // }
                // else if(reqname[index].verify_status == "rejected"){
                //     Request.update(reqname[index]._id,{$set:{verify_status:false}});
                //     Request.update(reqname[index]._id,{$set:{status:'in verification'}});
                //     Request.update(reqname[index]._id,{$set:{edit:true}});
                //     console.log(reqname[index].verified_by);
                // }
                // else{
                //     Request.update(reqname[index]._id,{$set:{verify_status:true}});
                //     Request.update(reqname[index]._id,{$set:{status:'verified'}});
                //     Request.update(reqname[index]._id,{$set:{edit:false}});
                //     DonationList.update(reqname[index].donation_id,{$set:{status:'request verified'}})
                //     console.log(reqname[index].verified_by);
                // }
                console.log("update");
               
            }
            function rejectVerification(id){
                const user=Meteor.user();
                Meteor.call('rejectRequestVerification',id,
                (error,result)=>{
                    if(error){
                        alert('error status not updated');
                    }else{
                        alert(`verify status changed to ${(Request.findOne({_id:id})).status}`);
                        setReload(reload+1);
                    }
                })
                // Request.update(reqname[index]._id,{$set:{verify_status:'rejected'}});
                // Request.update(reqname[index]._id,{$set:{status:'rejected'}});
            }
            function verifyColor(t){
                if(t==true){
                    return "verified";
                }
                else{
                    return "not-verified"
                }
            }
            const search=(field)=>{
                var fieldindex;
                switch(field){
                    case 'medname':{
                        fieldindex=2;
                        break;
                    }
                    case 'requestername':{
                        fieldindex=1;
                        break;
                    }
                    case 'type':{
                        fieldindex=3;
                        break;
                    }
        
                }
                let filter=document.getElementById(field).value.toUpperCase();
                let mytable=document.getElementById('table');
                let tr=mytable.getElementsByTagName('tr');
                for(var i=0;i<tr.length;i++)
                {let td=tr[i].getElementsByTagName('td')[fieldindex];
                 if(td){
                        let textvalue=td.textContent || td.innerHTML;
                        if(textvalue.toUpperCase().indexOf(filter)>-1)
                            {tr[i].style.display="";
                            }
                            else
                            {tr[i].style.display="none";
                            }
                        }
                }
            }
            return (
                <div className='admin-page'>
                    <div className='row row-cols-lg-auto g-3 p-3 search-row'>
              <div className='col-12'>
                <input type='text' id='medname' className='form-control form-control-sm' 
                placeholder='search medicine name..' onKeyUp={()=>{search('medname')}}/>
              </div>
              <div className='col-12'>
                <input type='text' id='requestername' className='form-control form-control-sm' 
                placeholder='search requester name..' onKeyUp={()=>{search('requestername')}}/>
              </div>
              <div className='col-12'>
              <Form.Select size="sm" id={`type`} onChange={()=>{search('type')}}>
                <option value=''>All</option>
                <option value='antipyretic'>antipyretic</option>
                <option value='antibiotic'>antibiotic</option>
                <option value='antiseptic'>antiseptic</option>
                <option value='analgesic'>analgesic</option>
                <option value='mood_stabilizer'>mood stabilizer</option>
                <option value='others'>others</option>
             </Form.Select>
              </div>

            </div>
                <div className="table-scrollbar Flipped"> {/*used to flip the div to get horizontal scrollbar */}
                <div className='Flipped'> {/*used to flip back the table contents*/}
                    <table className="admin-table" id='table'>
                        <tbody>
                        <tr>
                            <th width="150px"></th>
                            <th width="100px">Requester Name</th>
                            <th width="100px">Medicine Name</th>
                            <th width='100px'>Medicine Type</th>
                            <th width="100px">Requested date</th>
                            <th width="100px">Expiry Date</th>
                            <th width="200px">Reason</th>
                            <th width="250px">Address</th>
                            <th width="130px">Status</th>
                        </tr>
                        <Accordion>
                    {
                    reqname.map((medicine,index) => (
                        <Accordion.Item as='tr' eventKey={index} >
                            <Accordion.Button as='div' data-index={index} className={(verifyColor(medicine.verify_status))}>
                            {/* {console.log(index)} */}
                            <td width="150px" className="image-table">
                            {((Files.findOne({request_id:medicine._id})).data.length == 1)?//it checks if one image is uploaded then display one image else display carousel
                            ((image=(Files.findOne({request_id:medicine._id})).data)?
                            (<img className='preview-image' loading='lazy' src={URL.createObjectURL(new Blob([image[0]]))}
                            onClick={()=>{setRequest_id(medicine._id);handleShow()}}/>)
                            :"Not found")
                            :(<Carousel variant="dark">
                                        {(image=(Files.findOne({request_id:medicine._id})).data)?
                                        ( image.map((img,index) => (
                                        <Carousel.Item>
                                        <img className='preview-image' loading='lazy' src={URL.createObjectURL(new Blob([img]))}
                                        onClick={()=>{setRequest_id(medicine._id);{console.log(request_id)};handleShow()}}/>
                                        </Carousel.Item>))):"Not found"
                                        }
                                </Carousel>)}
                            </td>
                            <td width='100px'>{medicine.requester_name} / {medicine.username}</td>
                            {/* {console.log(medicine.donor_name)} */}
                            <td width='100px'>
                            <OverlayTrigger
                            trigger="hover"
                            key={index}
                            placement='top'
                            overlay={
                                <Popover id={`popover${index}`}>
                                <Popover.Header as="h3">{medicine.medicine_name}</Popover.Header>
                                <Popover.Body>
                                    <Row style={{'color':'red'}}>
                                        <Col>Type:</Col><Col>{medicine.type}</Col>
                                    </Row>
                                    <Row style={{'color':'blue'}}>    
                                        <Col>Status:</Col><Col >{(DonationList.findOne({_id:medicine.donation_id})).status}</Col>
                                    </Row>   
                                    <Row style={{'color':'green'}}>
                                        <Col>Donor:</Col><Col>{(DonationList.findOne({_id:medicine.donation_id})).username}</Col>
                                    </Row>    
                                    
                                </Popover.Body>
                                </Popover>
                            }
                            >   
                                <a href={`/donationstatus/${medicine.donation_id}`}>{medicine.medicine_name}</a>
                            </OverlayTrigger>    
                            </td>
                            <td width='100px'>{medicine.type}</td>
                            <td width='100px'>{medicine.requestdate}</td>
                            <td width='100px'>{medicine.exp_date}</td>
                            <td width='200px'>{medicine.reason}</td>
                            <td width='250px'>{medicine.address}</td>
                            <td width='130px' id={`medstatus${index}`}>{medicine.status}</td>
                            </Accordion.Button>
                            <Accordion.Body>
                                <tr>
                                <th width='210px'>Set Edit</th>
                                <th width="130px">Verify Status</th>
                                <th width="100px">Verified by</th>
                                <th width="100px">Verify</th>
                                <th width="100px"></th>
                                <th width="150px">Remarks</th>
                                </tr>
                            <th width='210px'>
                                <tr>
                                <th >    
                                    <Form.Check 
                                    type="switch"
                                    id={`status${index}`}
                                    onChange={e=>{handleStatus(e.target.checked)}}
                                    label={(medicine.edit)?('Disable Edit'):('Enable Edit')}
                                    />
                                </th>
                                    <th>
                                        <Button variant='warning' onClick={()=>{setEditStatus(medicine._id)}}>set</Button>
                                    </th>
                                </tr>
                            </th>
                            <th width="130px">
                            <span className={"status "+(verifyColor(medicine.verify_status))}>
                            {(medicine.verify_status==true)?(<span style={verifyIcon}><GiConfirmed style={verifyIcon}/> Verified</span>)
                            :(medicine.verify_status=="rejected")?(<span style={cancelIcon}><GiCancel style={cancelIcon}/> Rejected</span>)
                            :("Not Verified")}
                            </span>
                            </th>
                            <th width="100px">{medicine.verified_by}</th>
                            <th width="100px">
                                <button id={index} className={(verifyColor(!medicine.verify_status))} onClick={()=>{verify(medicine._id)}}>
                                    {(medicine.verify_status==true)?("Cancel")
                                    :(medicine.verify_status=="rejected")?("Cancel Rejection")
                                    :("Verify")}</button>
                            </th> 
                            <th width="100px" >   
                                <button style={{"color":"red"}} onClick={()=>rejectVerification(medicine._id)}>Reject</button>
                            </th>
                            <th width="150px">
                                <tr>
                                    <th>
                                        {(medicine.remark)?(medicine.remark):('no remarks yet')}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        <Button className='btn-danger' onClick={()=>{setRequest_id(medicine._id);handleRemark(medicine.remark);handleRemarkShow()}}>Remark</Button>
                                    </th>
                                </tr>
                                
                            </th> 
                          </Accordion.Body>  
                        </Accordion.Item>
                        
                    )
                    
                )
                
            }
            </Accordion>
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
                                        <img className='admin-image' loading='lazy' src={URL.createObjectURL(new Blob([img]))}
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
                            <input type='text' value={remark} onChange={e=>handleRemark(e.target.value)} className='form-control'/>
                            <br/>
                            <Button onClick={()=>handleRemark('')}>Clear</Button><Button className='btn-primary' onClick={()=>{setRemark(request_id);console.log('click')}}>submit</Button>
                        </Modal.Body>
                </Modal>
                </div>)
        }//if isLoading
        else{
            return(<div>
                <Spinner className="spinner" animation="grow" variant="primary" 
               />
            </div>)
        }
        }//if admin
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
