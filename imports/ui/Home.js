import React,{useEffect} from 'react';
import {Carousel,Col,Row,Spinner,Button} from 'react-bootstrap';
import {FaInstagram} from '@react-icons/all-files/fa/FaInstagram'
import {FaFacebookSquare} from '@react-icons/all-files/fa/FaFacebookSquare'
import {FaTwitterSquare} from '@react-icons/all-files/fa/FaTwitterSquare'
import {HiOutlineHeart} from '@react-icons/all-files/hi/HiOutlineHeart'

const Home = () => {

    //console.log(user.username);
if(Meteor.user()){
  return(
  <div className='form'>
    <br/>
    <div style={{'textAlign':'center'}}> 
    <h1>{Meteor.user().profile.name} are you ready to<br/> make a positive impact?</h1>
    <br/>
    <br/>
   
    <p style={{'fontSize':'larger'}} >Get started with ShareMeds to reduce your destruction costs and help save lives.</p>
    <div style={{'marginTop':'-13%'}}>
    <img src='/images/homepage-tiny-positive.png' className='homepage-positive-img' style={{'width':'40%','margin-left':'-40%','marginTop':'10%'}}/>
    <a href='/donate' className='request-now' style={{'font-size': '20px','padding': '15px'}}>Donate Now</a>
    </div>
    <br/>
    <br/>
    <h1>The impact is real</h1>
    <br/>
    <img src='/images/homepage-tiny-quotes.png' style={{'margin-left':'-50%','width':'15%'}}/>
    <br/>
    <br/>
    <Carousel className='homepage-quotes-carousel' style={{'width': '50%','margin':'auto'}}>
      <Carousel.Item>
        <div className='homepage-quotes'>
        <p>Giving is not just making about making donation, its about making difference.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='homepage-quotes'>
        <p>Alone we can do so little, but together do so much</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='homepage-quotes'>
        <p>Those who are happiest are those who do the most for others.</p>
        </div>
      </Carousel.Item>
    </Carousel>
    </div>
    <img src='/images/homepage-tiny-impact.png' className='homepage-tiny-impact-img' 
    style={{'margin-left': '65%', 'width':' 35%','margin-top':' -10%'}}/>
  </div>
  )

}else if(Meteor.loggingIn()){
  return(<div>
    <Spinner className="spinner" animation="border" variant="primary" />
</div>)  
}
      return (
          <div className="Home">
            {(Meteor.user())?
            (<div>
              Welcome:{Meteor.user().profile.name}
            </div>):(null)}
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
            <div className='parallax' style={{'backgroundImage':'url("/images/s2.jpg")'}}>
              <div style={{'margin':'auto','width':'30%'}}>
                <div className='why-to-donate'><h1>Why medicines!?</h1></div>
              </div>
          </div>
            
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

  <footer>
      <div class="footer-content">
          <h3>About us </h3>
          <p>Started in 2022 Sharemeds an initiative by SIES Collage Students grows exponentially through its research in technology and Social Care 
            .Sharemeds works towards development of Healthy Society.
            We take surplus medications off of your hands and get them to the people who need them. .</p>
          <div>
          <a style={{'padding':'10px'}}href="#"><FaInstagram/></a>
              <a style={{'padding':'10px'}} href="#"><FaFacebookSquare/></a>
              <a style={{'padding':'10px'}} href="#"><FaTwitterSquare/></a>
       </div>
      </div>
      <div class="footer-bottom">
          <p>copyright &copy;2022. designed by <span>Yash & Manoj with &#10084; </span></p>
      </div>
  </footer>
 
</div>        
       )

}
export default Home
