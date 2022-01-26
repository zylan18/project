import { Mongo } from 'meteor/mongo';

export const LinksCollection = new Mongo.Collection('links');
export const DonationList=new Mongo.Collection('donations');
export const Files = new Mongo.Collection('files');