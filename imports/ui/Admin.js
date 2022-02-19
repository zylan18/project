import React,{useState,useEffect} from 'react'
import { DonationList } from '../api/links'
import { useTracker } from 'meteor/react-meteor-data';
import {Alert,Modal,Spinner,Form,Row,Col,Button,Carousel} from 'react-bootstrap';
import {Files} from '../api/links';
import {GiConfirmed} from '@react-icons/all-files/gi/GiConfirmed';//to use icon
import {GiCancel} from '@react-icons/all-files/gi/GiCancel';
function verify(index){
    
    const user=Meteor.user();
    const donname=DonationList.find({},{fields:{}}).fetch();
    if(donname[index].verify_status == true){
    DonationList.update(donname[index]._id,{$set:{verify_status:false}});
    DonationList.update(donname[index]._id,{$set:{status:'not verified'}});
    DonationList.update(donname[index]._id,{$set:{edit:true}});
    console.log(donname[index].verify_status);
    }
    else if(donname[index].verify_status == "rejected"){
        DonationList.update(donname[index]._id,{$set:{verify_status:false}});
        DonationList.update(donname[index]._id,{$set:{status:'in verification'}});
        DonationList.update(donname[index]._id,{$set:{verify_status:false}});
        console.log(donname[index].verified_by);
    }
    else{
        DonationList.update(donname[index]._id,{$set:{verify_status:true}});
        DonationList.update(donname[index]._id,{$set:{status:'verified'}});
        DonationList.update(donname[index]._id,{$set:{edit:false}});
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
    if(Meteor.user().profile.admin){
    const donname=DonationList.find({},{fields:{}}).fetch();
    let verifyIcon = { color: "#26bd00"};//used to change color of icon
    let cancelIcon = { color: "#ff2222"};//used to change color of icon
    
    const [donation_id,setDonation_id]=useState('');
    const [status,handleStatus]=useState('');
    const [remark,handleRemark]=useState('');
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    
    const [donindex,setDonindex]=useState('');
    const [tableindex,setTableIndex]=useState('0');
    const [brand,setBrand]=useState('');
    const [type,setType]=useState('');
    const [composition,setComposition]=useState('');

    const [detailshow, setDetailShow] = useState(false);
    const handleDetailClose = () => setDetailShow(false);
    const handleDetailShow = () => {setDetailShow(true)};
    
    const [editmedshow, setEditMedShow] = useState(false);
    const handleEditMedClose = () => setEditMedShow(false);
    const handleEditMedShow = () => {setEditMedShow(true);}
    
    const [remarkshow,setRemarkShow]=useState(false);
    const handleRemarkClose = () => setRemarkShow(false);
    const handleRemarkShow = () => {setRemarkShow(true)};
    
    setRemark=(id)=>{
        DonationList.update(id,{$set:{remark:remark,edit:true}});
        console.log(donname);
        window.location.reload(false);
    }
    setStatus=(index)=>{
        DonationList.update(donname[index]._id,{$set:{edit:status}});
        console.log(donname)
        window.location.reload(false);
    }
    setMedDetail=()=>{
           
            if(type!=''&& brand!='' && composition!=''){
            DonationList.update(donation_id,{$set:{type:type,brand:brand,composition:composition}});
            console.log(donname)
            window.location.reload(false);//reload page
            }
            else{
            alert('One or More Fields are empty');
            }
    }
   
    const search=(field)=>{
        var fieldindex;
        switch(field){
            case 'medname':{
                fieldindex=5;
                break;
            }
            case 'donorname':{
                fieldindex=2;
                break;
            }
            case 'type':{
                fieldindex=6;
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

    useEffect(() => {
        console.log(donname.length)
        for(i=0;i<donname.length;i++){
            if('in collection'||'storage'||'in delivery'||'delivered'){
                document.getElementById(`status${i}`).checked=donname[i].edit;
                }
        }
        }, []);
    
    var image;
    //console.log(donname);
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
                                        </Form.Select>
              </div>

            </div>
          <div className="table-scrollbar Flipped"> {/*used to flip the div to get horizontal scrollbar */}
          <div className='Flipped'> {/*used to flip back the table contents*/}
            <table className="admin-table" id='table'>
                <tbody>
                <tr>
                    <th width="150px"></th>
                    <th width='100px'></th>
                    <th width="100px">Donor Name</th>
                    <th width="100px">Phone Number</th>
                    <th width="200px">Address</th>
                    <th width="100px">Medicine Name</th>
                    <th width="100px">Medicine Type</th>
                    <th width="100px">Medicine Brand</th>
                    <th width="150px">Composition</th>
                    <th width='100px'>Set Medicine detail</th>
                    <th width="100px">Expiry Date</th>
                    <th width="100px">Status</th>
                    <th width="210px">Set Edit</th>
                    <th width="130px">Verification Status</th>
                    <th width="100px">Verified by</th>
                    <th width="100px">Verify</th>
                    <th width="100px"></th>
                    <th width="150px"></th>
                </tr>
            {
            donname.map((name,index) => (
                
                <tr data-index={index}  className={(verifyColor(name.verify_status))}>
                     <td className="image-table">
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
                    <td><Button variant='info' onClick={()=>{setDonindex(name._id);handleDetailShow();}}>detail</Button></td>
                    <td>{name.donor_name}</td>
                    <td>{name.phone}</td>
                    <td>{name.address}</td>
                    {/* {console.log(name.donor_name)} */}
                    <td>{name.medicine_name}</td>
                    <td>{name.type}</td>
                    <td>{name.brand}</td>
                    <td>{name.composition}</td>
                    <td style={{'padding':'0px'}}>
                            <Button onClick={()=>{setBrand(name.brand);setComposition(name.composition);
                            setType(name.type);setDonation_id(name._id);handleEditMedShow();console.log(tableindex)}}>Edit</Button>
                    </td>
                    <td>{name.exp_date}</td>
                    <td>{name.status}</td>
                    <td>{/*select for status*/}
                        <tr>
                            <td>      
                                <Form.Check 
                                type="switch"
                                id={`status${index}`}
                                onChange={e=>{handleStatus(e.target.checked)}}
                                label={(name.edit)?('Disable Edit'):('Enable Edit')}
                                />
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
                    <td>
                        {(name.remark)?(name.remark):('no remarks yet')}<br/>
                        <Button className='btn-danger' onClick={()=>{setDonation_id(name._id);handleRemarkShow()}}>Remark</Button>
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
                        <input type='text' onChange={e=>handleRemark(e.target.value)} className='form-control'/>
                        <br/>
                        <Button className='btn-primary' onClick={()=>{setRemark(donindex);console.log('click')}}>submit</Button>
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
                                        <Form.Select size="sm" id={`type${tableindex}`} value={type} 
                                        onChange={e=>setType(e.target.value)} style={{'margin-left':'-8px','width':'95%'}}>
                                            <option>select medicine type</option>
                                            <option value='antipyretic'>antipyretic</option>
                                            <option value='antibiotic'>antibiotic</option>
                                            <option value='antiseptic'>antiseptic</option>
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
    }//if admin
    else{
        return(<div>you do not have permission to access this page</div>)
    }
}//if user
    else if(Meteor.loggingIn()){
        return(<div>
            <Spinner className="spinner" animation="border" variant="primary" 
           />
          
        </div>)         
      }
      else{
        return(<div>you do not have permission to access this page</div>)
    }
}
export default Admin