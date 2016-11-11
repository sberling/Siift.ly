'use strict';

/**
 * Module dependencies
 */
var siiftsPolicy = require('../policies/siifts.server.policy'),
  siifts = require('../controllers/siifts.server.controller');

module.exports = function (app) {
  // Siifts collection routes
  app.route('/api/siifts').all(siiftsPolicy.isAllowed)
    .get(siifts.list)
    .post(siifts.create);

  // Single siift routes
  app.route('/api/siifts/:siiftId').all(siiftsPolicy.isAllowed)
    .get(siifts.read)
    .put(siifts.update)
    .delete(siifts.delete);

  // Finish by binding the siift middleware
  app.param('siiftId', siifts.siiftByID);
};
