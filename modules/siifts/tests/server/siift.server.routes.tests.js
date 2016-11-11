'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Siift = mongoose.model('Siift'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  siift;

/**
 * Siift routes tests
 */
describe('Siift CRUD tests', function () {

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

    // Save a user to the test db and create new siift
    user.save(function () {
      siift = {
        title: 'Siift Title',
        content: 'Siift Content'
      };

      done();
    });
  });

  it('should not be able to save an siift if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/siifts')
          .send(siift)
          .expect(403)
          .end(function (siiftSaveErr, siiftSaveRes) {
            // Call the assertion callback
            done(siiftSaveErr);
          });

      });
  });

  it('should not be able to save an siift if not logged in', function (done) {
    agent.post('/api/siifts')
      .send(siift)
      .expect(403)
      .end(function (siiftSaveErr, siiftSaveRes) {
        // Call the assertion callback
        done(siiftSaveErr);
      });
  });

  it('should not be able to update an siift if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/siifts')
          .send(siift)
          .expect(403)
          .end(function (siiftSaveErr, siiftSaveRes) {
            // Call the assertion callback
            done(siiftSaveErr);
          });
      });
  });

  it('should be able to get a list of siifts if not signed in', function (done) {
    // Create new siift model instance
    var siiftObj = new Siift(siift);

    // Save the siift
    siiftObj.save(function () {
      // Request siifts
      request(app).get('/api/siifts')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single siift if not signed in', function (done) {
    // Create new siift model instance
    var siiftObj = new Siift(siift);

    // Save the siift
    siiftObj.save(function () {
      request(app).get('/api/siifts/' + siiftObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', siift.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single siift with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/siifts/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Siift is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single siift which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent siift
    request(app).get('/api/siifts/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No siift with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an siift if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/siifts')
          .send(siift)
          .expect(403)
          .end(function (siiftSaveErr, siiftSaveRes) {
            // Call the assertion callback
            done(siiftSaveErr);
          });
      });
  });

  it('should not be able to delete an siift if not signed in', function (done) {
    // Set siift user
    siift.user = user;

    // Create new siift model instance
    var siiftObj = new Siift(siift);

    // Save the siift
    siiftObj.save(function () {
      // Try deleting siift
      request(app).delete('/api/siifts/' + siiftObj._id)
        .expect(403)
        .end(function (siiftDeleteErr, siiftDeleteRes) {
          // Set message assertion
          (siiftDeleteRes.body.message).should.match('User is not authorized');

          // Handle siift error error
          done(siiftDeleteErr);
        });

    });
  });

  it('should be able to get a single siift that has an orphaned user reference', function (done) {
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
      roles: ['admin']
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

          // Save a new siift
          agent.post('/api/siifts')
            .send(siift)
            .expect(200)
            .end(function (siiftSaveErr, siiftSaveRes) {
              // Handle siift save error
              if (siiftSaveErr) {
                return done(siiftSaveErr);
              }

              // Set assertions on new siift
              (siiftSaveRes.body.title).should.equal(siift.title);
              should.exist(siiftSaveRes.body.user);
              should.equal(siiftSaveRes.body.user._id, orphanId);

              // force the siift to have an orphaned user reference
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

                    // Get the siift
                    agent.get('/api/siifts/' + siiftSaveRes.body._id)
                      .expect(200)
                      .end(function (siiftInfoErr, siiftInfoRes) {
                        // Handle siift error
                        if (siiftInfoErr) {
                          return done(siiftInfoErr);
                        }

                        // Set assertions
                        (siiftInfoRes.body._id).should.equal(siiftSaveRes.body._id);
                        (siiftInfoRes.body.title).should.equal(siift.title);
                        should.equal(siiftInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single siift if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new siift model instance
    var siiftObj = new Siift(siift);

    // Save the siift
    siiftObj.save(function () {
      request(app).get('/api/siifts/' + siiftObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', siift.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single siift, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      username: 'siiftowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Siift
    var _siiftOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _siiftOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Siift
      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = _user._id;

          // Save a new siift
          agent.post('/api/siifts')
            .send(siift)
            .expect(200)
            .end(function (siiftSaveErr, siiftSaveRes) {
              // Handle siift save error
              if (siiftSaveErr) {
                return done(siiftSaveErr);
              }

              // Set assertions on new siift
              (siiftSaveRes.body.title).should.equal(siift.title);
              should.exist(siiftSaveRes.body.user);
              should.equal(siiftSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the siift
                  agent.get('/api/siifts/' + siiftSaveRes.body._id)
                    .expect(200)
                    .end(function (siiftInfoErr, siiftInfoRes) {
                      // Handle siift error
                      if (siiftInfoErr) {
                        return done(siiftInfoErr);
                      }

                      // Set assertions
                      (siiftInfoRes.body._id).should.equal(siiftSaveRes.body._id);
                      (siiftInfoRes.body.title).should.equal(siift.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (siiftInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Siift.remove().exec(done);
    });
  });
});
