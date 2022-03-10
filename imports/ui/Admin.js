import React from 'react'
import AdminDonation from './AdminDonation'
import AdminRequest from './AdminRequest'
import Delivery from './Delivery'
import AdminContactUs from './AdminContactUs'
import AdminUsers from './AdminUsers'
import {Tabs,Tab} from 'react-bootstrap'


const Admin = () => {
  return (
    <div>
        <Tabs defaultActiveKey="donation"  className="justify-content-center">
            <Tab eventKey="donation" title="Donation">
                <AdminDonation />
            </Tab>
            <Tab eventKey="request" title="Request">
                <AdminRequest />
            </Tab>
            <Tab eventKey="delivery" title="Delivery">
                <Delivery/>
            </Tab>
            <Tab eventKey="contactus" title="ContactUs">
                <AdminContactUs/>
            </Tab>
            <Tab eventKey="users" title="Users">
                <AdminUsers/>
            </Tab>
        </Tabs>
    </div>
  )
}

export default Admin