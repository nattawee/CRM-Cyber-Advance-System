'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Client = mongoose.model('Client');

/**
 * Globals
 */
var user,
  client;

/**
 * Unit tests
 */
describe('Client Model Unit Tests:', function () {
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
      client = new Client({
        cid: 1234,
        fname: 'Client fname',
        lname: 'Client lname',
        type: ['P'],
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return client.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without cid', function (done) {
      client.cid = null;

      return client.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without fname', function (done) {
      client.fname = '';

      return client.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without lname', function(done) {
      client.lname = '';

      return client.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without type', function(done) {
      client.type = '';

      return client.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Client.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
