'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Lead Schema
 */
var LeadSchema = new Schema({
  topic: {
    type: String,
    default: '',
    required: 'Please fill topic',
    trim: true
  },
  companyname: {
    type: String,
    default: '',
    required: 'Please fill companyname',
    trim: true
  },
  lastname: {
    type: String,
    default: '',
    required: 'Please fill lastname',
    trim: true
  },
  firstName:String,
  email:String,
  mobilephone:Number,
  businessphone:Number,
  estvalue:Number,
  estclosedate:Date,
  rating:String,
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Lead', LeadSchema);
