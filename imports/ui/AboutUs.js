import React from 'react';
import {FaInstagram} from '@react-icons/all-files/fa/FaInstagram'
import {FaFacebookSquare} from '@react-icons/all-files/fa/FaFacebookSquare'
import {FaTwitterSquare} from '@react-icons/all-files/fa/FaTwitterSquare'

const AboutUs = () => {
  return (
  <div class="wrapper">
  <div class="about-container">
      
      <div class="image-container">
          <img src="./images/aboutus-img.png" alt=""></img>
         
          
      </div>

      <div class="text-container">
          <h1>About us</h1>
          <p>We’re a small team that’s passionate about our mission of reimagining healthcare access for those in need.
            <br></br>We’re national drug donation law experts who enable health facilities and pharmacies to donate their unused medicine.
             Our system is built to ensure compliance and provide full liability protection.</p>
          <a href="contactUs">Know More</a>
          <br></br>
          <div class="social">
					<a href=""><FaInstagram/></a>
					<a href=""><FaFacebookSquare/></a>
					<a href=""><FaTwitterSquare/></a>
				</div>
      </div>
      
  </div>
  
</div>


);
};

export default AboutUs;