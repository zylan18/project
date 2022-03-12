import React,{useState,useCallback,useEffect} from 'react';
import {DonationList} from '../api/Collections'
import {Files} from '../api/Collections'
import {Spinner,Modal,Carousel,Alert,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {FaSearch} from '@react-icons/all-files/fa/FaSearch';//to use icon
import { useTracker} from 'meteor/react-meteor-data';
 
const RequestList = () => {
    if(Meteor.user()){
    let { type } = useParams();   
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('requestList',type);//used useTracker to continuously check if subscribe is ready 
        return(!handle.ready());
        })

    const isLoadingImg = useTracker(()=>{
        const handle=Meteor.subscribe('donationImages');
        return(!handle.ready());
        })

    const [show, setShow] = useState(false);
    const [donation_id,setDonation_id]=useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    const navigate = useNavigate();
    //used to get values from address bar
    //var medicineList=DonationList.find({status:'storage',type:type},{fields:{}}).fetch();
    //used to fetch medicine in storage and of type antipyretic
    const handleOnClick=()=>{
        navigate(`/requestform/${med_id}`);
    }
    //if checks if data is loaded added it after all hooks to maintain the amount of hooks called before if
    if(!isLoadingData&&!isLoadingImg){
        const medicineList=DonationList.find({type:type}).fetch();
        const search=()=>{
            let filter=document.getElementById('search').value.toUpperCase();
            let mytable=document.getElementById('table');
            let tr=mytable.getElementsByTagName('tr');
            for(var i=0;i<tr.length;i++){
                let td=tr[i].getElementsByTagName('td')[1];//medicine name
                let td1=tr[i].getElementsByTagName('td')[2];//brand
                let td2=tr[i].getElementsByTagName('td')[3];//composition
                if(td||td1){
                        let textvalue=(td1.textContent || td1.innerHTML)+(td.textContent||td.innerHTML)+(td2.textContent||td2.innerHTML);
                        //console.log(textvalue);
                        if(textvalue.toUpperCase().indexOf(filter)>-1)
                            {tr[i].style.display="";
                            }
                            else
                            {tr[i].style.display="none";
                            }
                        }
                    }
                }

        var med_id;//used to send medicine id to next page
        // const handleOnClick = useCallback(() => navigate(`/requestform/${med_id}`, {replace: true}), [navigate]);//used to send to /requestform/med_id
        if(medicineList.length==0){
            return(<Alert variant='warning'>No Medicine Available &nbsp; 
                    <Alert.Link href='/request'>click here to go back</Alert.Link></Alert>)
            }
            else{          
            return(
        <div className="form">
                <h1>List of Available Medicine</h1>
                <div className='row'>
                    <div className='col-10'>
                        <input type='text' id='search' className='form-control form-control-sm' 
                                    placeholder='search'/> 
                    </div>
                    <div className='col-2'>
                        <Button variant='warning' className='btn-sm' onClick={search}><FaSearch/></Button>    
                    </div>  
            </div>    

            <table className="admin-table request-table" id='table'>
                        <tbody>
                        <tr>
                            <th></th>
                            <th>Medicine Name</th>
                            <th>Brand</th>
                            <th>Composition</th>
                            <th>Expiry Date</th>
                            <th></th>
                        </tr>
                        {
                    medicineList.map((medicine,index) => (
                        <tr data-index={index} style={{backgroundColor:'#dddddd'}}>
                            <td className="image-table">
                            {((Files.findOne({donation_id:medicine._id})).data.length == 1)?//it checks if one image is uploaded then display one image else display carousel
                                ((image=(Files.findOne({donation_id:medicine._id})).data)?
                                (<img className='preview-image' loading='lazy' src={URL.createObjectURL(new Blob([image[0]]))}
                                onClick={()=>{setDonation_id(medicine._id);handleShow()}}/>)
                                :"Not found")
                                :(<Carousel variant="dark">
                                    {(image=(Files.findOne({donation_id:medicine._id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='preview-image' loading='lazy' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{setDonation_id(medicine._id);{console.log(donation_id)};handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                            </Carousel>)}
                            </td>
                            <td className='medicine-detail'>{medicine.medicine_name}</td>
                            <td className='medicine-detail'>{medicine.brand}</td>
                            <td className='medicine-detail'>{medicine.composition}</td>
                            <td className='medicine-detail'>{medicine.exp_date}</td>
                            <td><Button className='btn-primary request-button' onClick={()=>{med_id=medicine._id;handleOnClick()}}>request</Button></td>
                        </tr>    
                        
                    )
                    
                )
            }
                    </tbody>
                    </table>
                    <Modal show={show} onHide={handleClose} fullscreen>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                        {donation_id?(<Carousel variant="dark">
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
        );
    }
    }else{
        return(<div><Spinner className="spinner" animation="grow" variant="primary" 
        /></div>)
    } 
}
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

export default RequestList;
