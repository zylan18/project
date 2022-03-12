import React, { useState,useEffect } from 'react'
import {useTracker} from 'meteor/react-meteor-data';
import { Spinner,Alert,Button,Stack } from 'react-bootstrap';
import {FaTrashAlt} from '@react-icons/all-files/fa/FaTrashAlt'

const AdminUsers = () => {
    if(Meteor.user()){
        if(Meteor.user().profile.role=='admin'){
        const isLoadingData = useTracker(()=>{
            const handle=Meteor.subscribe('allUsers');//used useTracker to continuously check if subscribe is ready 
            return(!handle.ready());
            });

        const [reload,setReload]=useState(0);

        useEffect(()=>{
            
            if(!isLoadingData){   
                const users= Meteor.users.find({}).fetch();
                console.log(users);
                for(i=0;i<users.length;i++){
                    console.log(users[i].profile.role)
                    document.getElementById(`role${i}`).value=users[i].profile.role;
                }
            }
        setRole=(id,role)=>{
            if(role!=''){
                Meteor.call('setRole',id,role,
                (error,result)=>{
                    if(error){
                        alert('Error in setting role');
                    }else{
                        alert(`Successfully changed role to ${role}`);
                        setReload(reload+1);
                    }
                });
            }else{
                alert('no role set');
            }
        }
        },[isLoadingData,reload])

        if(!isLoadingData){   
            const users= Meteor.users.find({}).fetch();
            //console.log(users)
        deleteUser=(id,admin)=>{
            if(confirm('Are your sure you want do delete')){
                if(!admin){
                    Meteor.call('deleteUser',id,
                    (error,result)=>{
                        if(error){
                            alert('could not delete user');
                        }else{
                            alert('deleted user successfully');
                            setReload(reload+1);
                        }
                    })
                }else{
                    alert('cannot delete admin user');
                }
            }
        
        }
        
    return (
        <div className='admin-page'>
            <Stack direction="horizontal">
            <div className='ms-auto'>
                <Button onClick={()=>{setReload(reload+1)}}>&#x21bb;</Button>
            </div>
            </Stack>
            <table className='admin-table'>
                <tr>
                    <th width='250px'></th>
                    
                    <th>username</th>
                    <th>Name</th>
                    <th>E-Mail</th>
                    <th>Phone</th>
                    <th>Address</th>
                </tr>
                <tbody>
                {users.map((user,index)=>(
                    <tr style={{'outline':'1px solid #aaa'}}>
                        <td>
                        <Stack direction='horizontal' gap={2}>
                            <div>
                            <Button size="sm" variant='danger' onClick={()=>{deleteUser(user._id,user.profile.role=='admin')}}><FaTrashAlt/></Button>
                            </div>
                            <div>  
                                <select
                                    id={`role${index}`}
                                >
                                    <option>select user role</option>
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                    <option value="delivery">delivery</option>
                                </select>
                              </div>
                              <div>
                                  <Button size="sm" onClick={()=>{setRole(user._id,document.getElementById(`role${index}`).value)}}>set</Button>
                              </div>
                        </Stack>
                        </td>
                        <td>{user.username}</td>
                        <td>{user.profile.name}</td>
                        <td>{user.profile.phone}</td>
                        <td style={{'word-wrap':'break-word'}}>{user.emails[0].address}</td>
                        <td style={{'word-wrap':'break-word'}}>{user.profile.address}</td>
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

export default AdminUsers