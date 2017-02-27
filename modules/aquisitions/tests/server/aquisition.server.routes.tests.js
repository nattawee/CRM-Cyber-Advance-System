'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Aquisition = mongoose.model('Aquisition'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  aquisition;

/**
 * Aquisition routes tests
 */
describe('Aquisition CRUD tests', function () {

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
      password: 'M3@n.jsI$Aw3$0m3',
      roles: ['superuser']
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

    // Save a user to the test db and create new Aquisition
    user.save(function () {
      aquisition = {
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
        }
      };

      done();
    });
  });

  it('should be able to save a Aquisition if logged in', function (done) {
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

        // Save a new Aquisition
        agent.post('/api/aquisitions')
          .send(aquisition)
          .expect(200)
          .end(function (aquisitionSaveErr, aquisitionSaveRes) {
            // Handle Aquisition save error
            if (aquisitionSaveErr) {
              return done(aquisitionSaveErr);
            }

            // Get a list of Aquisitions
            agent.get('/api/aquisitions')
              .end(function (aquisitionsGetErr, aquisitionsGetRes) {
                // Handle Aquisitions save error
                if (aquisitionsGetErr) {
                  return done(aquisitionsGetErr);
                }

                // Get Aquisitions list
                var aquisitions = aquisitionsGetRes.body;

                // Set assertions
                (aquisitions[0].user._id).should.equal(userId);
                (aquisitions[0].form1.nta.assetssum).should.equal(1);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Aquisition if not logged in', function (done) {
    agent.post('/api/aquisitions')
      .send(aquisition)
      .expect(403)
      .end(function (aquisitionSaveErr, aquisitionSaveRes) {
        // Call the assertion callback
        done(aquisitionSaveErr);
      });
  });

  it('should not be able to save an Aquisition if no name is provided', function (done) {
    // Invalidate name field
    aquisition.form1.nta.assetssum = null;

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

        // Save a new Aquisition
        agent.post('/api/aquisitions')
          .send(aquisition)
          .expect(400)
          .end(function (aquisitionSaveErr, aquisitionSaveRes) {
            // Set message assertion
            (aquisitionSaveRes.body.message).should.match('Please fill Aquisition assetssum');

            // Handle Aquisition save error
            done(aquisitionSaveErr);
          });
      });
  });

  it('should be able to update an Aquisition if signed in', function (done) {
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

        // Save a new Aquisition
        agent.post('/api/aquisitions')
          .send(aquisition)
          .expect(200)
          .end(function (aquisitionSaveErr, aquisitionSaveRes) {
            // Handle Aquisition save error
            if (aquisitionSaveErr) {
              return done(aquisitionSaveErr);
            }

            // Update Aquisition assetssum
            aquisition.form1.nta.assetssum = 2;

            // Update an existing Aquisition
            agent.put('/api/aquisitions/' + aquisitionSaveRes.body._id)
              .send(aquisition)
              .expect(200)
              .end(function (aquisitionUpdateErr, aquisitionUpdateRes) {
                // Handle Aquisition update error
                if (aquisitionUpdateErr) {
                  return done(aquisitionUpdateErr);
                }

                // Set assertions
                (aquisitionUpdateRes.body._id).should.equal(aquisitionSaveRes.body._id);
                (aquisitionUpdateRes.body.form1.nta.assetssum).should.equal(2);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Aquisitions if not signed in', function (done) {
    // Create new Aquisition model instance
    var aquisitionObj = new Aquisition(aquisition);

    // Save the aquisition
    aquisitionObj.save(function () {
      // Request Aquisitions
      request(app).get('/api/aquisitions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Aquisition if not signed in', function (done) {
    // Create new Aquisition model instance
    var aquisitionObj = new Aquisition(aquisition);

    // Save the Aquisition
    aquisitionObj.save(function () {
      request(app).get('/api/aquisitions/' + aquisitionObj._id)
        .end(function (req, res) {
          // Set assertion
          // res.body.should.be.instanceof(Object).and.have.property('',aquisition.form1.nta.assetssum);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Aquisition with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/aquisitions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Aquisition is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Aquisition which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Aquisition
    request(app).get('/api/aquisitions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Aquisition with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Aquisition if signed in', function (done) {
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

        // Save a new Aquisition
        agent.post('/api/aquisitions')
          .send(aquisition)
          .expect(200)
          .end(function (aquisitionSaveErr, aquisitionSaveRes) {
            // Handle Aquisition save error
            if (aquisitionSaveErr) {
              return done(aquisitionSaveErr);
            }

            // Delete an existing Aquisition
            agent.delete('/api/aquisitions/' + aquisitionSaveRes.body._id)
              .send(aquisition)
              .expect(200)
              .end(function (aquisitionDeleteErr, aquisitionDeleteRes) {
                // Handle aquisition error error
                if (aquisitionDeleteErr) {
                  return done(aquisitionDeleteErr);
                }

                // Set assertions
                (aquisitionDeleteRes.body._id).should.equal(aquisitionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Aquisition if not signed in', function (done) {
    // Set Aquisition user
    aquisition.user = user;

    // Create new Aquisition model instance
    var aquisitionObj = new Aquisition(aquisition);

    // Save the Aquisition
    aquisitionObj.save(function () {
      // Try deleting Aquisition
      request(app).delete('/api/aquisitions/' + aquisitionObj._id)
        .expect(403)
        .end(function (aquisitionDeleteErr, aquisitionDeleteRes) {
          // Set message assertion
          (aquisitionDeleteRes.body.message).should.match('User is not authorized');

          // Handle Aquisition error error
          done(aquisitionDeleteErr);
        });

    });
  });

  it('should be able to get a single Aquisition that has an orphaned user reference', function (done) {
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

          // Save a new Aquisition
          agent.post('/api/aquisitions')
            .send(aquisition)
            .expect(200)
            .end(function (aquisitionSaveErr, aquisitionSaveRes) {
              // Handle Aquisition save error
              if (aquisitionSaveErr) {
                return done(aquisitionSaveErr);
              }

              // Set assertions on new Aquisition
              (aquisitionSaveRes.body.form1.nta.assetssum).should.equal(aquisition.form1.nta.assetssum);
              should.exist(aquisitionSaveRes.body.user);
              should.equal(aquisitionSaveRes.body.user._id, orphanId);

              // force the Aquisition to have an orphaned user reference
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

                    // Get the Aquisition
                    agent.get('/api/aquisitions/' + aquisitionSaveRes.body._id)
                      .expect(200)
                      .end(function (aquisitionInfoErr, aquisitionInfoRes) {
                        // Handle Aquisition error
                        if (aquisitionInfoErr) {
                          return done(aquisitionInfoErr);
                        }

                        // Set assertions
                        (aquisitionInfoRes.body._id).should.equal(aquisitionSaveRes.body._id);
                        (aquisitionInfoRes.body.form1.nta.assetssum).should.equal(aquisition.form1.nta.assetssum);
                        should.equal(aquisitionInfoRes.body.user, undefined);

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
      Aquisition.remove().exec(done);
    });
  });
});
