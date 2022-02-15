import React,{useCallback,useState} from 'react';

const Request = () => {
  return (
  <div>
       <div className="container-main row">
        <div className="container-new col-sm" style={{cursor: "pointer"}}>
        <a href="/requestlist/antipyretic" style={{color:'black'}}>
            <img className="image-new" src="/images/antipyretics.jpg" alt="Some Error" />
            <div className="text-on-image"><h3>Antipyretics</h3></div>
            <div className="overlay-new"><p><h3>Antipyretics</h3><br/>
            An antipyretic is a substance that reduces fever.
            Antipyretics cause the hypothalamus to override a prostaglandin-induced increase in temperature. 
            The body then works to lower the temperature, which results in a reduction in fever.
            <a style={{color:"blue"}} href="https://en.wikipedia.org/wiki/Antipyretic">more</a></p>
            </div></a>
        </div>
        <div className="container-new col-sm" style={{cursor: "pointer"}}>
        <a href="/requestlist/antibiotic" style={{color:'black'}}>
            <img className="image-new" src="/images/Antibiotics.png" alt="Some Error" />
            <div className="text-on-image"><h3>Antibiotics</h3></div>
            <div className="overlay-new">Text 2</div>
            </a>
        </div>
        <div className="container-new col-sm" style={{cursor: "pointer"}}>
        <a href="/requestlist/antiseptic" style={{color:'black'}}>            
        <img className="image-new" src="/images/antiseptic.jpg" alt="Some Error" />
            <div className="text-on-image"><h3>Antiseptics</h3></div>
            <div className="overlay-new">Text 3</div>
         </a>   
        </div>
       </div>
  </div>
  );
}
export default Request
