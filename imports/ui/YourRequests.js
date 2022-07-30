import React,{useState,useEffect} from 'react';
import { Request } from '../api/Collections';
import {Alert,Spinner,Button,Modal,Carousel,Toast,Placeholder,Row,Col} from 'react-bootstrap';
import {Files} from '../api/Collections';
import {useNavigate} from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import {MdWarning} from '@react-icons/all-files/md/MdWarning'
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
    const [limit, setlimit] = useState(3);
    const changeLimit = () => {
      setlimit(limit + 3);
      console.log(limit)
    };

    const navigate = useNavigate();

    const [showtoast, setShowToast] = useState([]);
    const handleAdd = (toast) => {
        const newtoast = showtoast.slice();
        newtoast.push(toast);
        setShowToast(newtoast);
      }
      
      const handleUpdate = (index, toast) => {
        const newtoast = [...showtoast];
        newtoast[index] = toast;
        console.log(showtoast);
        setShowToast(newtoast);
      }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)};
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('yourRequests');//used useTracker to continuously check if subscribe is ready 
        return(!handle.ready());
        })

    // const isLoadingImg=useTracker(()=>{
    //     const handle=Meteor.subscribe('yourRequestImages')
    //     return(!handle.ready());
    // }) 
    useEffect(()=>{
        if(!isLoadingData){
            const request=Request.find({username:(Meteor.user()).username},{fields:{}}).fetch().reverse();
            for(i=0;i<request.length;i++){
                handleAdd(true);
            }
        }
    },[isLoadingData])   
    if(!isLoadingData){
    const requestList=Request.find({username:(Meteor.user()).username},{fields:{}}).fetch().reverse();
        return (
            <div className="admin-page">
                <h1>Your Requests</h1>
                <div className='toast-notification'>
                {requestList.map((request,index) => (
                (request.remark)?
                        (<Toast show={showtoast[index]} position='top-center' onClose={()=>{handleUpdate(index,false);}}>
                            <Toast.Header>
                            <strong className="me-auto">Remarks on your request {request.medicine_name}</strong>
                            <small></small>
                            </Toast.Header>
                            <Toast.Body>{request.remark}&nbsp;<a href={`/editrequest/${request._id}`}>click here to edit</a></Toast.Body>
                        </Toast>)
                        :(null)))
                        }
                    </div>
                <table className="admin-table your-donation-table">
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
                        {(request.images.length == 1)?//it checks if one image is uploaded then display one image else display carousel
                        ((image=request.images)?
                        (<img loading='lazy' className='preview-image' src={URL.createObjectURL(new Blob([image[0]]))}
                        onClick={()=>{setRequest_id(request._id);handleShow()}}/>)
                        :"Not found")
                        :(<Carousel variant="dark">
                                    {(image=request.images)?
                                    ( image.map((img,index) => (
                                    <Carousel.Item>
                                    <img loading='lazy' className='preview-image' src={URL.createObjectURL(new Blob([img]))}
                                    onClick={()=>{setRequest_id(request._id);handleShow()}}/>
                                    </Carousel.Item>))):"Not found"
                                    }
                        </Carousel>)
                        }
                        </td>
                        <td className='medicine-detail'>{request.medicine_name}</td>
                        <td className='medicine-detail'>{request.requestdate}</td>
                       
                        <td className='medicine-detail'>{request.status}</td>
                        <td className='medicine-detail'>{(request.remark)?(request.remark):('no remarks yet')}</td>
                        
                        {/* {(request.status!='rejected' && request.status!='canceled')?(
                        <td>
                            <Button className="btn-danger" onClick={()=>cancelrequest(index)}>Cancel</Button>
                        </td>):null}  */}
                        <td>
                            <div className="d-flex justify-content-around">
                                <a className='link' onClick={()=>navigate(`/requeststatus/${request._id}`)}>click here for more details</a>
                            </div>
                        </td>
                        <td>{(request.edit)
                        ?(<div className="d-flex justify-content-around">
                        <Button onClick={()=>navigate(`/editrequest/${request._id}`)
                        }>edit</Button></div>):(null)}</td>
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
                            {(image=(Request.findOne({_id:request_id})).images)?
                            ( image.map((img,index) => (
                            <Carousel.Item>
                            <img loading='lazy' className='admin-image' src={URL.createObjectURL(new Blob([img]))}
                            />
                            </Carousel.Item>))):"Not found"
                            }
                </Carousel> ):null}
                </Modal.Body>
              </Modal>
              {(requestList.length < limit) ? null : (
            <div className="d-grid gap-2">
              <Button variant="outline-primary" size="sm" onClick={changeLimit}>
                Click here to load more
              </Button>
            </div>
          )}
            </div>
        )
    }else{//isLoading
        return(<div className='admin-page'>
            <h1>Your Requests</h1>
            <div  style={{'width':'98%','margin':'auto'}}>
            <Row className='your-table-header'>
                <Col style={{'padding':'8px'}} width='100px'></Col>
                <Col style={{'padding':'8px'}} width='100px'><b>Medicine Name</b></Col>
                <Col style={{'padding':'8px'}} width='100px'><b>Requested at</b></Col> 
                <Col style={{'padding':'8px'}} width='100px'><b>Status</b></Col>
                <Col style={{'padding':'8px'}} width='100px'><b>Remarks</b></Col>
                <Col style={{'padding':'8px'}} width='100px'></Col>
                <Col style={{'padding':'8px'}} width='75px'></Col>
            </Row>
            <Placeholder animation='glow'>
            <Row className="align-items-center" style={{'border':'1px solid #26bd00','border-radius':'5px','padding':'8px','background-color': '#cbfdbe'}}>
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder style={{'height':'100px'}}/>
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave' >
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col>
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col>
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} bg='primary'/>
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave'>
                    <div className="d-flex justify-content-around">
                        <Placeholder.Button xs={3} lg={6}/>
                     </div>   
                    </Placeholder>
                </Col>
            </Row>
            </Placeholder>
            <Placeholder animation='glow'>
            <Row className="align-items-center" style={{'border':'1px solid #ff2222','border-radius':'5px','padding':'8px','background-color': '#ffa0a0'}}>
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder style={{'height':'100px'}}/>
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave' >
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col>
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col>
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} bg='primary'/>
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave'>
                    <div className="d-flex justify-content-around">
                        <Placeholder.Button xs={3} lg={6}/>
                     </div>   
                    </Placeholder>
                </Col>
            </Row>
            </Placeholder>
            <Placeholder animation='glow'>
            <Row className="align-items-center" style={{'border':'1px solid #26bd00','border-radius':'5px','padding':'8px','background-color': '#cbfdbe'}}>
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder style={{'height':'100px'}}/>
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave' >
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col>
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} />
                    </Placeholder>
                </Col>
                <Col lg>
                    <Placeholder animation='wave'>
                        <Placeholder xs={12} bg='primary'/>
                    </Placeholder>
                </Col> 
                <Col lg>
                    <Placeholder animation='wave'>
                    <div className="d-flex justify-content-around">
                        <Placeholder.Button xs={3} lg={6}/>
                     </div>   
                    </Placeholder>
                </Col>
            </Row>
            </Placeholder>
        </div>
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
