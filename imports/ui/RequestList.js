import React,{useState,useCallback} from 'react';
import {DonationList} from '../api/links'
import {Files} from '../api/links'
import {Spinner,Modal,Carousel} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom'
 

const Antipyretics = () => {
    const navigate = useNavigate();
    var med_id;//used to send medicine id to next page
    // const handleOnClick = useCallback(() => navigate(`/requestform/${med_id}`, {replace: true}), [navigate]);//used to send to /requestform/med_id
    const handleOnClick=()=>{
        navigate(`/requestform/${med_id}`)
    }

    const [show, setShow] = useState(false);
    const [donation_id,setDonation_id]=useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    if(Meteor.user()){
    let { type } = useParams();//used to get values from address bar
    var medicineList=DonationList.find({status:'storage',type:type},{fields:{}}).fetch();//used to fetch medicine in storage and of type antipyretic
    var image;
    return(
  <div className="form">
      <table className="admin-table">
                <tbody>
                <tr>
                    <th></th>
                    <th>Medicine Name</th>
                    <th>Expiry Date</th>
                    <th></th>
                </tr>
                {
            medicineList.map((medicine,index) => (
                <tr data-index={index} style={{backgroundColor:'#dddddd'}}>
                    <td className="image-table">
                    {((Files.findOne({donation_id:medicine._id})).data.length == 1)?//it checks if one image is uploaded then display one image else display carousel
                        ((image=(Files.findOne({donation_id:medicine._id})).data)?
                        (<img className='preview-image' src={URL.createObjectURL(new Blob([image[0]]))}
                        onClick={()=>{setDonation_id(medicine._id);handleShow()}}/>)
                        :"Not found")
                        :(<Carousel variant="dark">
                            {(image=(Files.findOne({donation_id:medicine._id})).data)?
                            ( image.map((img,index) => (
                            <Carousel.Item>
                            <img className='preview-image' src={URL.createObjectURL(new Blob([img]))}
                            onClick={()=>{setDonation_id(medicine._id);{console.log(donation_id)};handleShow()}}/>
                            </Carousel.Item>))):"Not found"
                            }
                    </Carousel>)}
                    </td>
                    <td>{medicine.medicine_name}</td>
                    <td>{medicine.exp_date}</td>
                    <td><button onClick={()=>{med_id=medicine._id;handleOnClick()}}>request</button></td>
                </tr>    
                
            )
            
        )
    }
            </tbody>
            </table>
            <Modal show={show} onHide={handleClose} size='lg'>
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
else if(Meteor.loggingIn()){
    return(<div>
        <Spinner className="spinner" animation="border" variant="primary" 
       />
      
    </div>)         
  }
  else{
      return(<div>You need to be logged in to continue</div>);
  }
}

export default Antipyretics;