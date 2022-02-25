import React from 'react';
import { Carousel,Col,Row,Spinner} from 'react-bootstrap';

const Home = () => {
    
    //console.log(user.username);
    if(Meteor.user()){
      user=Meteor.user();
        return(
            <div className="form">
                <img src = '/images/W3.gif' alt = 'some error' className="Welcome" />
                <h1>Welcome, {user.profile.name}</h1><br/>
                <p>Address: {user.profile.address}</p>
                <p>Email: {user.emails[0].address}</p> 
            </div>
        )
    }
    else if(Meteor.loggingIn()){
      return(<div>
          <Spinner className="spinner" animation="border" variant="primary" />
      </div>)         
    } 

    else{
      return (
          <div className="Home">
          <div className='parallax' style={{'backgroundImage':'url("/images/s2.jpg")'}}>
              <div style={{'margin':'auto','width':'30%'}}>
                <a className='request-now' style={{'text-align':'center'}} >Suraj Ramesh Pal</a>
              </div>
          </div>
            <Carousel>
<Carousel.Item>
  <img
    className="d-block w-100"
    src="/images/ok_2.gif"
    alt="First slide"
  />
  <Carousel.Caption>
    <h1 className='slide-text'><p>Don't panic. 
    But #DontTakeltEasy.
    WE ARE IN THIS TOGETHER.Be informed. 
    Take precautions. Stay safe..</p>
    </h1>
    
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <img
    className="d-block w-100"
    src="/images/analgesic.jpg"
    alt="Second slide"
    
  />

  <Carousel.Caption>
  <h1 className='slide-text'>
    <p>Helping one person might not change the 
      whole worlds,but it could change the world for
       one person!!</p></h1>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <img
    className="d-block w-100"
    src='/images/s3.jpg'
    alt="Third slide"
  />

  <Carousel.Caption>
    <h3>Third slide label</h3>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
  </Carousel.Caption>
</Carousel.Item>
</Carousel>
{/* <br><br><br> */}
{/* <br/>
<br/>
<br/>
          <div className='home-image-container'>
            <img className="home-image" src='/images/corona.jpg'/>
            <div className='home-image-text'><h1>Donation</h1><a class="btn btn-danger btn-lg text-uppercase js-scroll-trigger" 
         href="#contactus">Tell us More</a></div>

            <br>
            </br>
            </div> */}
            {/* <div tabindex="0" role="button" class="_2tdEn _1pXi6 _3K0Ka _220Ph"><div tabindex="0" role="button" class="_2tdEn _1pXi6"><img class="cKtiT" src="https://assets.pharmeasy.in/web-assets/dist/581b7351.svg" alt="ooc"/>
            </div><div class="qLCRa"><div>Call For Details</div>
            <strong>+91 9967705674</strong></div><div tabindex="0" role="button" class="_2tdEn _1pXi6 _1_5aQ">×</div></div> */}
            
            <div className='why-to-donate'><h1>Why medicines!?</h1></div>
              <Row>{/**over flow issue is here */}
               <Col>
             <img  className='why-med-img col-md-5' src="/images/whymed.png"></img></Col> 
             
             <Col>
             <div className='why-med-text'><p>50 million Americans don’t take their prescribed medication because they can’t afford it. With soaring copays,
               deductibles, and insurance costs, many people are making impossible choices between medications, food and housing, gas to get to work, and more.</p>
              <p>Not taking your medications, however, often leads to even worse outcomes—heart attacks, strokes, and even higher costs.
              This is our nation’s most critical problem, but it doesn’t have to be.</p>
            <p >That’s why we’re here.provides access so everyone gets the care they deserve.</p></div></Col> </Row>


            <div className='how-to-donate'><h1>How to donate!?</h1></div>
            <br>
            </br>
            <div className="container-main">
  <div className="container-new">
      <img className="image-new" src="/images/todo1.png" alt="Some Error" />
      <div className="overlay-new">Register<br></br><br></br>Answer a few simple questions and sign 
      our agreement to donate or receive medicine.</div>
  </div>
  <div className="container-new">
      <img className="image-new" src="/images/todo2.png" alt="Some Error" />
      <div className="overlay-new">Box it up<br></br><br></br>We’ll send everything you need
      to ship. Place medicines in the provided box,and we’ll schedule a pickup through FedEx.</div>
  </div>
  <div className="container-new">
      <img className="image-new" src="/images/todo3.png" alt="Some Error" />
      <div className="overlay-new">Stay confidently complaint<br></br><br></br>We provide a full
       record of the donation, along with the impact it had on the community.</div>
  </div>
</div>
<br>
</br>
      <div className='how-work'><h1>How Does it works?</h1></div>
      <Row>
      <Col>
      <img className='work-img' src='/images/works.png'></img></Col>
      <Col><div className='work-text'>
      <p>We take surplus medications off of your hands and get them to the people who need them.
        </p></div></Col></Row>

   
<br>
</br>
<div className='contact'>
 
            <div tabindex="0" role="button" class="_2tdEn _1pXi6 _3K0Ka _220Ph"><div tabindex="0" role="button" class="_2tdEn _1pXi6">
              <img className="phone" src="https://assets.pharmeasy.in/web-assets/dist/581b7351.svg" alt="ooc"/>
            </div><div class="qLCRa"><div>Call For Details</div>
            <strong>+91 9967705674<br></br></strong><strong>Email:yash.mahadik11@gmail.com</strong></div><div tabindex="0" role="button" 
            class="_2tdEn _1pXi6 _1_5aQ">×</div></div>
            
             <div className='contact-text'>
               <h2>Contact Us</h2>
  <p>We’d love to connect with anyone interested in learning more about our work. Simply fill out the form below.</p>
  
  </div>
  
      <div class="container2" id='contactus'>
  <div class="contact-box">
    <div class="left"></div>
    <div class="right">
    <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5123476470417!2d72.85904761469685!3d19.041198387107904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8d24540ba2f%3A0x28d0648e98c826d0!2sSies%20College%20Of%20Arts%2C%20Science%20%26%20Commerce%2C%20Jain%20Society%2C%20Sion%2C%20Mumbai%2C%20Maharashtra%20400022!5e0!3m2!1sen!2sin!4v1643190692309!5m2!1sen!2sin" 
     allowfullscreen="" loading="lazy"></iframe>
      <h2>Contact Us</h2>
      <input type="text" class="field" placeholder="Your Name"/>
      <input type="text" class="field" placeholder="Your Email"/>
      <input type="text" class="field" placeholder="Phone"/>
      <textarea placeholder="Message" class="field"></textarea>
      <button class="btn1">Send</button>
      <img src="/images/fb.webp"/>
      <img src="/images/ig.webp"/>
      <svg preserveAspectRatio="none" data-bbox="20.045 51 159.91 98.001" viewBox="20.045 51 159.91 98.001" 
      height="50" width="50" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="presentation" aria-hidden="true">
  <g>
      <path d="M179.222 129.111c-.655-.409-1.555-.164-2.046.491l-8.43 14.078c-9.494-37.323-27.583-63.924-53.856-78.902-42.89-24.391-93.308-9.003-93.799-8.84-.737.246-1.228 1.064-.982 1.801.246.737 1.064 1.228 1.801.982.491-.164 49.764-15.224 91.588 8.676 25.619 14.569 43.216 40.515 52.465 77.101l-14.16-8.021c-.737-.409-1.637-.164-1.964.573-.409.737-.164 1.637.573 1.964l17.188 9.74c.082 0 .082.082.164.082s.082 0 .164.082a.88.88 0 0 0 .408.082h.327c.164 0 .327-.082.491-.246l.082-.082.327-.327 10.231-17.106c.328-.819.164-1.719-.572-2.128z"></path>
  </g>
</svg>
<p className="font">or follow us here @zylan18 </p>
    </div>
  </div>
</div>

      
  </div>
  <footer>
      <div class="footer-content">
          <h3>About us </h3>
          <p>Started in 2022 Sharemeds an initiative by SIES Collage Students grows exponentially through its research in technology and Social Care 
            .Sharemeds works towards development of Healthy Society.
            We take surplus medications off of your hands and get them to the people who need them. .</p>
          <ul class="socials">
              {/* <li><a href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter"></i></a></li>
              <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
              <li><a href="#"><i class="fa fa-youtube"></i></a></li>
              <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li> */}
          </ul>
      </div>
      <div class="footer-bottom">
          <p>copyright &copy;2022 Sorojini. designed by <span>Yash & Manoj with </span></p>
      </div>
  </footer>
 
</div>        
       )
  }

}
export default Home
