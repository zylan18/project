import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/Functions.js';


Meteor.startup(() => {


  if (!Accounts.findUserByUsername('admin')) {
    Accounts.createUser({
      username:'admin',
      email:'admin@sharemeds.com',
      password: 'yashop11',
      profile:{
          name:'Admin',
          phone:'0123456789',
          address:'address',
          role:'admin',
      }
    });
  }
});