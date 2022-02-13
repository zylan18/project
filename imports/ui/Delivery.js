import React, { useEffect, useState } from "react";
import { Nav, Spinner, Form, Button, Tab, Row, Col } from "react-bootstrap";
import { DonationList } from "../api/links";
import { Request } from "../api/links";

const Delivery = () => {
  const donation = DonationList.find({
    status: {
      $in: ["verified", "pickup in progress", "collected", "in transit"],
    },
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

  // Get the element with id="defaultOpen" and click on it
  if (Meteor.user()) {
    if(Meteor.user().profile.admin){
    useEffect(() => {
      document.getElementById("collect").click();
    }, []);
    const [status, handleStatus] = useState("");
    setCollectionStatus = (id) => {
      if (status != "") {
        DonationList.update(id, { $set: { status: status } });
        window.location.reload(false);
      } else {
        alert("select a status");
      }
    };
    setDeliveryStatus = (id) => {
      if (status != "") {
        Request.update(id, { $set: { status: status } });
        window.location.reload(false);
      } else {
        alert("select a status");
      }
    };

    return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Nav variant="pills">
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
                      <th width="100px">username</th>
                      <th width="100px">address</th>
                      <th width="100px">medicine name</th>
                      <th width="100px">status</th>
                      <th width="100px">set status</th>
                    </tr>
                    {donation.map((medicine, index) => (
                      <tr style={{ backgroundColor: "#dddddd" }}>
                        <td>{medicine.donor_name}</td>
                        <td>{medicine.username}</td>
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
                      <th width="100px">username</th>
                      <th width="100px">address</th>
                      <th width="100px">medicine name</th>
                      <th width="100px">status</th>
                      <th width="100px">set status</th>
                    </tr>
                    {request.map((medicine, index) => (
                      <tr style={{ backgroundColor: "#dddddd" }}>
                        <td>{medicine.requester_name}</td>
                        <td>{medicine.username}</td>
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
