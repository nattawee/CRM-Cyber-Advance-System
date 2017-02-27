'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Renovate = mongoose.model('Renovate');

/**
 * Globals
 */
var user,
  renovate;

/**
 * Unit tests
 */
describe('Renovate Model Unit Tests:', function () {
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
      renovate = new Renovate({
        // renovateno: 1,
        renovateid: 1,
        documentno: 123,
        name: 'Renovate name',
        location: {
          subdistrict: 'subdistrict',
          district: 'district',
          province: 'province'
        },
        renovatedes: 'description',
        processtype: 'วิธีตกลงราคา',
        methodtype: 'การจัดซื้อ/จัดจ้างที่มิใช่งานก่อสร้าง',
        estexpense: {
          amount: 100000,
          apprvdate: Date.now(),
          approver: 'นาย ประมาณ ใกล้เคียง'
        },
        status:'status',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return renovate.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    // it('should be able to show an error when try to save without renovateno', function (done) {
    //   renovate.renovateno = '';

    //   return renovate.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without renovateid', function (done) {
    //   renovate.renovateid = '';

    //   return renovate.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without documentno', function (done) {
    //   renovate.documentno = '';

    //   return renovate.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without name', function (done) {
    //   renovate.name = '';

    //   return renovate.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without subdistrict', function (done) {
    //   renovate.location.subdistrict = '';

    //   return renovate.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without district', function (done) {
    //   renovate.location.district = '';

    //   return renovate.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without province', function (done) {
    //   renovate.location.province = '';

    //   return renovate.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without renovatedes', function (done) {
    //   renovate.renovatedes = '';

    //   return renovate.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without processtype', function (done) {
    //   renovate.processtype = '';

    //   return renovate.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without methodtype', function (done) {
    //   renovate.methodtype = '';

    //   return renovate.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without estimate expense amount', function(done) {
    //   renovate.estexpense.amount = null; 

    //   return renovate.save(function(err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without estimate approve date', function(done) {
    //   renovate.estexpense.apprvdate = null; 

    //   return renovate.save(function(err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without estimate approver', function(done) {
    //   renovate.estexpense.approver = ''; 

    //   return renovate.save(function(err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

  });

  afterEach(function (done) {
    Renovate.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
