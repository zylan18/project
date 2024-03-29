import React, { useEffect, useState } from "react";
import { Nav, Spinner, Form, Button, Tab, Row, Col,Stack } from "react-bootstrap";
import { DonationList } from "../api/Collections";
import { Request } from "../api/Collections";
import {useTracker} from 'meteor/react-meteor-data'

const Delivery = () => {

  // Get the element with id="defaultOpen" and click on it
  if (Meteor.user()) {
    if(Meteor.user().profile.role=='admin'||Meteor.user().profile.role=='delivery'){
    const [status, handleStatus] = useState("");
    const [reload,setReload]=useState(0);
    const isLoadingRequest = useTracker(()=>{
      const handle=Meteor.subscribe('requestDelivery');//used useTracker to continuously check if subscribe is ready 
      return(!handle.ready());
      })

    const isLoadingDonation = useTracker(()=>{
      const handle=Meteor.subscribe('donationDelivery');
      const handleuser=Meteor.subscribe('allUsers');
      return(!handle.ready()&&!handleuser.ready());
      })
    useEffect(() => {
      if(!isLoadingDonation && !isLoadingRequest){
      document.getElementById("collect").click();
      }
    }, [isLoadingRequest,reload]);

    if(!isLoadingDonation && !isLoadingRequest){
    setCollectionStatus = (id) => {
      if (status != "") {
        // DonationList.update(id, { $set: { status: status } });
        Meteor.call('setCollectionStatus',id,status,
        (error,result)=>{
          if(error){
            alert('Error collection status not updated');
          }else{
            alert(`status changed successfully to ${status}`)
            var email=Meteor.users.findOne({username:(DonationList.findOne({_id:id})).username}).emails[0].address;
                    console.log(email);
                    var body=`<!DOCTYPE html>
                    <html lang="en">
                    <head> 
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    </head>
                    <body>
                        <h3>Status update of your donation:</h3>
                        <h3>Medicine Name: ${(DonationList.findOne({_id:id})).medicine_name}</h3>
                        <h3>Donation id: ${id}</h3>
                        <h3>status: ${(DonationList.findOne({_id:id})).status}</h3>
                    </body>
                </html>`
                    Meteor.call(
                        'sendEmail',
                        `${(DonationList.findOne({_id:id})).username} <${email}>`,
                        'admin@sharemeds.com',
                        'Medicine Donation status',
                        body
                    );
            setReload(reload+1);
          }
        })
      } else {
        alert("select a status");
      }
    };
    setDeliveryStatus = (id) => {
      if (status != "") {
        // Request.update(id, { $set: { status: status } });
        Meteor.call('setDeliveryStatus',id,status,
        (error,result)=>{
          if(error){
            alert('Error delivery status not updated');
          }else{
            alert(`status changed successfully to ${status}`)
            var email=Meteor.users.findOne({username:(DonationList.findOne({_id:id})).username}).emails[0].address;
                    console.log(email);
                    var body=`<!DOCTYPE html>
                    <html lang="en">
                    <head> 
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    </head>
                    <body>
                        <h3>Status update of your donation:</h3>
                        <h3>Medicine Name: ${(DonationList.findOne({_id:id})).medicine_name}</h3>
                        <h3>Donation id: ${id}</h3>
                        <h3>status: ${(DonationList.findOne({_id:id})).status}</h3>
                    </body>
                </html>`
                    Meteor.call(
                        'sendEmail',
                        `${(DonationList.findOne({_id:id})).username} <${email}>`,
                        'admin@sharemeds.com',
                        'Medicine Donation status',
                        body
                    );
            setReload(reload+1);
          }
        })
      } else {
        alert("select a status");
      }
    };
    const donation = DonationList.find({
      status: {
        $in: ["verified", "pickup in progress", "collected", "in transit"],
      }
    }).fetch(); //this will get all items with status as in array
    const request = Request.find({
      status: {
        $in: [
          "verified",
          "dispatched",
          "in transit",
          "out for delivery",
          "delivered",
        ],
      },
    }).fetch();
    return (
      <div className={'admin-page'}>
        <Stack direction="horizontal">
            <div className='ms-auto'>
                <Button onClick={()=>{setReload(reload+1)}}>&#x21bb;</Button>
            </div>
            </Stack>
        <Tab.Container defaultActiveKey="first">
          <Nav variant="pills" className='justify-content-center' style={{'cursor':'pointer'}}>
            <Nav.Item>
              <Nav.Link eventKey="first">Collect</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Deliver</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div id="collect" className="tabelement collect">
                <table className="admin-table">
                  <tbody>
                    <tr>
                      <th width="100px">Donor Name</th>
                      <th width="100px">Phone</th>
                      <th width="100px">Address</th>
                      <th width="100px">Medicine Name</th>
                      <th width="100px">Status</th>
                      <th width="100px">Set Status</th>
                    </tr>
                    {donation.map((medicine, index) => (
                      <tr style={{ backgroundColor: "#dddddd" }}>
                        <td>{medicine.donor_name} / {medicine.username}</td>
                        <td>{medicine.phone}</td>
                        <td>{medicine.address}</td>
                        <td>{medicine.medicine_name}</td>
                        <td>{medicine.status}</td>
                        <td>
                          <tr>
                            <td>
                              <Form.Select
                                size="sm"
                                id={`type${index}`}
                                onChange={(e) => handleStatus(e.target.value)}
                              >
                                <option>select medicine type</option>
                                <option value="pickup in progress">
                                  collection in progress
                                </option>
                                <option value="collected">collected</option>
                                <option value="in transit">in transit</option>
                                <option value="storage">storage</option>
                              </Form.Select>
                            </td>
                            <td>
                              <Button
                                variant="warning"
                                onClick={() => {
                                  setCollectionStatus(medicine._id);
                                }}
                              >
                                set
                              </Button>
                            </td>
                          </tr>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div id="delivery" className="tabelement delivery">
                <table className="admin-table">
                  <tbody>
                    <tr>
                      <th width="100px">Requestee Name</th>
                      <th width="100px">Phone Number</th>
                      <th width="100px">Address</th>
                      <th width="100px">Medicine Name</th>
                      <th width="100px">Status</th>
                      <th width="100px">Set Status</th>
                    </tr>
                    {request.map((medicine, index) => (
                      <tr style={{ backgroundColor: "#dddddd" }}>
                        <td>{medicine.requester_name} / {medicine.username}</td>
                        <td>{medicine.phone}</td>
                        <td>{medicine.address}</td>
                        <td>{medicine.medicine_name}</td>
                        <td>{medicine.status}</td>
                        <td>
                          <tr>
                            <td>
                              <Form.Select
                                size="sm"
                                id={`type${index}`}
                                onChange={(e) => handleStatus(e.target.value)}
                              >
                                <option>select medicine type</option>
                                <option value="dispatched">dispatched</option>
                                <option value="in transit">in transit</option>
                                <option value="out for delivery">
                                  out for delivery
                                </option>
                                <option value="delivered">delivered</option>
                              </Form.Select>
                            </td>
                            <td>
                              <Button
                                variant="warning"
                                onClick={() => {
                                  setDeliveryStatus(medicine._id);
                                }}
                              >
                                set
                              </Button>
                            </td>
                          </tr>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  }else{
    return (
      <div>
        <Spinner className="spinner" animation="grow" variant="primary" />
      </div>
    );
}
}
  else{
    return(<div>You do not have permission to access this page</div>)
  }
  } else if (Meteor.loggingIn()) {
    return (
      <div>
        <Spinner className="spinner" animation="border" variant="primary" />
      </div>
    );
  }
  else{
    return(<div>You do not have permission to access this page</div>)
  }
};
export default Delivery;
