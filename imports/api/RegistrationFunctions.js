import { Accounts } from 'meteor/accounts-base';
import {DonationList} from './links';
import {Meteor} from 'meteor/meteor'
import {Files} from './links'
import {Request} from './links'


Meteor.publish('requestList',(type)=>{
  console.log(DonationList.find({status:'storage',type:type},{fields:{}}).fetch());
  this.ready;
  return(DonationList.find({status:'storage'},{fields:{}}));
});

Meteor.publish('donationImages',()=>{
  console.log(Files.find({donation_id:{$exists:true}}).fetch())
  this.ready;
  return(Files.find({donation_id:{$exists:true}}));
});

Meteor.publish('yourDonations',function(){//arrow function does not take this.userId
  console.log(this.userId,'yourDonation')
  return(DonationList.find({user_id:this.userId},{fields:{}}))
})

Meteor.publish('yourDonationImages',function(){
  console.log(this.userId,'yourDonationImages')
  return(Files.find({donation_id:{$exists:true},user_id:this.userId}));
})

Meteor.publish('yourRequests',function(){
  console.log(this.userId,'yourRequests')
  return(Request.find({user_id:this.userId},{fields:{}}))
})

Meteor.publish('yourRequestImages',function(){
  console.log(this.userId,'yourRequestImages')
  return(Files.find({request_id:{$exists:true},user_id:this.userId}));
})

Meteor.publish('donationStatus',(id)=>{
  console.log(this.userId,'donationStatus')
  return(DonationList.find({_id:id},{fields:{}}))
})

Meteor.publish('donationStatusImages',(id)=>{
  console.log(this.userId,'donationStatusImages')
  return(Files.find({donation_id:id}));
})

Meteor.publish('requestStatus',(id)=>{
  console.log(this.userId,'requestStatus')
  return(Request.find({_id:id},{fields:{}}))
})

Meteor.publish('requestStatusImages',(id)=>{
  const request=Files.find({request_id:id});
  const donation_id=(Request.findOne({_id:id}).donation_id);
  const donationrequest=Files.find({"$or":[{request_id:id},{donation_id:donation_id}]})
  console.log(donationrequest.fetch())
  return(donationrequest);
})

Meteor.publish('donationAdmin',()=>{
  return(DonationList.find({}))
})
Meteor.publish('donationAdminImages',()=>{
  return(Files.find({donation_id:{$exists:true}}));
})
Meteor.publish('requestAdmin',()=>{
  return(Request.find({}));
})
Meteor.publish('requestAdminImages',()=>{
  return(Files.find({request_id:{$exists:true}}));
})

Meteor.publish('donationDelivery',()=>{
  return( DonationList.find({status:{$in: ["verified", "pickup in progress", "collected", "in transit"]}}))
})

Meteor.publish('requestDelivery',()=>{
  return( Request.find({status:{$in: ["verified","dispatched","in transit","out for delivery","delivered",],}}))
})


Meteor.methods({
    'Account.create'(username,password,email,nameofuser,address,phone){
        if (!Accounts.findUserByUsername(username)) {
            Accounts.createUser({
              username: username,
              email:email,
              password: password,
              profile:{
                  name:nameofuser,
                  phone:phone,
                  address:address,
                  admin:false
              }
            });    
          }
          else
          {
            throw new Meteor.Error(`username ${username} already taken`);
          }
    },
    'fetchfrommedicine'(key,value){
      const donname=DonationList.find({'medicine_name':'abc'},{fields:{_id:0,'donor_name':1}}).fetch();
      for(i in donname ){
      console.log(donname[i].donor_name);
      }
    },
    'updateProfile'(id,name,email,address){
      Meteor.users.update(id,{$set:{profile:{name:name,address:address}}});
      Meteor.users.update(id,{$set:{emails:[{address:email,verified:false}]}});
    },
      'saveFile'(id,username,buffer){
       var donation_id= DonationList.findOne({},{sort:{$natural:-1}});
          Files.insert({user_id:id,donation_id:donation_id._id,username:username,data:buffer});
      },   
      'requestFormSaveFile'(id,username,buffer){
        var request_id= Request.findOne({},{sort:{$natural:-1}});
           Files.insert({user_id:id,request_id:request_id._id,username:username,data:buffer});
       },
       'requestList'(type){
        const requestList = DonationList.find({status:'storage',type:type},{fields:{}}).fetch()
        return(DonationList.find({status:'storage',type:type},{fields:{}}).fetch());
       },
       'getDonationImage'(id){
        return((Files.findOne({donation_id:id})).data);
       }
});
