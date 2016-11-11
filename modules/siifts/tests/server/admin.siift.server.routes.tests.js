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
describe('Siift Admin CRUD tests', function () {
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
      roles: ['user', 'admin'],
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

  it('should be able to save an siift if logged in', function (done) {
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

        // Save a new siift
        agent.post('/api/siifts')
          .send(siift)
          .expect(200)
          .end(function (siiftSaveErr, siiftSaveRes) {
            // Handle siift save error
            if (siiftSaveErr) {
              return done(siiftSaveErr);
            }

            // Get a list of siifts
            agent.get('/api/siifts')
              .end(function (siiftsGetErr, siiftsGetRes) {
                // Handle siift save error
                if (siiftsGetErr) {
                  return done(siiftsGetErr);
                }

                // Get siifts list
                var siifts = siiftsGetRes.body;

                // Set assertions
                (siifts[0].user._id).should.equal(userId);
                (siifts[0].title).should.match('Siift Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an siift if signed in', function (done) {
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

        // Save a new siift
        agent.post('/api/siifts')
          .send(siift)
          .expect(200)
          .end(function (siiftSaveErr, siiftSaveRes) {
            // Handle siift save error
            if (siiftSaveErr) {
              return done(siiftSaveErr);
            }

            // Update siift title
            siift.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing siift
            agent.put('/api/siifts/' + siiftSaveRes.body._id)
              .send(siift)
              .expect(200)
              .end(function (siiftUpdateErr, siiftUpdateRes) {
                // Handle siift update error
                if (siiftUpdateErr) {
                  return done(siiftUpdateErr);
                }

                // Set assertions
                (siiftUpdateRes.body._id).should.equal(siiftSaveRes.body._id);
                (siiftUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an siift if no title is provided', function (done) {
    // Invalidate title field
    siift.title = '';

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

        // Save a new siift
        agent.post('/api/siifts')
          .send(siift)
          .expect(400)
          .end(function (siiftSaveErr, siiftSaveRes) {
            // Set message assertion
            (siiftSaveRes.body.message).should.match('Title cannot be blank');

            // Handle siift save error
            done(siiftSaveErr);
          });
      });
  });

  it('should be able to delete an siift if signed in', function (done) {
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

        // Save a new siift
        agent.post('/api/siifts')
          .send(siift)
          .expect(200)
          .end(function (siiftSaveErr, siiftSaveRes) {
            // Handle siift save error
            if (siiftSaveErr) {
              return done(siiftSaveErr);
            }

            // Delete an existing siift
            agent.delete('/api/siifts/' + siiftSaveRes.body._id)
              .send(siift)
              .expect(200)
              .end(function (siiftDeleteErr, siiftDeleteRes) {
                // Handle siift error error
                if (siiftDeleteErr) {
                  return done(siiftDeleteErr);
                }

                // Set assertions
                (siiftDeleteRes.body._id).should.equal(siiftSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single siift if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new siift model instance
    siift.user = user;
    var siiftObj = new Siift(siift);

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

        // Save a new siift
        agent.post('/api/siifts')
          .send(siift)
          .expect(200)
          .end(function (siiftSaveErr, siiftSaveRes) {
            // Handle siift save error
            if (siiftSaveErr) {
              return done(siiftSaveErr);
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

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (siiftInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
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
