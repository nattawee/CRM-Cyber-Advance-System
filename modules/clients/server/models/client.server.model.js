'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Client Schema
 */
var ClientSchema = new Schema({
  cid: {
    type: Number,
    required: 'Please fill Client id',
    unique:true
  },
  fname: {
    type: String,
    required: 'Please fill Client fname'
  },
  lname: {
    type: String,
    required: 'Please fill Client lname'
  },
  type: {
    type: String,
    enum: ['P', 'C'],
    required: 'Please fill Client type'
  },
  relations: [{
    rela:String
  }],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Client', ClientSchema);
