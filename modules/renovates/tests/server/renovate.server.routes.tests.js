'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Renovate = mongoose.model('Renovate'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  renovate;

/**
 * Renovate routes tests
 */
describe('Renovate CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local',
      roles: ['superuser']
    });

    // Save a user to the test db and create new Renovate
    user.save(function () {
      renovate = {
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
        user: user
      };

      done();
    });
  });

  it('should be able to save a Renovate if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Renovate
        agent.post('/api/renovates')
          .send(renovate)
          .expect(200)
          .end(function (renovateSaveErr, renovateSaveRes) {
            // Handle Renovate save error
            if (renovateSaveErr) {
              return done(renovateSaveErr);
            }

            // Get a list of Renovates
            agent.get('/api/renovates')
              .end(function (renovatesGetErr, renovatesGetRes) {
                // Handle Renovates save error
                if (renovatesGetErr) {
                  return done(renovatesGetErr);
                }

                // Get Renovates list
                var renovates = renovatesGetRes.body;

                // Set assertions
                (renovates[0].user._id).should.equal(userId);
                (renovates[0].name).should.match('Renovate name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Renovate if not logged in', function (done) {
    agent.post('/api/renovates')
      .send(renovate)
      .expect(403)
      .end(function (renovateSaveErr, renovateSaveRes) {
        // Call the assertion callback
        done(renovateSaveErr);
      });
  });

  // it('should not be able to save an Renovate if no name is provided', function (done) {
  //   // Invalidate name field
  //   renovate.name = '';

  //   agent.post('/api/auth/signin')
  //     .send(credentials)
  //     .expect(200)
  //     .end(function (signinErr, signinRes) {
  //       // Handle signin error
  //       if (signinErr) {
  //         return done(signinErr);
  //       }

  //       // Get the userId
  //       var userId = user.id;

  //       // Save a new Renovate
  //       agent.post('/api/renovates')
  //         .send(renovate)
  //         .expect(400)
  //         .end(function (renovateSaveErr, renovateSaveRes) {
  //           // Set message assertion
  //           (renovateSaveRes.body.message).should.match('Please fill Renovate name');

  //           // Handle Renovate save error
  //           done(renovateSaveErr);
  //         });
  //     });
  // });

  it('should be able to update an Renovate if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Renovate
        agent.post('/api/renovates')
          .send(renovate)
          .expect(200)
          .end(function (renovateSaveErr, renovateSaveRes) {
            // Handle Renovate save error
            if (renovateSaveErr) {
              return done(renovateSaveErr);
            }

            // Update Renovate name
            renovate.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Renovate
            agent.put('/api/renovates/' + renovateSaveRes.body._id)
              .send(renovate)
              .expect(200)
              .end(function (renovateUpdateErr, renovateUpdateRes) {
                // Handle Renovate update error
                if (renovateUpdateErr) {
                  return done(renovateUpdateErr);
                }

                // Set assertions
                (renovateUpdateRes.body._id).should.equal(renovateSaveRes.body._id);
                (renovateUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Renovates if not signed in', function (done) {
    // Create new Renovate model instance
    var renovateObj = new Renovate(renovate);

    // Save the renovate
    renovateObj.save(function () {
      // Request Renovates
      request(app).get('/api/renovates')
        .end(function (req, res) {
          // Set assertion
          (res.body.message).should.match('User is not authorized');

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Renovate if not signed in', function (done) {
    // Create new Renovate model instance
    var renovateObj = new Renovate(renovate);

    // Save the Renovate
    renovateObj.save(function () {
      request(app).get('/api/renovates/' + renovateObj._id)
        .end(function (req, res) {
          // Set assertion
          (res.body.message).should.match('User is not authorized');

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Renovate with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/renovates/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Renovate is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Renovate which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Renovate
    request(app).get('/api/renovates/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Renovate with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Renovate if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Renovate
        agent.post('/api/renovates')
          .send(renovate)
          .expect(200)
          .end(function (renovateSaveErr, renovateSaveRes) {
            // Handle Renovate save error
            if (renovateSaveErr) {
              return done(renovateSaveErr);
            }

            // Delete an existing Renovate
            agent.delete('/api/renovates/' + renovateSaveRes.body._id)
              .send(renovate)
              .expect(200)
              .end(function (renovateDeleteErr, renovateDeleteRes) {
                // Handle renovate error error
                if (renovateDeleteErr) {
                  return done(renovateDeleteErr);
                }

                // Set assertions
                (renovateDeleteRes.body._id).should.equal(renovateSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Renovate if not signed in', function (done) {
    // Set Renovate user
    renovate.user = user;

    // Create new Renovate model instance
    var renovateObj = new Renovate(renovate);

    // Save the Renovate
    renovateObj.save(function () {
      // Try deleting Renovate
      request(app).delete('/api/renovates/' + renovateObj._id)
        .expect(403)
        .end(function (renovateDeleteErr, renovateDeleteRes) {
          // Set message assertion
          (renovateDeleteRes.body.message).should.match('User is not authorized');

          // Handle Renovate error error
          done(renovateDeleteErr);
        });

    });
  });

  it('should be able to get a single Renovate that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local',
      roles: ['superuser']
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Renovate
          agent.post('/api/renovates')
            .send(renovate)
            .expect(200)
            .end(function (renovateSaveErr, renovateSaveRes) {
              // Handle Renovate save error
              if (renovateSaveErr) {
                return done(renovateSaveErr);
              }

              // Set assertions on new Renovate
              (renovateSaveRes.body.name).should.equal(renovate.name);
              should.exist(renovateSaveRes.body.user);
              should.equal(renovateSaveRes.body.user._id, orphanId);

              // force the Renovate to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Renovate
                    agent.get('/api/renovates/' + renovateSaveRes.body._id)
                      .expect(200)
                      .end(function (renovateInfoErr, renovateInfoRes) {
                        // Handle Renovate error
                        if (renovateInfoErr) {
                          return done(renovateInfoErr);
                        }

                        // Set assertions
                        (renovateInfoRes.body._id).should.equal(renovateSaveRes.body._id);
                        (renovateInfoRes.body.name).should.equal(renovate.name);
                        should.equal(renovateInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Renovate.remove().exec(done);
    });
  });
});
