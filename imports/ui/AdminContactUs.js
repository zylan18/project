import React, { useState } from 'react'
import {ContactUs} from '../api/links';
import {useTracker} from 'meteor/react-meteor-data';
import { Spinner,Alert,Button,Stack } from 'react-bootstrap';


const AdminContactUs = () => {
    if(Meteor.user()){
        if(Meteor.user().profile.role=='admin'){
    const isLoadingData = useTracker(()=>{
        const handle=Meteor.subscribe('contactus');//used useTracker to continuously check if subscribe is ready 
        return(!handle.ready());
        })
        const [reload,setReload]=useState(0);
        useState(()=>{

        },[reload]);
        if(!isLoadingData){   
            const contactUs= ContactUs.find({}).fetch().reverse();
            console.log(contactUs)
    return (
        <div className='admin-page'>
            <Stack direction="horizontal">
            <div className='ms-auto'>
                <Button onClick={()=>{setReload(reload+1)}}>&#x21bb;</Button>
            </div>
            </Stack>
            
            <table className='admin-table'>
                <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Phone</th>
                    <th>Message</th>
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