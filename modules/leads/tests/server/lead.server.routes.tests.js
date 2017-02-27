'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Lead = mongoose.model('Lead'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  lead;

/**
 * Lead routes tests
 */
describe('Lead CRUD tests', function () {

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
      provider: 'local'
    });

    // Save a user to the test db and create new Lead
    user.save(function () {
      lead = {
        topic: 'topic',
        companyname: 'companyname',
        lastname: 'lastname',
        firstName: 'firstName',
        email: 'email',
        mobilephone: 0,
        businessphone: 0,
        estvalue: 0,
        estclosedate: Date.now(),
        rating: 'rating'
      };

      done();
    });
  });

  it('should be able to save a Lead if logged in', function (done) {
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

        // Save a new Lead
        agent.post('/api/leads')
          .send(lead)
          .expect(200)
          .end(function (leadSaveErr, leadSaveRes) {
            // Handle Lead save error
            if (leadSaveErr) {
              return done(leadSaveErr);
            }

            // Get a list of Leads
            agent.get('/api/leads')
              .end(function (leadsGetErr, leadsGetRes) {
                // Handle Leads save error
                if (leadsGetErr) {
                  return done(leadsGetErr);
                }

                // Get Leads list
                var leads = leadsGetRes.body;

                // Set assertions
                (leads[0].user._id).should.equal(userId);
                (leads[0].topic).should.match('topic');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Lead if not logged in', function (done) {
    agent.post('/api/leads')
      .send(lead)
      .expect(403)
      .end(function (leadSaveErr, leadSaveRes) {
        // Call the assertion callback
        done(leadSaveErr);
      });
  });

  it('should not be able to save an Lead if no topic is provided', function (done) {
    // Invalidate topic field
    lead.topic = '';

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

        // Save a new Lead
        agent.post('/api/leads')
          .send(lead)
          .expect(400)
          .end(function (leadSaveErr, leadSaveRes) {
            // Set message assertion
            (leadSaveRes.body.message).should.match('Please fill topic');

            // Handle Lead save error
            done(leadSaveErr);
          });
      });
  });

  it('should be able to update an Lead if signed in', function (done) {
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

        // Save a new Lead
        agent.post('/api/leads')
          .send(lead)
          .expect(200)
          .end(function (leadSaveErr, leadSaveRes) {
            // Handle Lead save error
            if (leadSaveErr) {
              return done(leadSaveErr);
            }

            // Update Lead topic
            lead.topic = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Lead
            agent.put('/api/leads/' + leadSaveRes.body._id)
              .send(lead)
              .expect(200)
              .end(function (leadUpdateErr, leadUpdateRes) {
                // Handle Lead update error
                if (leadUpdateErr) {
                  return done(leadUpdateErr);
                }

                // Set assertions
                (leadUpdateRes.body._id).should.equal(leadSaveRes.body._id);
                (leadUpdateRes.body.topic).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Leads if not signed in', function (done) {
    // Create new Lead model instance
    var leadObj = new Lead(lead);

    // Save the lead
    leadObj.save(function () {
      // Request Leads
      request(app).get('/api/leads')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Lead if not signed in', function (done) {
    // Create new Lead model instance
    var leadObj = new Lead(lead);

    // Save the Lead
    leadObj.save(function () {
      request(app).get('/api/leads/' + leadObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('topic', lead.topic);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Lead with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/leads/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Lead is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Lead which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Lead
    request(app).get('/api/leads/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Lead with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Lead if signed in', function (done) {
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

        // Save a new Lead
        agent.post('/api/leads')
          .send(lead)
          .expect(200)
          .end(function (leadSaveErr, leadSaveRes) {
            // Handle Lead save error
            if (leadSaveErr) {
              return done(leadSaveErr);
            }

            // Delete an existing Lead
            agent.delete('/api/leads/' + leadSaveRes.body._id)
              .send(lead)
              .expect(200)
              .end(function (leadDeleteErr, leadDeleteRes) {
                // Handle lead error error
                if (leadDeleteErr) {
                  return done(leadDeleteErr);
                }

                // Set assertions
                (leadDeleteRes.body._id).should.equal(leadSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Lead if not signed in', function (done) {
    // Set Lead user
    lead.user = user;

    // Create new Lead model instance
    var leadObj = new Lead(lead);

    // Save the Lead
    leadObj.save(function () {
      // Try deleting Lead
      request(app).delete('/api/leads/' + leadObj._id)
        .expect(403)
        .end(function (leadDeleteErr, leadDeleteRes) {
          // Set message assertion
          (leadDeleteRes.body.message).should.match('User is not authorized');

          // Handle Lead error error
          done(leadDeleteErr);
        });

    });
  });

  it('should be able to get a single Lead that has an orphaned user reference', function (done) {
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
      provider: 'local'
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

          // Save a new Lead
          agent.post('/api/leads')
            .send(lead)
            .expect(200)
            .end(function (leadSaveErr, leadSaveRes) {
              // Handle Lead save error
              if (leadSaveErr) {
                return done(leadSaveErr);
              }

              // Set assertions on new Lead
              (leadSaveRes.body.topic).should.equal(lead.topic);
              should.exist(leadSaveRes.body.user);
              should.equal(leadSaveRes.body.user._id, orphanId);

              // force the Lead to have an orphaned user reference
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

                    // Get the Lead
                    agent.get('/api/leads/' + leadSaveRes.body._id)
                      .expect(200)
                      .end(function (leadInfoErr, leadInfoRes) {
                        // Handle Lead error
                        if (leadInfoErr) {
                          return done(leadInfoErr);
                        }

                        // Set assertions
                        (leadInfoRes.body._id).should.equal(leadSaveRes.body._id);
                        (leadInfoRes.body.topic).should.equal(lead.topic);
                        should.equal(leadInfoRes.body.user, undefined);

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
      Lead.remove().exec(done);
    });
  });
});
