import React,{useState,useEffect} from 'react'
import { DonationList } from '../api/links'
import { useTracker } from 'meteor/react-meteor-data';
import {Alert,Modal,Spinner,Form,Row,Col,Button,Carousel,Accordion,OverlayTrigger,Popover} from 'react-bootstrap';
import {Files} from '../api/links';
import {GiConfirmed} from '@react-icons/all-files/gi/GiConfirmed';//to use icon
import {GiCancel} from '@react-icons/all-files/gi/GiCancel';

const AdminDonation = () => {
    if(Meteor.user()){
    if(Meteor.user().profile.admin){
    
    let verifyIcon = { color: "#26bd00"};//used to change color of icon
    let cancelIcon = { color: "#ff2222"};//used to change color of icon
    
    const [donation_id,setDonation_id]=useState('');
    const [status,handleStatus]=useState('');
    const [remark,handleRemark]=useState('');
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    
    const [donindex,setDonindex]=useState('');
    const [tableindex,setTableIndex]=useState('');
    const [brand,setBrand]=useState('');
    const [medtype,setMedType]=useState('');
    const [composition,setComposition]=useState('');
    const [reload,setReload]=useState(0);
    
    const [detailshow, setDetailShow] = useState(false);
    const handleDetailClose = () => setDetailShow(false);
    const handleDetailShow = () => {setDetailShow(true)};
    
    const [editmedshow, setEditMedShow] = useState(false);
    const handleEditMedClose = () => setEditMedShow(false);
    const handleEditMedShow = () => {setEditMedShow(true);}
    
    const [remarkshow,setRemarkShow]=useState(false);
    const handleRemarkClose = () => setRemarkShow(false);
    const handleRemarkShow = () => {setRemarkShow(true)};
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('donationAdmin');//used useTracker to continuously check if subscribe is ready 
        console.log('isLoadingData')
        return(!handle.ready());
        })

    const isLoadingImg = useTracker(()=>{
        const handle=Meteor.subscribe('donationAdminImages');
        return(!handle.ready());
        })

    

    useEffect(() => {
        if(!isLoadingData&&!isLoadingImg){
        console.log(reload);
        const donname=DonationList.find({},{fields:{}}).fetch();
        for(i=0;i<donname.length;i++){
            if('in collection'||'storage'||'in delivery'||'delivered'){
                document.getElementById(`status${i}`).checked=donname[i].edit;
                }
        }
    }
        }, [isLoadingImg,reload]);
    
    var image;
    if(!isLoadingData && !isLoadingImg){
        const donname=DonationList.find({},{fields:{}}).fetch();
        function verify(id){  
            const user=Meteor.user();
            // if(donname[index].verify_status == true){
            // DonationList.update(donname[index]._id,{$set:{verify_status:false}});
            // DonationList.update(donname[index]._id,{$set:{status:'not verified'}});
            // DonationList.update(donname[index]._id,{$set:{edit:true}});
            // console.log(donname[index].verify_status);
            // }
            // else if(donname[index].verify_status == "rejected"){
            //     DonationList.update(donname[index]._id,{$set:{verify_status:false}});
            //     DonationList.update(donname[index]._id,{$set:{status:'in verification'}});
            //     DonationList.update(donname[index]._id,{$set:{verify_status:false}});
            //     console.log(donname[index].verified_by);
            // }
            // else{
            //     DonationList.update(donname[index]._id,{$set:{verify_status:true}});
            //     DonationList.update(donname[index]._id,{$set:{status:'verified'}});
            //     DonationList.update(donname[index]._id,{$set:{edit:false}});
            //     console.log(donname[index].verified_by);
            // }
            Meteor.call('adminVerify',id,Meteor.user().username,
            (error,result)=>{
                if(error){
                    alert('error status not updated');
                }else{
                    alert(`verify status changed to ${(DonationList.findOne({_id:id})).status}`);
                    setReload(reload+1);
                }
            });
            
            console.log("update");
            // DonationList.update(donname[index]._id,{$set:{verified_by:user.username}});
            
        }
        function rejectVerification(id){
            const user=Meteor.user();
            Meteor.call('rejectVerification',id,Meteor.user().username,
            (error,result)=>{
                if(error){
                    alert('error status not updated');
                }else{
                    alert(`verify status changed to ${(DonationList.findOne({_id:id})).status}`);
                    setReload(reload+1);
                }
            });
            // DonationList.update(id,{$set:{verify_status:'rejected'}});
            // DonationList.update(id,{$set:{status:'rejected'}});
            
        }
        function verifyColor(t){
            if(t==true){
                return "verified";
            }
            else{
                return "not-verified"
            }
        }

        setRemark=(id)=>{
            // DonationList.update(id,{$set:{remark:remark,edit:true}});
            Meteor.call('setRemark',id,remark,
            (error,result)=>{
                if(error){
                    alert(`Error remark not changed`);
                }else{
                    alert(`remark changed to ${(DonationList.findOne({_id:id})).remark}`);
                    setReload(reload+1);
                    handleRemarkClose();
                }
            })
        }
        setEditStatus=(id)=>{
            // DonationList.update(id,{$set:{edit:status}});
            Meteor.call('setEditStatus',id,status,
            (error,result)=>{
                if(error){
                    alert('error edit status not updated');
                }else{
                    alert(`edit status changed to ${(DonationList.findOne({_id:id})).edit}`);
                    setReload(reload+1);
                }
            })
            console.log(donname)
            
        }
        setMedDetail=()=>{
                if(medtype!=''&& brand!='' && composition!=''){
                //DonationList.update(donation_id,{$set:{type:medtype,brand:brand,composition:composition}});
                Meteor.call('setMedDetail',donation_id,medtype,brand,composition,
                (error,result)=>{
                    console.log('meteor.call')
                    if(error){
                        alert('error medicine details not updated');
                    }else{
                        alert(`Medicine details updated to ${(DonationList.findOne({_id:donation_id})).type}
${(DonationList.findOne({_id:donation_id})).brand}\n${(DonationList.findOne({_id:donation_id})).composition}`);
                        setReload(reload+1);
                    }
                }
            );
                console.log(donname)
                handleEditMedClose();

                }
                else{
                alert('One or More Fields are empty');
                }
        }
       
        const search=(field)=>{
            var fieldindex;
            switch(field){
                case 'medname':{
                    fieldindex=3;
                    break;
                }
                case 'donorname':{
                    fieldindex=2;
                    break;
                }
                case 'type':{
                    fieldindex=4;
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
          <div className='row row-cols-lg-auto g-3 p-3 search-row'>
              <div className='col-12'>
                <input type='text' id='medname' className='form-control form-control-sm' 
                placeholder='search medicine name..' onKeyUp={()=>{search('medname')}}/>
              </div>
              <div className='col-12'>
                <input type='text' id='donorname' className='form-control form-control-sm' 
                placeholder='search donor name..' onKeyUp={()=>{search('donorname')}}/>
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
            
            <Accordion>
            {
            donname.map((name,index) => (
                <Accordion.Item eventKey={index} as='tr'>   
                <tr style={{'font-size':'12px'}}>
                    <th width='150px'></th>
                    <th width='120px'></th>
                    <th width='120px'>Donor Name</th>
                    {/* <th width="100px">Phone Number</th>
                    <th width="200px">Address</th> */}   
                    <th width='120px'>Medicine Name</th>
                    <th width='120px'>Medicine Type</th>
                    <th width='120px'>Medicine Brand</th>
                    <th width='120px'>Composition</th>
                    <th width='120px'>Expiry Date</th>
                    <th width='120px'>Status</th>
                </tr>
                <Accordion.Button as='tr' data-index={index} className={(verifyColor(name.verify_status))}>
                    
                     <td className="image-table" width='120px' >
                     {((Files.findOne({donation_id:name._id})).data.length == 1)?
                        ((image=(Files.findOne({donation_id:name._id})).data)?
                        (<img className='preview-image' loading='lazy' src={URL.createObjectURL(new Blob([image[0]]))}
                        onClick={()=>{setDonation_id(name._id);handleShow()}}/>)
                        :"Not found")
                        :(<Carousel variant="dark">
                                    {(image=(Files.findOne({donation_id:name._id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='preview-image' loading='lazy' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{setDonation_id(name._id);{console.log(donation_id)};handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                            </Carousel>)}
                    </td>
                    {/* {console.log(index)} */}
                    <td width='120px'><Button variant='info' onClick={()=>{setDonindex(name._id);handleDetailShow();}}>detail</Button></td>
                    <td width='120px'>
                    <OverlayTrigger trigger="hover" key={index} placement='top' 
                    overlay={
                                <Popover id={`popover${index}`}>
                                <Popover.Header as="h3">User Details</Popover.Header>
                                <Popover.Body>
                                    <Row style={{'color':'red'}}>
                                        <Col>Phone Number:</Col><Col>{name.phone}</Col>
                                    </Row>
                                    <Row style={{'color':'blue'}}>    
                                        <Col>Address:</Col><Col >{name.address}</Col>
                                    </Row>       
                                </Popover.Body>
                                </Popover>
                            }
                            >       
                        <p>{name.donor_name}</p>    
                    </OverlayTrigger>
                    </td >
                    {/* <td width='120px'>{name.phone}</td>
                    <td width='200px'>{name.address}</td> */}
                    {/* {console.log(name.donor_name)} */}
                    <td width='120px'>{name.medicine_name}</td>
                    <td width='120px'>{name.type}</td>
                    <td width='120px'>{name.brand}</td>
                    <td width='120px'>{name.composition}</td>
                    <td width='120px'>{name.exp_date}</td>
                    <td width='120px'>{name.status}</td>
                    </Accordion.Button>
                    <Accordion.Body>    
                    <tr style={{'font-size':'12px'}}>
                    <th width='150px'>Set Medicine detail</th>
                    <th width="210px">Set Edit</th>
                    <th width="130px">Verification Status</th>
                    <th width="100px">Verified by</th>
                    <th width="100px">Verify</th>
                    <th width="100px"></th>
                    <th width="150px"></th> 
                    </tr> 
                    {/* <table>  */}
                    <tr>               
                    <th style={{'padding':'0px'}} width='150px'>
                            <Button onClick={()=>{setDonation_id(name._id);setBrand(name.brand);setComposition(name.composition);setMedType(name.type);handleEditMedShow();}}>Edit</Button>
                    </th>
                    
                    <th width='210px'>{/*radio for edit status*/}
                        <tr>
                            <th>      
                                <Form.Check 
                                type="switch"
                                id={`status${index}`}
                                onChange={e=>{handleStatus(e.target.checked)}}
                                label={(name.edit)?('Disable Edit'):('Enable Edit')}
                                />
                            </th>
                            <th>
                                <Button variant='warning' onClick={()=>{setEditStatus(name._id)}}>set</Button>
                            </th>
                        </tr>
                    </th>
                    <th width='130px'>
                    <span className={"status "+(verifyColor(name.verify_status))}>
                    {(name.verify_status==true)?(<span style={verifyIcon}><GiConfirmed style={verifyIcon}/> Verified</span>)
                    :(name.verify_status=="rejected")?(<span style={cancelIcon}><GiCancel style={cancelIcon}/> Rejected</span>)
                    :("Not Verified")}
                    </span>
                    </th>
                    <th width='100px'>{name.verified_by}</th>
                    <th width='100px'>
                        <button id={index} className={(verifyColor(!name.verify_status))} onClick={()=>{verify(name._id)}}>
                            {(name.verify_status==true)?("Cancel")
                            :(name.verify_status=="rejected")?("Cancel Rejection")
                            :("Verify")}</button>
                    </th> 
                    <th width='100px'>   
                        <button style={{"color":"red"}} onClick={()=>rejectVerification(name._id)}>Reject</button>
                    </th> 
                    <th width='150px'>
                        {(name.remark)?(name.remark):('no remarks yet')}<br/>
                        <Button className='btn-danger' onClick={()=>{setDonation_id(name._id);handleRemark(name.remark);handleRemarkShow()}}>Remark</Button>
                    </th>
                    </tr>
                 {/* </table>    */}
                </Accordion.Body>
                </Accordion.Item>  
            )
         
        )
       
    }       </Accordion>
            </table>
            </div>
           </div> 
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                {donation_id?(<Carousel variant="dark">
                            {(image=(Files.findOne({donation_id:donation_id})).data)?
                            ( image.map((img,index) => (
                            <Carousel.Item>
                            <img className='admin-image' loading='lazy' src={URL.createObjectURL(new Blob([img]))}
                            />
                            </Carousel.Item>))):"Not found"
                            }
                    </Carousel> ):null}
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
                        <td align='right'>phone:</td>
                        <td>{(DonationList.findOne({_id:donindex})).phone}</td>
                    </tr>
                    <tr>
                        <td align='right'>address:</td>
                        <td>{(DonationList.findOne({_id:donindex})).address}</td>
                    </tr>
                    <tr>
                        <td align='right'>brand:</td>
                        <td>{(DonationList.findOne({_id:donindex})).brand}</td>
                    </tr>
                    <tr>
                        <td align='right'>composition:</td>
                        <td>{(DonationList.findOne({_id:donindex})).composition}</td>
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
                <Modal show={remarkshow} onHide={handleRemarkClose}>
                    <Modal.Header closeButton>  
                        Set Remark
                    </Modal.Header>
                    <Modal.Body>
                        <input type='text' onChange={e=>handleRemark(e.target.value)} value={remark} className='form-control'/>
                        <br/>
                        <Button className='btn-primary' onClick={()=>{setRemark(donation_id);console.log('click')}}>submit</Button>
                    </Modal.Body>
              </Modal>

              <Modal show={editmedshow} onHide={handleEditMedClose}>
                    <Modal.Header closeButton>  
                        Set Medicine Details
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-4 p-1'>
                                Medicine type:
                            </div>
                            <div className='col-8 p-1'>
                                        <Form.Select size="sm" id={`type${tableindex}`} value={medtype} 
                                        onChange={e=>setMedType(e.target.value)} style={{marginLeft:'-8px',width:'95%'}}>
                                            <option>select medicine type</option>
                                            <option value='antipyretic'>antipyretic</option>
                                            <option value='antibiotic'>antibiotic</option>
                                            <option value='antiseptic'>antiseptic</option>
                                            <option value='analgesic'>analgesic</option>
                                            <option value='mood_stabilizer'>mood stabilizer</option>
                                            <option value='others'>others</option>
                                        </Form.Select>
                                    </div>
                                <div className='row'> 
                                    <div className='col-4 p-1'>
                                       brand:
                                    </div>   
                                       <div className='col-8 p-1'>
                                           <input className='form-control form-control-sm' value={brand} onChange={e=>setBrand(e.target.value)}
                                        type='text'/>
                                        </div>
                                    </div>
                                <div className='row'> 
                                    <div className='col-4 p-1'>
                                        composition:
                                    </div>
                                     <div className='col-8 p-1'>
                                            <input className='form-control form-control-sm' value={composition} onChange={e=>setComposition(e.target.value)} 
                                            type='text'/>
                                        </div>
                                    <div className='p-1'>
                                <Button variant='warning' style={{'width':'100%'}} onClick={setMedDetail}>set</Button>
                            </div>
                                </div>
                        </div>
                    </Modal.Body>
              </Modal>
        </div>
        )
        }//if isLoading
        else{
            return(<div>
                <Spinner className="spinner" animation="grow" variant="primary" 
               />
            </div>)  
        }
    }//if admin 
    else{
        return(<div>you do not have permission to access this page</div>)
    }
}//is user
else if(Meteor.loggingIn()){
    return(<div>
        <Spinner className="spinner" animation="border" variant="primary" 
       />
    </div>)         
  }
  else{
    return(<Alert variant='warning'>You need to be logged in to continue</Alert>);
  }
}
export default AdminDonation