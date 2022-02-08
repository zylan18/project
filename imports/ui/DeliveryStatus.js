import React,{useEffect} from 'react';
import { DonationList } from '../api/links';
import {FaCheck} from '@react-icons/all-files/fa/FaCheck';
import { Spinner } from 'react-bootstrap';
const DeliveryStatus = () => {
    
    
 
 if(Meteor.user()){
    useEffect(()=>{
        const donation=DonationList.find({_id:'ti6EhbA6p4bBc6pW7'}).fetch()
        console.log(donation[0])
        switch(donation[0].status){
            case 'pickup in progress':{
                document.getElementById("pick-up").classList.add('current');
                break;
            }
            case 'collected':{
                document.getElementById("pick-up").classList.add('is-done');
                document.getElementById("collected").classList.add('current');
                  
                break;
            }
            case 'in transit':{
                document.getElementById("pick-up").classList.add('is-done');
                document.getElementById("collected").classList.add('is-done');
                document.getElementById("in-transit").classList.add('current');  
                break;
            }
            case 'storage':{
                document.getElementById("pick-up").classList.add('is-done');
                document.getElementById("collected").classList.add('is-done');
                document.getElementById("in-transit").classList.add('is-done');  
                document.getElementById("storage").classList.add('is-done');  
                break;
            }

        }
    },[])
  return( 
  <div>
        <div class="delivery-progress">
            <ul class="StepProgress">
                <li id='pick-up' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>Pick Up in progress</strong>
                    </div>
                </li>
                <li id='collected' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>Collected</strong>
                    </div>   
                </li>
                <li id ='in-transit' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>In Transit</strong>
                    </div>    
                </li>
                <li id='storage' class="StepProgress-item">
                    <div className='progress-text'>
                        <strong>Sucessfully Donated</strong>
                    </div>    
                </li>
            </ul>
        </div>
    </div>
  );//return
 }
 else if(Meteor.loggingIn()){
    return(<div>
        <Spinner className="spinner" animation="border" variant="primary" />
    </div>)         
  } 
};

export default DeliveryStatus;
