import React from 'react'
import {ContactUs} from '../api/links';
import {useTracker} from 'meteor/react-meteor-data';
import { Spinner,Alert } from 'react-bootstrap';


const AdminContactUs = () => {
    if(Meteor.user()){
        if(Meteor.user().profile.admin){
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('contactus');//used useTracker to continuously check if subscribe is ready 
        
        return(!handle.ready());
        })
        if(!isLoadingData){   
            const contactUs= ContactUs.find({}).fetch();
            console.log(contactUs)
    return (
        <div className='admin-page'>
            <table className='admin-table'>
                <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Phone</th>
                    <td>Message</td>
                </tr>
                <tbody>
                {contactUs.map((contact,index)=>(
                    <tr>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.message}</td>
                    </tr>
                )
                )

                }
                </tbody>
            </table>
        </div>
    )
    }else{
        return(<div>
            <Spinner className="spinner" animation="grow" variant="primary" 
           />
        </div>)  
    }
   
    
 } else{
    return(<div>you do not have permission to access this page</div>)
}
 
}else if(Meteor.loggingIn()){
    return(<div>
        <Spinner className="spinner" animation="border" variant="primary" 
       />
    </div>)         
  }
else{
        return(<Alert variant='warning'>You need to be logged in to continue</Alert>);
      }
}

export default AdminContactUs