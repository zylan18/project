import React from 'react';

const Home = () => {
    user=Meteor.user();
    //console.log(user.username);
    if(!user){
        return (
            <div className="form">
                <h1>Konichi wa</h1>
            </div>
        )
    }
    else{
        return(
            <div className="form">
            <div className='container'> 
                <img src = '/images/suraj.png' alt = 'some error' className="goti" />
                <div className="centered"><h1>Goti</h1></div>
            </div>
                <h1>Welcome, {user.profile.name}</h1><br/>
                <p>Address: {user.profile.address}</p>
                <p>Email: {user.emails[0].address}</p>

            </div>
        )
    }
}
export default Home
