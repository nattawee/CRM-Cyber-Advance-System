'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Account Schema
 */
var AccountSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Account name',
    trim: true
  },
  email:String,
  mainphone:Number,
  website:String,
  currency:String,
  pricelist:String,
  street1:String,
  street2:String,
  street3:String,
  city:String,
  postcode:String,
  status:String,
  country:String,  
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Account', AccountSchema);
