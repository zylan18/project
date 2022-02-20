import React from 'react';
import '../../client/main.scss'
import {FaInstagram} from '@react-icons/all-files/fa/FaInstagram'
import {FaFacebookSquare} from '@react-icons/all-files/fa/FaFacebookSquare'
import {FaTwitterSquare} from '@react-icons/all-files/fa/FaTwitterSquare'

const ContactUs = () => {
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
                   <p>Ramesh ka ghar</p>
                 </div>
                 <div class="information">
                   <img src="/images/email.png" class="icon" alt="" />
                   <p>ramesh.com</p>
                 </div>
                 <div class="information">
                   <img src="/images/phone.png" class="icon" alt="" />
                   <p>000-6969-000</p>
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
                   <a href="https://instagram.com/zylan.18?utm_medium=copy_link">
                     <FaInstagram/>
                   </a>
                   <svg preserveAspectRatio="none" data-bbox="20.045 51 159.91 98.001" viewBox="20.045 51 159.91 98.001" 
        height="50" width="50" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="presentation" aria-hidden="true">
    <g>
        <path d="M179.222 129.111c-.655-.409-1.555-.164-2.046.491l-8.43 14.078c-9.494-37.323-27.583-63.924-53.856-78.902-42.89-24.391-93.308-9.003-93.799-8.84-.737.246-1.228 1.064-.982 1.801.246.737 1.064 1.228 1.801.982.491-.164 49.764-15.224 91.588 8.676 25.619 14.569 43.216 40.515 52.465 77.101l-14.16-8.021c-.737-.409-1.637-.164-1.964.573-.409.737-.164 1.637.573 1.964l17.188 9.74c.082 0 .082.082.164.082s.082 0 .164.082a.88.88 0 0 0 .408.082h.327c.164 0 .327-.082.491-.246l.082-.082.327-.327 10.231-17.106c.328-.819.164-1.719-.572-2.128z"></path>
    </g>
</svg>
<p style={{'margin-top':'15%'}}>@zylan18</p>
                 </div>
               </div>
             </div>
     
             <div class="contact-form">
               <span class="circle one"></span>
               <span class="circle two"></span>
     
               <form className='contact-formtag' action="index.html" autocomplete="off">
                 <h3 class="title">Contact us</h3>
                 <div class="input-container focus">
                   <input type="text" name="name" class="input" />
                   <label for="">Username</label>
                   <span>Username</span>
                 </div>
                 <div class="input-container focus">
                   <input type="email" name="email" class="input" />
                   <label for="">Email</label>
                   <span>Email</span>
                 </div>
                 <div class="input-container focus">
                   <input type="tel" name="phone" class="input" />
                   <label for="">Phone</label>
                   <span>Phone</span>
                 </div>
                 <div class="input-container textarea focus">
                   <textarea name="message" class="input"></textarea>
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
         <footer>
        <div class="footer-content">
            <h3>About us </h3>
            <p>Started in 2022 Sharemeds an initiative by SIES Collage Students grows exponentially through its research in technology and Social Care 
              .Sharemeds works towards development of Healthy Society.
              We take surplus medications off of your hands and get them to the people who need them. .</p>
            {/* <ul class="socials">
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><FaTwitterSquare/></a></li>
                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
            </ul> */}
        </div>
        <div class="footer-bottom">
            <p>copyright &copy;2022 Sorojini. designed by <span>Yash & Manoj with </span></p>
        </div>
    </footer>
    

         </div>
         
        
  
  
  );
  
  
};

export default ContactUs;