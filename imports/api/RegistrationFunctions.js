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
       },
       'submitDonationForm'(user_id,username,donorname,address,phone,medname,expdate){
        date=new Date;
        DonationList.insert({user_id:user_id,donatedat:date.toLocaleString(),
          username:username,donor_name:donorname,address:address,phone:phone, 
          medicine_name:medname,brand:'',composition:'',exp_date:expdate,verify_status:false,verified_by:'',
          status:'in verification',edit:true,remark:''})
       },
        'submitReuqestForm'(user_id,username,reqname,donation_id,reason,address,phone){
          var date=new Date;
          const medicine=DonationList.findOne({_id:donation_id});
          Request.insert({user_id:user_id,requestdate:date.toLocaleString(),
            username:username,requester_name:reqname,donation_id:donation_id, 
            medicine_name:medicine.medicine_name, exp_date:medicine.exp_date,verify_status:false,verified_by:'',
            status:'in verification',type:medicine.type,reason:reason,address:address,phone:phone,edit:true,remark:''})
        },
        'updateDonationForm'(id,donorname,address,phone,medname,expdate){
          date=new Date;
          DonationList.update(id,{$set:{donor_name:donorname,address:address,phone:phone, 
            medicine_name:medname,exp_date:expdate,updatedon:date.toLocaleString()}});
         },
         'updateDonationImages'(id,data){
          Files.update((Files.findOne({donation_id:id})._id),{$set:{data:data}});
        },
        'updateRequestForm'(id,reqname,reason,address,phone){
          var date=new Date;
          Request.update(id,{$set:{requester_name:reqname, 
            reason:reason,address:address,phone:phone,updatedon:date.toLocaleString()}})
        },
        'updateRequestImages'(id,data){
          Files.update((Files.findOne({request_id:id},{fields:{_id:1}}))._id,{$set:{data:data}})
        },
        'cancelRequest'(id){
          Request.update(id,{$set:{status:'canceled'}});
        },
        'cancelDonation'(id){
          DonationList.update(id,{$set:{status:'canceled'}});
        },
        'setCollectionStatus'(id,status){
          DonationList.update(id, { $set: { status: status } });
        },
        'setDeliveryStatus'(id,status){
          Request.update(id, { $set: { status: status } });
        },
        'adminVerify'(id,username){
          var verify_status=(DonationList.findOne({_id:id})).verify_status;
          console.log(verify_status)
          if(verify_status == true){
            DonationList.update(id,{$set:{verify_status:false}});
            DonationList.update(id,{$set:{status:'not verified'}});
            DonationList.update(id,{$set:{edit:true}});
            console.log(verify_status);
            }
            else if(verify_status == "rejected"){
                DonationList.update(id,{$set:{verify_status:false}});
                DonationList.update(id,{$set:{status:'in verification'}});
                DonationList.update(id,{$set:{verify_status:false}});
                // console.log(verified_by);
            }
            else{
                DonationList.update(id,{$set:{verify_status:true}});
                DonationList.update(id,{$set:{status:'verified'}});
                DonationList.update(id,{$set:{edit:false}});
                // console.log(verified_by);
            }
            DonationList.update(id,{$set:{verified_by:username}});
        },
        'rejectVerification'(id,username){
          DonationList.update(id,{$set:{verify_status:'rejected'}});
          DonationList.update(id,{$set:{status:'rejected'}});
          DonationList.update(id,{$set:{verified_by:username}});
        },
        'setRemark'(id,remark){
          DonationList.update(id,{$set:{remark:remark,edit:true}});
        },
        'setEditStatus'(id,status){
          DonationList.update(id,{$set:{edit:status}});
        },
        'setMedDetail'(id,medtype,brand,composition){
          DonationList.update(id,{$set:{type:medtype,brand:brand,composition:composition}});
        },
        'adminRequestVerify'(id,username){
          var verify_status=(Request.findOne({_id:id})).verify_status;
          if(verify_status == true){
            Request.update(id,{$set:{verify_status:false}});
            Request.update(id,{$set:{status:'not verified'}});
            Request.update(id,{$set:{edit:true}});
            DonationList.update((Request.findOne({_id:id})).donation_id,{$set:{status:'storage'}})
            }
            else if(verify_status == "rejected"){
                Request.update(id,{$set:{verify_status:false}});
                Request.update(id,{$set:{status:'in verification'}});
                Request.update(id,{$set:{edit:true}});
                
            }
            else{
                Request.update(id,{$set:{verify_status:true}});
                Request.update(id,{$set:{status:'verified'}});
                Request.update(id,{$set:{edit:false}});
                DonationList.update((Request.findOne({_id:id})).donation_id,{$set:{status:'request verified'}}) 
            }
            Request.update(id,{$set:{verified_by:username}});
        },
        'rejectRequestVerification'(id){
          Request.update(id,{$set:{verify_status:'rejected'}});
                Request.update(id,{$set:{status:'rejected'}});
        },
        'setRequestEditStatus'(id,status){
          Request.update(id,{$set:{edit:status}});
        },
        'setRequestRemark'(id,remark){
          Request.update(id,{$set:{remark:remark,edit:true}});
        }

});
