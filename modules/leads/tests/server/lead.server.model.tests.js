'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Lead = mongoose.model('Lead');

/**
 * Globals
 */
var user,
  lead;

/**
 * Unit tests
 */
describe('Lead Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function () {
      lead = new Lead({
        topic: 'topic',
        companyname: 'companyname',
        lastname: 'lastname',
        firstName: 'firstName',
        email: 'email',
        mobilephone: 0,
        businessphone: 0,
        estvalue: 0,
        estclosedate: Date.now(),
        rating: 'rating',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return lead.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without topic', function (done) {
      lead.topic = '';

      return lead.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without companyname', function (done) {
      lead.companyname = '';

      return lead.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without lastname', function (done) {
      lead.lastname = '';

      return lead.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Lead.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
