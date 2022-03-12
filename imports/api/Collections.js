import { Mongo } from 'meteor/mongo';

export const DonationList=new Mongo.Collection('donations');
export const Files = new Mongo.Collection('files');
export const Request=new Mongo.Collection('request');
export const ContactUs=new Mongo.Collection('contactus');