import React,{useState} from 'react';
import { Request } from '../api/links';
import {Alert,Spinner,Button,Modal,Carousel,} from 'react-bootstrap';
import {Files} from '../api/links';

function verifyColor(t){
    if(t==true){
        return "verified";
    }
    else{
        return "not-verified"
    }
}

const YourRequests = () => {
    
    
    if(Meteor.user()){
        
    const [request_id,setRequest_id]=useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    const [show, setShow] = useState(false);
    const requestList=Request.find({username:(Meteor.user()).username},{fields:{}}).fetch();
        return (
            <div className="admin-page">
                <h1>Your Requests</h1>
                <table className="admin-table">
                    <tbody>
                    
                    <tr>
                        <th width='100'></th>
                        <th width='100'>Medicine Name</th>
                        <th width='100'>Requested at</th>
                       
                        <th width='100'>Status</th>
                      
                        <th width='100'></th>
                      
                    </tr>
                {requestList.map((request,index) => (
                    <tr data-index={index} className={(verifyColor(request.verify_status))}>
                        <td>
                        {((Files.findOne({request_id:request._id})).data.length == 1)?//it checks if one image is uploaded then display one image else display carousel
                        ((image=(Files.findOne({request_id:request._id})).data)?
                        (<img className='preview-image' src={URL.createObjectURL(new Blob([image[0]]))}
                        onClick={()=>{setRequest_id(request._id);handleShow()}}/>)
                        :"Not found")
                        :(<Carousel variant="dark">
                                    {(image=(Files.findOne({request_id:request._id})).data)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img className='preview-image' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{setRequest_id(request._id);handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                        </Carousel>)
                        }
                        </td>
                        <td>{request.medicine_name}</td>
                        <td>{request.requestdate}</td>
                       
                        <td>{request.status}</td>
                        
                        {/* {(request.status!='rejected' && request.status!='canceled')?(
                        <td>
                            <Button className="btn-danger" onClick={()=>cancelrequest(index)}>Cancel</Button>
                        </td>):null}  */}
                        <td><a href={`/requeststatus/${request._id}`}>click here for more details</a></td>
                    </tr>
                    )
                    )
                }
                </tbody>
                </table>
                <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                {request_id?
                (<Carousel variant="dark">
                            {(image=(Files.findOne({request_id:request_id})).data)?
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
        )
    }
    else if(Meteor.loggingIn()){
        return(<div>
            <Spinner className="spinner" animation="border" variant="primary" 
           />
        </div>)         
      }
      else{
            return(<div>
                <Alert variant="danger">Login to access this page. 
                If you have not registered then 
                <Alert.Link href="/register" variant="danger"> click here </Alert.Link>
                to register
                </Alert>
            </div>)
    }
}

export default YourRequests
