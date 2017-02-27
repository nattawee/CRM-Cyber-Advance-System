'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Aquisition = mongoose.model('Aquisition');

/**
 * Globals
 */
var user,
  aquisition;

/**
 * Unit tests
 */
describe('Aquisition Model Unit Tests:', function () {
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
      aquisition = new Aquisition({
        form1: {
          nta: {
            assetssum: 1,
            assetsintangible: 1,
            debtssum: 1,
            shareholder: 1,
            ntasum: 1

          },
          acqodis: 1,
          ntalisted: 1
        },
        form2: {
          netoperating: 1,
          ratio: 1,
          netcompany: 1
        },
        form3: {
          amount: 1,
          assetscompany: 1
        },
        form4: {
          sharespay: 1,
          sharespaycompany: 1
        },

        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return aquisition.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form1 nta assetssum', function (done) {
      aquisition.form1.nta.assetssum = null;

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form1 nta assetsintangible', function (done) {
      aquisition.form1.nta.assetsintangible = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form1 nta debtssum', function (done) {
      aquisition.form1.nta.debtssum = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form1 nta ntasum', function (done) {
      aquisition.form1.nta.ntasum = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form1 acqodis', function (done) {
      aquisition.form1.acqodis = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form1 ntalisted', function (done) {
      aquisition.form1.ntalisted = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form2 netoperating', function (done) {
      aquisition.form2.netoperating = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form2 ratio', function (done) {
      aquisition.form2.ratio = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form2 netcompany', function (done) {
      aquisition.form2.netcompany = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form3 amount', function (done) {
      aquisition.form3.amount = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form3 assetscompany', function (done) {
      aquisition.form3.assetscompany = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form4 sharespay', function (done) {
      aquisition.form4.sharespay = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without form4 sharespaycompany', function (done) {
      aquisition.form4.sharespaycompany = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      aquisition.form1 = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      aquisition.form1 = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

  });

  afterEach(function (done) {
    Aquisition.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
