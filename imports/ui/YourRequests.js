import React,{useState} from 'react';
import { Request } from '../api/links';
import {Alert,Spinner,Button,Modal,Carousel,} from 'react-bootstrap';
import {Files} from '../api/links';
import {useNavigate} from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
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
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    const [show, setShow] = useState(false);
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('yourRequests');//used useTracker to continuously check if subscribe is ready 
        return(!handle.ready());
        })

    const isLoadingImg=useTracker(()=>{
        const handle=Meteor.subscribe('yourRequestImages')
        return(!handle.ready());
    })    
    if(!isLoadingData && !isLoadingImg){
    const requestList=Request.find({username:(Meteor.user()).username},{fields:{}}).fetch();
        return (
            <div className="admin-page">
                <h1>Your Requests</h1>
                <table className="admin-table">
                    <tbody>
                    
                    <tr>
                        <th width='100px'></th>
                        <th width='100px'>Medicine Name</th>
                        <th width='100px'>Requested at</th> 
                        <th width='100px'>Status</th>
                        <th width='100px'>Remarks</th>
                        <th width='100px'></th>
                        <th width='75px'></th>
                      
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
                        <td>{request.remark}</td>
                        {/* {(request.status!='rejected' && request.status!='canceled')?(
                        <td>
                            <Button className="btn-danger" onClick={()=>cancelrequest(index)}>Cancel</Button>
                        </td>):null}  */}
                        <td><a href={`/requeststatus/${request._id}`}>click here for more details</a></td>
                        <td>{(request.edit)?(<Button onClick={()=>navigate(`/editrequest/${request._id}`)}>edit</Button>):(null)}</td>
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
    }else{
        return(<div>
            <Spinner className="spinner" animation="grow" variant="primary" 
           />
        </div>)
    }
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
