import React,{useEffect} from 'react';
import { Nav,Spinner } from 'react-bootstrap';
import { DonationList } from '../api/links';
import { Request } from '../api/links';

 const Delivery = () => {
    const donation=DonationList.find({status:'verified'}).fetch()
    const request=Request.find({status:'verified'}).fetch()
      
      // Get the element with id="defaultOpen" and click on it
    if(Meteor.user()){
        useEffect(()=>{
            document.getElementById("collect").click();
        },[])
        return (
        <div>
            <Nav variant="tabs">
            <Nav.Item>
                <Nav.Link id='collect' eventKey='collect' onClick={()=>{openPage('collect')}}>Collect</Nav.Link>{/*added eventKey only for active highlight to work*/}
            </Nav.Item>
            <Nav.Item>
                <Nav.Link id='delivery' eventKey='delivery' onClick={()=>{openPage('delivery')}}>Delivery</Nav.Link>
            </Nav.Item>
            </Nav>
            <div id='collect' className='tabelement collect'>
                <table>
                    <tbody>
                        <tr>
                            <th>Donor Name</th>
                            <th>username</th>
                            <th>address</th>
                            <th>medicine name</th>
                            <th>status</th>
                        </tr>
                            {donation.map((medicine,index)=>(
                                        <tr>
                                            <td>
                                                {medicine.donor_name}
                                            </td>
                                            <td>
                                                {medicine.username}
                                            </td>
                                            <td>
                                                {medicine.address}
                                            </td>
                                            <td>
                                                {medicine.status}
                                            </td>
                                        </tr>    
                                    )
                                )
                            }
                    </tbody>
                </table>
            </div>
            
            <div id='delivery' className='tabelement delivery'>
                <table>
                    <tbody>
                        <tr>
                            <th>Requestee Name</th>
                            <th>username</th>
                            <th>address</th>
                            <th>medicine name</th>
                            <th>status</th>
                        </tr>
                        {request.map((medicine,index)=>(
                                        <tr>
                                            <td>
                                                {medicine.requester_name}
                                            </td>
                                            <td>
                                                {medicine.username}
                                            </td>
                                            <td>
                                                {medicine.address}
                                            </td>
                                            <td>
                                                {medicine.status}
                                            </td>
                                        </tr>    
                                    )
                                )
                        }   
                        
                    </tbody>
                </table>
            </div>
        </div>
        );
        function openPage(pageName) {
            const tabelement=document.getElementsByClassName('tabelement');
            var i;
            for(i=0;i<tabelement.length;i++){
                tabelement[i].style.display='none';
            }
            document.getElementsByClassName(pageName)[0].style.display='block';//used [0] as getElementByClassName returns as array
               
          }
    }
    else if(Meteor.loggingIn()){
        return(<div>
            <Spinner className="spinner" animation="border" variant="primary" />
        </div>)         
      } 
};
export default Delivery;