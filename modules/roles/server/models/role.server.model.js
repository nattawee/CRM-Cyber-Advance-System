'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Role Schema
 */
var RoleSchema = new Schema({
  code: {
    type: String,
    required: 'Please fill Role code',
    unique:true
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill Role name',
    unique:true
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

mongoose.model('Role', RoleSchema);
