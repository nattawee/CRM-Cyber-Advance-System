'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Property = mongoose.model('Property');

/**
 * Globals
 */
var user,
  property;

/**
 * Unit tests
 */
describe('Property Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      property = new Property({
        // propertyno: 1,
        propertyid: 1,
        documentno: 123,
        name: 'Property name',
        location: {
          subdistrict: 'subdistrict',
          district: 'district',
          province: 'province'
        },
        propertydes: 'description',
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
      return property.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    // it('should be able to show an error when try to save without propertyno', function (done) {
    //   property.propertyno = '';

    //   return property.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without propertyid', function (done) {
    //   property.propertyid = '';

    //   return property.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without documentno', function (done) {
    //   property.documentno = '';

    //   return property.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without name', function (done) {
    //   property.name = '';

    //   return property.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without subdistrict', function (done) {
    //   property.location.subdistrict = '';

    //   return property.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without district', function (done) {
    //   property.location.district = '';

    //   return property.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without province', function (done) {
    //   property.location.province = '';

    //   return property.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without propertydes', function (done) {
    //   property.propertydes = '';

    //   return property.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without processtype', function (done) {
    //   property.processtype = '';

    //   return property.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without methodtype', function (done) {
    //   property.methodtype = '';

    //   return property.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without estimate expense amount', function(done) {
    //   property.estexpense.amount = null; 

    //   return property.save(function(err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without estimate approve date', function(done) {
    //   property.estexpense.apprvdate = null; 

    //   return property.save(function(err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without estimate approver', function(done) {
    //   property.estexpense.approver = ''; 

    //   return property.save(function(err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

  });

  afterEach(function(done) {
    Property.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
