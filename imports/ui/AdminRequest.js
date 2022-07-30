import React,{useState,useEffect} from 'react'
import { Request } from '../api/Collections'
import { DonationList } from '../api/Collections';
import { useTracker } from 'meteor/react-meteor-data';
import {Alert,Modal,Spinner,Carousel,Row,Col,Form,Button,Accordion,OverlayTrigger,Popover,Stack} 
from 'react-bootstrap';
import {Files} from '../api/Collections';
import {GiConfirmed} from '@react-icons/all-files/gi/GiConfirmed';//to use icon
import {GiCancel} from '@react-icons/all-files/gi/GiCancel';
import {FaTrashAlt} from '@react-icons/all-files/fa/FaTrashAlt'
import { Link } from 'react-router-dom';


const AdminRequest = () => {
        if(Meteor.user()){
        if(Meteor.user().profile.role=='admin'){
            
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
            const handleuser=Meteor.subscribe('allUsers')
            return(!handle.ready()&&!handleuser.ready());
            })
        const isLoadingDonationData = useTracker(()=>{
            const handle=Meteor.subscribe('donationAdmin');//used useTracker to continuously check if subscribe is ready 
            return(!handle.ready());
            })    
    
        // const isLoadingImg = useTracker(()=>{
        //     const handle=Meteor.subscribe('requestAdminImages');
        //     return(!handle.ready());
        //     })

        useEffect(() => {
            if(!isLoadingData && !isLoadingDonationData){
                const reqname=Request.find({}).fetch().reverse()
                // for(i=0;i<reqname.length;i++){
                //     document.getElementById(`status${i}`).checked=reqname[i].edit;
                //     }
                }
            }, [reload]);

        var image;
        //console.log(reqname);
        if(!isLoadingData && !isLoadingDonationData){
            const reqname=(Request.find({},{fields:{}}).fetch()).reverse();
            console.log(reqname);
            setEditStatus=(id,status)=>{
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
            
            deleteRequest=(id)=>{
                if(confirm('Are you sure you want to delete request?')){
                    Meteor.call('deleteRequest',id,
                    (error,result)=>{
                        if(error){
                            alert('error deleting Request')
                        }else{
                            alert('deleted request successfully');
                            setReload(reload+1);
                        }
                    })
                }
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
                        var email=Meteor.users.findOne({username:(Request.findOne({_id:id})).username}).emails[0].address;
                        console.log(email);
                        var body=`<!DOCTYPE html>
                        <html lang="en">
                            <head> 
                                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                            </head>
                            <body>
                                <h3>Status update of your Request:</h3>
                                <h3>Medicine Name: ${(Request.findOne({_id:id})).medicine_name}</h3>
                                <h3>Request id: ${id}</h3>
                                <h3>status: ${(Request.findOne({_id:id})).status}</h3>
                            </body>
                        </html>`
                        Meteor.call(
                            'sendEmail',
                            `${(Request.findOne({_id:id})).username} <${email}>`,
                            'admin@sharemeds.com',
                            'Medicine Request status',
                            body
                        );
                            setReload(reload+1);
                        }
                    });
               
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
                        var email=Meteor.users.findOne({username:(Request.findOne({_id:id})).username}).emails[0].address;
                        console.log(email);
                        var body=`<!DOCTYPE html>
                        <html lang="en">
                            <head> 
                                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                            </head>
                            <body>
                                <h3>Status update of your Request:</h3>
                                <h3>Medicine Name: ${(Request.findOne({_id:id})).medicine_name}</h3>
                                <h3>Request id: ${id}</h3>
                                <h3 style="color:red">status: ${(Request.findOne({_id:id})).status}</h3>
                            </body>
                        </html>`
                        Meteor.call(
                            'sendEmail',
                            `${(Request.findOne({_id:id})).username} <${email}>`,
                            'admin@sharemeds.com',
                            'Medicine Request status',
                            body
                        );
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
                    case 'medname request':{
                        fieldindex=3;
                        break;
                    }
                    case 'requestername':{
                        fieldindex=2;
                        break;
                    }
                    case 'type request':{
                        fieldindex=4;
                        break;
                    }
        
                }
                let filter=document.getElementById(field).value.toUpperCase();
                let mytable=document.getElementById('table request');
                let tr=mytable.getElementsByTagName('tr');
                for(var i=0;i<tr.length;i++)
                {let td=tr[i].getElementsByTagName('td')[fieldindex];
                 if(td){
                        let textvalue=td.textContent || td.innerHTML;
                        console.log(textvalue)
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
            <Stack direction="horizontal" gap={5} className='search-row'>
              <div>
                <input type='text' id='medname request' className='form-control form-control-sm' 
                placeholder='search medicine name..' onKeyUp={()=>{search('medname request')}}/>
              </div>
              <div>
                <input type='text' id='requestername' className='form-control form-control-sm' 
                placeholder='search requester name..' onKeyUp={()=>{search('requestername')}}/>
              </div>
              <div>
              <Form.Select size="sm" id={`type request`} onChange={()=>{search('type request')}}>
                <option value=''>All</option>
                <option value='antipyretic'>antipyretic</option>
                <option value='antibiotic'>antibiotic</option>
                <option value='antiseptic'>antiseptic</option>
                <option value='analgesic'>analgesic</option>
                <option value='mood_stabilizer'>mood stabilizer</option>
                <option value='others'>others</option>
             </Form.Select>
              </div>
              <div className='ms-auto'>
                 <Button onClick={()=>{setReload(reload+1)}}>&#x21bb;</Button>
             </div>
            </Stack>
                <div className="table-scrollbar Flipped"> {/*used to flip the div to get horizontal scrollbar */}
                <div className='Flipped'> {/*used to flip back the table contents*/}
                    <table className="admin-table" id='table request'>
                        <tr>
                            <th width='50px'></th>
                            <th width="150px"></th>
                            <th width="100px">Requester Name</th>
                            <th width="100px">Medicine Name</th>
                            <th width='100px'>Medicine Type</th>
                            <th width="100px">Requested date</th>
                            <th width="100px">Expiry Date</th>
                            <th width="200px">Reason</th>
                            <th width="130px">Status</th>
                        </tr>
                        <tbody>
                    {
                    reqname.map((request,index) => (
                            <tr className={(verifyColor(request.verify_status))}>
                            <td>
                            <OverlayTrigger
                            trigger="click" key={index} placement='right' rootClose={true} //rootClose to close popover when cllicked outside
                            overlay={
                                <Popover id={`popoveroptionsrequest${index}`}>
                                <Popover.Header as="h3">
                                    <Row style={{'font-size':'12px'}}>
                                        <Col width='210px'>Set Edit</Col>
                                        <Col width="130px">Verify Status</Col>
                                        <Col width="100px">Verified by</Col>
                                        <Col width="100px">Verify</Col>
                                        <Col width="100px"></Col>
                                        <Col width="150px">Remarks</Col>
                                        <Col width='50px'></Col>
                                    </Row>
                                </Popover.Header>
                                    <Popover.Body>
                                     <Row>   
                                        <Col width='210px'>
                                            <Row>
                                                <Col >    
                                                    <Form.Check 
                                                    type="switch"
                                                    id={`status${index}`}
                                                    checked={request.edit}
                                                    label={(request.edit)?('Edit Enabled'):('Edit Disabled')}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Button variant='warning' onClick={()=>{setEditStatus(request._id,!request.edit)}}>
                                                     {(request.edit)?('disable'):('enable')}   
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col width="130px">
                                        <span className={"status-"+(verifyColor(request.verify_status))}>
                                        {(request.verify_status==true)?(<span style={verifyIcon}><GiConfirmed style={verifyIcon}/> Verified</span>)
                                        :(request.verify_status=="rejected")?(<span style={cancelIcon}><GiCancel style={cancelIcon}/> Rejected</span>)
                                        :("Not Verified")}
                                        </span>
                                        </Col>
                                        <Col width="100px">{request.verified_by}</Col>
                                        <Col width="100px">
                                            <button id={index} className={(verifyColor(!request.verify_status))} onClick={()=>{verify(request._id)}}>
                                                {(request.verify_status==true)?("Cancel")
                                                :(request.verify_status=="rejected")?("Cancel Rejection")
                                                :("Verify")}</button>
                                        </Col> 
                                        <Col width="100px" >   
                                            <button style={{"color":"red"}} onClick={()=>rejectVerification(request._id)}>Reject</button>
                                        </Col>
                                        <Col width="150px">
                                            <Row>
                                                <Col>
                                                    {(request.remark)?(request.remark):('no remarks yet')}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button className='btn-danger' onClick={()=>{setRequest_id(request._id);handleRemark(request.remark);handleRemarkShow()}}>Remark</Button>
                                                </Col>
                                            </Row>
                                            
                                        </Col> 
                                        <Col style={{'margin':'auto'}}>
                                    <Button variant='danger' onClick={()=>{deleteRequest(request._id)}}>
                                    <FaTrashAlt/>
                                    </Button>
                                </Col>
                                      </Row >
                                    </Popover.Body>
                                </Popover>
                            }>
                                <Button>&#9881;</Button>
                            </OverlayTrigger>
                            </td>
                            <td width="150px" className="image-table">
                            {(request.images.length == 1)?//it checks if one image is uploaded then display one image else display carousel
                            ((image=request.images)?
                            (<img className='preview-image' loading='lazy' src={URL.createObjectURL(new Blob([image[0]]))}
                            onClick={()=>{setRequest_id(request._id);handleShow()}}/>)
                            :"Not found")
                            :(<Carousel variant="dark">
                                        {(image=request.images)?
                                        ( image.map((img,index) => (
                                        <Carousel.Item>
                                        <img className='preview-image' loading='lazy' src={URL.createObjectURL(new Blob([img]))}
                                        onClick={()=>{setRequest_id(request._id);{console.log(request_id)};handleShow()}}/>
                                        </Carousel.Item>))):"Not found"
                                        }
                                </Carousel>)}
                            </td>
                            <td width='100px'>
                            <OverlayTrigger  key={index} placement='top' 
                             overlay={
                                <Popover id={`popover${index}`}>
                                <Popover.Header as="h3">User Details</Popover.Header>
                                <Popover.Body>
                                <Row style={{'color':'green'}}>
                                        <Col>name:</Col><Col>{request.requester_name}</Col>
                                    </Row>
                                    <Row style={{'color':'red'}}>
                                        <Col>Phone Number:</Col><Col>{request.phone}</Col>
                                    </Row>
                                    <Row style={{'color':'blue'}}>    
                                        <Col>Address:</Col><Col >{request.address}</Col>
                                    </Row>       
                                </Popover.Body>
                                </Popover>
                            }
                            >       
                               <p>{request.username}</p> 
                            </OverlayTrigger>       
                            </td>
                            {/* {console.log(medicine.donor_name)} */}
                            <td width='100px'>
                            <OverlayTrigger
                            
                            key={index}
                            placement='top'
                            overlay={
                                <Popover id={`popover${index}`}>
                                <Popover.Header as="h3">{request.medicine_name}</Popover.Header>
                                <Popover.Body>
                                    <Row style={{'color':'red'}}>
                                        <Col>Type:</Col><Col>{request.type}</Col>
                                    </Row>
                                    <Row style={{'color':'blue'}}>    
                                        <Col>Status:</Col><Col >{(DonationList.findOne({_id:request.donation_id})).status}</Col>
                                    </Row>   
                                    <Row style={{'color':'green'}}>
                                        <Col>Donor:</Col><Col>{(DonationList.findOne({_id:request.donation_id})).username}</Col>
                                    </Row>    
                                    
                                </Popover.Body>
                                </Popover>
                            }
                            >   
                                <Link to={`/donationstatus/${request.donation_id}`}>{request.medicine_name}</Link>
                            </OverlayTrigger>    
                            </td>
                            <td width='100px'>{request.type}</td>
                            <td width='100px'>{request.requestdate}</td>
                            <td width='100px'>{request.exp_date}</td>
                            <td width='200px'>{request.reason}</td>
                            <td width='130px' id={`medstatus${index}`}>{request.status}</td>
                         

                            
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
                                        {(image=(Request.findOne({_id:request_id})).images)?
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
