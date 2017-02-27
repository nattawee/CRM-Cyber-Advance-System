'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  General = mongoose.model('General'),
  Branch = mongoose.model('Branch'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  branch,
  user,
  general;

/**
 * General routes tests
 */
describe('General CRUD tests', function () {

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
    branch = new Branch({
      name: 'Branch Name',
      user: user
    });

    // Save a user to the test db and create new General
    user.save(function () {
      general = {
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
        purchase: {
          amount: 11,
          apprvdate: Date.now(),
          approver: 'approver'
        },
        status: 'draft',
      };

      done();
    });
  });

  it('should be able to save a General if logged in', function (done) {
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

        // Save a new General
        agent.post('/api/generals')
          .send(general)
          .expect(200)
          .end(function (generalSaveErr, generalSaveRes) {
            // Handle General save error
            if (generalSaveErr) {
              return done(generalSaveErr);
            }

            // Get a list of Generals
            agent.get('/api/generals')
              .end(function (generalsGetErr, generalsGetRes) {
                // Handle Generals save error
                if (generalsGetErr) {
                  return done(generalsGetErr);
                }

                // Get Generals list
                var generals = generalsGetRes.body;

                // Set assertions
                (generals[0].user._id).should.equal(userId);
                (generals[0].docno).should.match('PO-01');
                (generals[0].status).should.match('draft');


                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an General if not logged in', function (done) {
    agent.post('/api/generals')
      .send(general)
      .expect(403)
      .end(function (generalSaveErr, generalSaveRes) {
        // Call the assertion callback
        done(generalSaveErr);
      });
  });

  // it('should not be able to save an General if no docno is provided', function (done) {
  //   // Invalidate name field
  //   general.docno = '';

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

  //       // Save a new General
  //       agent.post('/api/generals')
  //         .send(general)
  //         .expect(400)
  //         .end(function (generalSaveErr, generalSaveRes) {
  //           // Set message assertion
  //           (generalSaveRes.body.message).should.match('Please fill General docno');

  //           // Handle General save error
  //           done(generalSaveErr);
  //         });
  //     });
  // });

  // it('should not be able to save an General if no trnsdate is provided', function (done) {
  //   // Invalidate name field
  //   general.trnsdate = null;

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

  //       // Save a new General
  //       agent.post('/api/generals')
  //         .send(general)
  //         .expect(400)
  //         .end(function (generalSaveErr, generalSaveRes) {
  //           // Set message assertion
  //           (generalSaveRes.body.message).should.match('Please fill General trnsdate');

  //           // Handle General save error
  //           done(generalSaveErr);
  //         });
  //     });
  // });

  // it('should not be able to save an General if no itemdesc is provided', function (done) {
  //   // Invalidate name field
  //   general.itemdesc = '';

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

  //       // Save a new General
  //       agent.post('/api/generals')
  //         .send(general)
  //         .expect(400)
  //         .end(function (generalSaveErr, generalSaveRes) {
  //           // Set message assertion
  //           (generalSaveRes.body.message).should.match('Please fill General itemdesc');

  //           // Handle General save error
  //           done(generalSaveErr);
  //         });
  //     });
  // });

  // it('should not be able to save an General if no department is provided', function (done) {
  //   // Invalidate name field
  //   general.department = '';

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

  //       // Save a new General
  //       agent.post('/api/generals')
  //         .send(general)
  //         .expect(400)
  //         .end(function (generalSaveErr, generalSaveRes) {
  //           // Set message assertion
  //           (generalSaveRes.body.message).should.match('Please fill General department');

  //           // Handle General save error
  //           done(generalSaveErr);
  //         });
  //     });
  // });

  // it('should not be able to save an General if no owner is provided', function (done) {
  //   // Invalidate name field
  //   general.owner = '';

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

  //       // Save a new General
  //       agent.post('/api/generals')
  //         .send(general)
  //         .expect(400)
  //         .end(function (generalSaveErr, generalSaveRes) {
  //           // Set message assertion
  //           (generalSaveRes.body.message).should.match('Please fill General owner');

  //           // Handle General save error
  //           done(generalSaveErr);
  //         });
  //     });
  // });

  // it('should not be able to save an General if no estimate amount is provided', function (done) {
  //   // Invalidate name field
  //   general.estexpense.amount = null;

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

  //       // Save a new General
  //       agent.post('/api/generals')
  //         .send(general)
  //         .expect(400)
  //         .end(function (generalSaveErr, generalSaveRes) {
  //           // Set message assertion
  //           (generalSaveRes.body.message).should.match('Please fill General amount');

  //           // Handle General save error
  //           done(generalSaveErr);
  //         });
  //     });
  // });

  // it('should not be able to save an General if no estimate approved date is provided', function (done) {
  //   // Invalidate name field
  //   general.estexpense.apprvdate = null;

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

  //       // Save a new General
  //       agent.post('/api/generals')
  //         .send(general)
  //         .expect(400)
  //         .end(function (generalSaveErr, generalSaveRes) {
  //           // Set message assertion
  //           (generalSaveRes.body.message).should.match('Please fill General apprvdate');

  //           // Handle General save error
  //           done(generalSaveErr);
  //         });
  //     });
  // });

  // it('should not be able to save an General if no estimate approver is provided', function (done) {
  //   // Invalidate name field
  //   general.estexpense.approver = null;

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

  //       // Save a new General
  //       agent.post('/api/generals')
  //         .send(general)
  //         .expect(400)
  //         .end(function (generalSaveErr, generalSaveRes) {
  //           // Set message assertion
  //           (generalSaveRes.body.message).should.match('Please fill General approver');

  //           // Handle General save error
  //           done(generalSaveErr);
  //         });
  //     });
  // });

  it('should be able to update an General if signed in', function (done) {
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

        // Save a new General
        agent.post('/api/generals')
          .send(general)
          .expect(200)
          .end(function (generalSaveErr, generalSaveRes) {
            // Handle General save error
            if (generalSaveErr) {
              return done(generalSaveErr);
            }

            // Update General name
            general.docno = 'PO-02';

            // Update an existing General
            agent.put('/api/generals/' + generalSaveRes.body._id)
              .send(general)
              .expect(200)
              .end(function (generalUpdateErr, generalUpdateRes) {
                // Handle General update error
                if (generalUpdateErr) {
                  return done(generalUpdateErr);
                }

                // Set assertions
                (generalUpdateRes.body._id).should.equal(generalSaveRes.body._id);
                (generalUpdateRes.body.docno).should.match('PO-02');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Generals if not signed in', function (done) {
    // Create new General model instance
    var generalObj = new General(general);

    // Save the general
    generalObj.save(function () {
      // Request Generals
      request(app).get('/api/generals')
        .end(function (req, res) {
          // Set assertion
          (res.body.message).should.match('User is not authorized');

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single General if not signed in', function (done) {
    // Create new General model instance
    var generalObj = new General(general);

    // Save the General
    generalObj.save(function () {
      request(app).get('/api/generals/' + generalObj._id)
        .end(function (req, res) {
          // Set assertion
          (res.body.message).should.match('User is not authorized');

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single General with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/generals/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'General is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single General which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent General
    request(app).get('/api/generals/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No General with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an General if signed in', function (done) {
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

        // Save a new General
        agent.post('/api/generals')
          .send(general)
          .expect(200)
          .end(function (generalSaveErr, generalSaveRes) {
            // Handle General save error
            if (generalSaveErr) {
              return done(generalSaveErr);
            }

            // Delete an existing General
            agent.delete('/api/generals/' + generalSaveRes.body._id)
              .send(general)
              .expect(200)
              .end(function (generalDeleteErr, generalDeleteRes) {
                // Handle general error error
                if (generalDeleteErr) {
                  return done(generalDeleteErr);
                }

                // Set assertions
                (generalDeleteRes.body._id).should.equal(generalSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an General if not signed in', function (done) {
    // Set General user
    general.user = user;

    // Create new General model instance
    var generalObj = new General(general);

    // Save the General
    generalObj.save(function () {
      // Try deleting General
      request(app).delete('/api/generals/' + generalObj._id)
        .expect(403)
        .end(function (generalDeleteErr, generalDeleteRes) {
          // Set message assertion
          (generalDeleteRes.body.message).should.match('User is not authorized');

          // Handle General error error
          done(generalDeleteErr);
        });

    });
  });

  it('should be able to get a single General that has an orphaned user reference', function (done) {
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

          // Save a new General
          agent.post('/api/generals')
            .send(general)
            .expect(200)
            .end(function (generalSaveErr, generalSaveRes) {
              // Handle General save error
              if (generalSaveErr) {
                return done(generalSaveErr);
              }

              // Set assertions on new General
              (generalSaveRes.body.docno).should.equal(general.docno);
              should.exist(generalSaveRes.body.user);
              should.equal(generalSaveRes.body.user._id, orphanId);

              // force the General to have an orphaned user reference
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

                    // Get the General
                    agent.get('/api/generals/' + generalSaveRes.body._id)
                      .expect(200)
                      .end(function (generalInfoErr, generalInfoRes) {
                        // Handle General error
                        if (generalInfoErr) {
                          return done(generalInfoErr);
                        }

                        // Set assertions
                        (generalInfoRes.body._id).should.equal(generalSaveRes.body._id);
                        (generalInfoRes.body.docno).should.equal(general.docno);
                        should.equal(generalInfoRes.body.user, undefined);

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
      General.remove().exec(done);
    });
  });
});
