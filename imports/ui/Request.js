import React from 'react';

const Request = () => {
  return (
  <div>
       <div className="container-main">
        <div className="container-new" onClick={()=>{alert('antipyretics')}} style={{cursor: "pointer"}}>
            <img className="image-new" src="/images/antipyretics.jpg" alt="Some Error" />
            <div className="text-on-image"><h3>Antipyretics</h3></div>
            <div className="overlay-new"><p><h3>Antipyretics</h3><br/>
           An antipyretic is a substance that reduces fever.
            Antipyretics cause the hypothalamus to override a prostaglandin-induced increase in temperature. 
            The body then works to lower the temperature, which results in a reduction in fever.
            <a style={{color:"blue"}} href="https://en.wikipedia.org/wiki/Antipyretic">more</a></p>
            </div>
        </div>
        <div className="container-new">
            <img className="image-new" src="/images/Antibiotics.png" alt="Some Error" />
            <div className="text-on-image"><h3>Antibiotics</h3></div>
            <div className="overlay-new">Text 2</div>
        </div>
        <div className="container-new">
            <img className="image-new" src="/images/antiseptic.jpg" alt="Some Error" />
            <div className="text-on-image"><h3>Antiseptics</h3></div>
            <div className="overlay-new">Text 3</div>
        </div>
       </div>
  </div>
  );
}
export default Request
