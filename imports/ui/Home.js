import React,{useEffect} from 'react';
import {Carousel,Col,Row,Spinner,Button} from 'react-bootstrap';
import {FaInstagram} from '@react-icons/all-files/fa/FaInstagram'
import {FaFacebookSquare} from '@react-icons/all-files/fa/FaFacebookSquare'
import {FaTwitterSquare} from '@react-icons/all-files/fa/FaTwitterSquare'
import {HiOutlineHeart} from '@react-icons/all-files/hi/HiOutlineHeart'

const Home = () => {

    
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
    <br/>
    <p style={{'fontSize':'larger'}} >In need of any medicine?</p>
    <a href='/request' className='request-now' style={{'font-size': '20px','padding': '15px'}}>Request Now</a>
    <br/>
    <br/>
    <br/>
    
    <h1>The impact is real</h1>
    <br/>
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
 else{     
   return (
          <div className="Home">
            {(Meteor.user())?
            (<div>
              Welcome:{Meteor.user().profile.name}
            </div>):(null)}
            <br/>
            <Carousel>
<Carousel.Item>
  <img
    className="carouselImage"
    src="/images/ok_2.gif"
    alt="First slide"
  />
  <Carousel.Caption>
    <h3 className='slide-text'><p>Don't panic. 
    But #DontTakeltEasy.
    WE ARE IN THIS TOGETHER.Be informed. 
    Take precautions. Stay safe..</p>
    </h3>
    
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <img
    className="carouselImage"
    src="/images/slide_2.jpg"
    alt="Second slide"
  />

  <Carousel.Caption>
  <h3 className='slide-text'>
    <p>Helping one person might not change the 
      whole world,but it could change the world for
       one person!!</p></h3>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <img
    className="carouselImage"
    src='/images/s3.jpg'
    alt="Third slide"
  />
  <Carousel.Caption>
    
    <h3 className='slide-text'>
    <p>Medicine heals doubts as well as diseases.</p>
    </h3>
  </Carousel.Caption>
</Carousel.Item>
</Carousel>
<br/>
            <div className='parallax' style={{'backgroundImage':'url("/images/s2.jpg")'}}>
              <br/>
              <div style={{'margin':'auto','width':'50%'}}>
                <div className='why-to-donate'>
                  <h1 className='parallax-text-heading'>Why medicines!?</h1>
                  </div>
              </div>
      
              <div className='parallax-text-body'>
          <Row>
                
               <Col>
             <img  className='why-med-img col' src="/images/whymed.png"></img></Col> 
             
             <Col>
             <div className='why-med-text'>
               <p>50 million Americans don’t take their prescribed medication because they can’t afford it. With soaring copays,
               deductibles, and insurance costs, many people are making impossible choices between medications, food and housing, gas to get to work, and more.</p>
              <p>Not taking your medications, however, often leads to even worse outcomes—heart attacks, strokes, and even higher costs.
              This is our nation’s most critical problem, but it doesn’t have to be.</p>
            <p >That’s why we’re here.provides access so everyone gets the care they deserve.</p>
            </div>
            </Col> 
            </Row>
            </div>
            <br/>
          </div>
           <br/>
           <br/> 
             
          
            <div className='how-to-donate'>
              <h1 style={{'width': '55%',
                  'margin': 'auto',
                  'background-color': '#477167',
                  'border-radius': '25px',
                  'padding': '5px',
                  'color':'#E4F9F5'}}>How to donate!?</h1></div>
            <br>
            </br>
            <div className="container-main row">
  <div className="container-new col-sm" style={{'marginLeft':'1%'}}>
      <img className="image-new" src="/images/todo1.png" alt="Some Error" />
      <div className='steps-text'>Step 1</div>
      <div className="overlay-new">
        <div className='overlay-steps-text'>
        <h3>Register</h3>
          <p>
            Get registered by filling the <a href='/register'>registration form</a> and get started.
          </p>
          </div>
      </div>
  </div>
  <div className="container-new col-sm">
      <div className='steps-text'>Step 2</div>
      <img className="image-new" src="/images/todo3.png" alt="Some Error" />
      <div className="overlay-new">
        <div className='overlay-steps-text'>
        <h3>Fill Forms</h3>
          <p>
            Start donating by filling the donation form and request medicine by filling the request form
          </p>
          </div>
      </div>
  </div>
    <div className="container-new col-sm">
    <div className='steps-text'>Step 3</div>
      <img className="image-new" src="/images/todo2.png" alt="Some Error" />
      <div className="overlay-new">
        <div className='overlay-steps-text'>
        <h3>Delivery</h3>
          <p>
            After verification from admin the medicine will be collected or delivered
          </p>
          </div>
          </div>
  </div>
</div>

<br>
</br> 
  <div className='parallax' style={{'backgroundImage':'url("/images/how-it-works.jpg")'}}>
  <br/>
  <div style={{'margin':'auto','width':'50%'}}>
      <div className='how-work'><h1 className='parallax-text-heading'>How Does it works?</h1></div>
  </div>
      <div className='parallax-text-body'>
      <Row>
      <Col>
      <img className='work-img' src='/images/works.png'></img>
      </Col>
      <Col>
      <div className='work-text'>
      <p>We take surplus medications off of your hands and get them to the people who need them.
        </p>
        </div></Col>
        </Row>
      </div>
      <br/>
      </div>  

   
<br>
</br>

  <footer>
      <div class="footer-bottom">
          <p>copyright &copy;2022. designed by <span>Yash & Manoj with &#10084; </span></p>
      </div>
  </footer>
 
</div>        
       )

}
}
export default Home
