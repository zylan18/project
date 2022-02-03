import { Accounts } from 'meteor/accounts-base';
import {DonationList} from './links';
import {Meteor} from 'meteor/meteor'
import {Files} from './links'
import {Request} from './links'

Meteor.methods({
    'Account.create'(username,password,email,nameofuser,address){
        if (!Accounts.findUserByUsername(username)) {
            Accounts.createUser({
              username: username,
              email:email,
              password: password,
              profile:{
                  name:nameofuser,
                  address:address
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
       }   
});
