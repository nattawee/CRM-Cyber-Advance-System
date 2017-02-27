'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Contact Schema
 */
var ContactSchema = new Schema({
  customer:String,
  lastname: {
    type: String,
    default: '',
    required: 'Please fill lastname',
    trim: true
  },
  firstname:String,
  mobilephone:Number,
  businessphone:Number,
  email:String,
  fax:Number,
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Contact', ContactSchema);
