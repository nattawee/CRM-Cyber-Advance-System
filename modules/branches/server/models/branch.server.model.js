'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Branch Schema
 */
var BranchSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Branch name',
    unique: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Branch', BranchSchema);
