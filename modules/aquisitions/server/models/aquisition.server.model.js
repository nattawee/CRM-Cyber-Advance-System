'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Aquisition Schema
 */
var AquisitionSchema = new Schema({
  form1: {
    nta: {
      assetssum: {
        type: Number,
        required: 'Please fill Aquisition assetssum',
      },
      assetsintangible: {
        type: Number,
        required: 'Please fill Aquisition assetsintangible',
      },
      debtssum: {
        type: Number,
        required: 'Please fill Aquisition debtssum',
      },
      shareholder: Number,
      ntasum: {
        type: Number,
        required: 'Please fill Aquisition ntasum',
      }
    },
    acqodis: {
      type: Number,
      required: 'Please fill Aquisition acqodis',
    },
    ntalisted: {
      type: Number,
      required: 'Please fill Aquisition ntalisted',
    }
  },
  form2: {
    netoperating: {
      type: Number,
      required: 'Please fill Aquisition netoperating',
    },
    ratio: {
      type: Number,
      required: 'Please fill Aquisition ratio',
    },
    netcompany: {
      type: Number,
      required: 'Please fill Aquisition netcompany',
    }
  },
  form3: {
    amount: {
      type: Number,
      required: 'Please fill Aquisition amount',
    },
    assetscompany: {
      type: Number,
      required: 'Please fill Aquisition assetscompany',
    }
  },
  form4: {
    sharespay: {
      type: Number,
      required: 'Please fill Aquisition sharespay',
    },
    sharespaycompany: {
      type: Number,
      required: 'Please fill Aquisition sharespaycompany',
    }
  },
  startdate: Date,
  relations: String,
  descriptionlist: String,
  descriptionproduct: String,
  caculation: String,
  benefit: String,
  comment: String,
  manipulator: String,
  approvers: String,
  status: String,
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Aquisition', AquisitionSchema);
