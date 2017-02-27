'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Contact = mongoose.model('Contact');

/**
 * Globals
 */
var user,
  contact;

/**
 * Unit tests
 */
describe('Contact Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastname: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      contact = new Contact({
        customer: 'customer',
        lastname: 'lastname',
        firstname:'firstName',
        mobilephone:0,
        businessphone:0,
        email:'',
        fax:0,
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return contact.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without lastname', function(done) {
      contact.lastname = '';

      return contact.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Contact.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
