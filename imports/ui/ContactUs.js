import React,{useState} from 'react';
import '../../client/main.scss'
import {FaInstagram} from '@react-icons/all-files/fa/FaInstagram'
import {FaFacebookSquare} from '@react-icons/all-files/fa/FaFacebookSquare'
import {FaTwitterSquare} from '@react-icons/all-files/fa/FaTwitterSquare'

const ContactUs = () => {
  const [email,handleEmail]=useState('');
  const [name,handleName]=useState('');
  const [phone,handlePhone]=useState('');
  const [message,handleMessage]=useState('');
  handleSubmit=()=>{
    Meteor.call('contactUsSubmit',name,email,phone,message,
    (error,result)=>{
      if(error){
        alert('Error Not Submitted')
      }
      else{
        alert('submitted Successfully')
      }
    })
  }
  return(
        //  <div className='about-us'><h1>About Us!!!</h1>
        //  <div className='aboutus-title'><h1>Support our work</h1></div>
        //  </div>
        <div className='contact-title'><h1>Contact us</h1>
         <div class="container-contact">
           <span class="big-circle"></span>
           <img src="/images/shape.png" class="square" alt="" />
           <div class="form-contact">
             <div class="contact-info">
               <h3 class="title">Let's get in touch</h3>
               <p class="text">
               We’d love to connect with anyone interested in learning more about our work. Simply fill out the form below.
               </p>
     
               <div class="info">
                 <div class="information">
                   <img src="/images/location.png" class="icon" alt="" />
                   <p>SIES College of Arts, Science and Commerce, Jain Society, Sion West, Mumbai 400 022</p>
                 </div>
                 <div class="information">
                   <img src="/images/email.png" class="icon" alt="" />
                   <p>example.com</p>
                 </div>
                 <div class="information">
                   <img src="/images/phone.png" class="icon" alt="" />
                   <p>000000000</p>
                 </div>
               </div>
     
               <div class="social-media">
                 <p>Connect with us :</p>
                 <div className="social-icons">
                   <a href="#">
                     <FaFacebookSquare/>
                   </a>
                   <a href="#">
                   <FaTwitterSquare/>
                   </a>
                   <a href="#">
                     <FaInstagram/>
                   </a>
                   
                 </div>
               </div>
             </div>
     
             <div class="contact-form">
               <span class="circle one"></span>
               <span class="circle two"></span>
     
               <form className='contact-formtag' onSubmit={handleSubmit}  autocomplete="off">
                 <h3 class="title">Contact us</h3>
                 <div class="input-container focus">
                   <input type="text" value={name} name="name" class="input" required onChange={e=>handleName(e.target.value)} />
                   <label for="">Username</label>
                   <span>Username</span>
                 </div>
                 <div class="input-container focus">
                   <input type="email" value={email} name="email" class="input" required onChange={e=>handleEmail(e.target.value)} />
                   <label for="">Email</label>
                   <span>Email</span>
                 </div>
                 <div class="input-container focus">
                   <input type="tel" value={phone} name="phone" class="input" required onChange={e=>handlePhone(e.target.value)} />
                   <label for="">Phone</label>
                   <span>Phone</span>
                 </div>
                 <div class="input-container textarea focus">
                   <textarea value={message} name="message" class="input" required onChange={e=>handleMessage(e.target.value)}></textarea>
                   <label for="">Message</label>
                   <span>Message</span>
                 </div>
                 <input type="submit" value="Send" class="btn-contact" />
               </form>
             </div>
           </div>
         </div>
         <div>
           <h1>Locations</h1>
           <p className='location-text'>SIES College of Arts, Science and Commerce, Jain Society, Sion West, Mumbai 400 022 INDIA</p>
           <div className='map1'><iframe style={{'width':'100%','height':'100%'}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5123476470417!2d72.85904761469685!3d19.041198387107904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8d24540ba2f%3A0x28d0648e98c826d0!2sSies%20College%20Of%20Arts%2C%20Science%20%26%20Commerce%2C%20Jain%20Society%2C%20Sion%2C%20Mumbai%2C%20Maharashtra%20400022!5e0!3m2!1sen!2sin!4v1643190692309!5m2!1sen!2sin" 
       allowfullscreen="" loading="lazy"></iframe></div>
         </div>
         <br>
         </br>
         </div>
         
        
  
  
  );
  
  
};

export default ContactUs;