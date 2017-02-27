'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  General = mongoose.model('General'),
  Branch = mongoose.model('Branch');
/**
 * Globals
 */
var user,
  branch,
  general;

/**
 * Unit tests
 */
describe('General Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });
    branch = new Branch({
      name: 'Branch Name',
      user: user
    });
    user.save(function () {
      general = new General({
        trnsdate: Date.now(),
        itemdesc: 'เครื่อง printer brother รุ่น MFC-7860DW',
        department: branch,
        owner: 'ธีรศักดิ์ ทับฤทธิ์',
        docno: 'PO-01',
        estexpense: {
          amount: 100000,
          apprvdate: Date.now(),
          approver: 'นาย ประมาณ ใกล้เคียง'
        },
        processtype: 'วิธีตกลงราคา',
        methodtype: 'การจัดซื้อ/จัดจ้างที่มิใช่งานก่อสร้าง',
        purchase: {
          amount: 11,
          apprvdate: Date.now(),
          approver: 'approver'
        },
        status: 'status',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return general.save(function (err) {
        should.not.exist(err);
        done();
      });
    });
    // it('should be able to show an error when try to save without trnsdate', function (done) {
    //   general.trnsdate = null;

    //   return general.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });
    // it('should be able to show an error when try to save without itemdesc', function (done) {
    //   general.itemdesc = '';

    //   return general.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });
    // it('should be able to show an error when try to save without department', function (done) {
    //   general.department = '';

    //   return general.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });
    // it('should be able to show an error when try to save without owner', function (done) {
    //   general.owner = '';

    //   return general.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });
    // it('should be able to show an error when try to save without docno', function (done) {
    //   general.docno = '';

    //   return general.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without estimate expense amount', function (done) {
    //   general.estexpense.amount = null;

    //   return general.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without estimate approve date', function (done) {
    //   general.estexpense.apprvdate = null;

    //   return general.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without estimate approver', function (done) {
    //   general.estexpense.approver = '';

    //   return general.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without processtype', function (done) {
    //   general.processtype = '';

    //   return general.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });

    // it('should be able to show an error when try to save without methodtype', function (done) {
    //   general.methodtype = '';

    //   return general.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });
  });

  afterEach(function (done) {
    General.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
