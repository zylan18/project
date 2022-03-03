import React,{useCallback,useState} from 'react';

const Request = () => {
  return (
  <div>
       <div className="request-container">
            <div className='antipyreticimg'>
                <div class="card1 col-sm">
                <h3>Antipyretics</h3>
                    <p className="small">
                        Antipyretic is a substance that reduces fever.Antipyretics cause the hypothalamus to override a prostaglandin-induced increase in temperature &nbsp; 
                        <a href='https://en.wikipedia.org/wiki/Antipyretic'>more</a>
                </p>
                <a className='request-now' href={`/requestlist/antipyretic`}>Request Now</a>
                    
                        <div class="go-corner" href="#">
                            <div class="go-arrow">
                                →
                            </div>
                        </div>
                </div> 
         </div>   
            <div className='antisepticimg'>
            <div class="card1 col-sm gap-3">
                <h3>Antiseptic</h3>
                    <p className="small">
                   Antiseptic is an antimicrobial substance or compound that is applied to living tissue/skin to reduce the possibility of infection, sepsis, or putrefaction.
                    &nbsp; 
                        <a href='https://en.wikipedia.org/wiki/Antiseptic'>more</a>
                   </p>
                   <a className='request-now' href={`/requestlist/antiseptic`}>Request Now</a>
                    
                        <div class="go-corner" href="#">
                            <div class="go-arrow">
                                →
                            </div>
                        </div>
                 </div> 
            </div>

                <div className='antibioticimg'>
                 <div class="card1 col-sm">
                <h3>Antibiotic</h3>
                    <p className="small">
                    Antibiotic is a type of antimicrobial substance active against bacteria.
                    It is the most important type of antibacterial agent for fighting bacterial infections &nbsp; 
                    <a href='https://en.wikipedia.org/wiki/Antibiotic'>more</a>
                   </p>
                   <a className='request-now' href={`/requestlist/antibiotic`}>Request Now</a>
                    
                        <div class="go-corner" href="#">
                            <div class="go-arrow">
                                →
                            </div>
                        </div>
                 </div> 
                </div>   

                <div className='analgesicimg'>
                 <div class="card1 col-sm">
                <h3>Analgesics</h3>
                    <p className="small">
                    An analgesic drug, also called simply an analgesic, pain reliever, or painkiller,
                     is any member of the group of drugs used to achieve relief from pain&nbsp; 
                    <a href='https://en.wikipedia.org/wiki/Analgestic'>more</a>
                   </p>
                   <a className='request-now' href={`/requestlist/analgestic`}>Request Now</a>
                        <div class="go-corner" href="#">
                            <div class="go-arrow">
                                →
                            </div>
                        </div>
                 </div> 
                </div>

                <div className='moodstabilizersimg'>
                 <div class="card1 col-sm">
                <h3>Mood stabilizers</h3>
                    <p className="small">
                    A mood stabilizer is a psychiatric medication used to treat mood disorders characterized 
                    by intense and sustained mood shifts, such as bipolar disorder.&nbsp; 
                    <a href='https://en.wikipedia.org/wiki/Mood_stabilizer'>more</a>
                   </p>
                   <a className='request-now' href={`/requestlist/mood_stabilizer`}>Request Now</a>
                        <div class="go-corner" href="#">
                            <div class="go-arrow">
                                →
                            </div>
                        </div>
                 </div> 
                </div>

                <div className='othersimg'>
                 <div class="card1 col-sm">
                <h3>Others</h3>
                    <p className="small">
                    This includes other medcines and medical items like suppliments, masks, etc. &nbsp;<br/><br/><br/>
                   </p>
                   <a className='request-now' href={`/requestlist/others`}>Request Now</a>
                        <div class="go-corner" href="#">
                            <div class="go-arrow">
                                →
                            </div>
                        </div>
                 </div> 
                </div>   
       </div> 
  </div>
  );
}
export default Request
