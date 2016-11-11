(function (app) {
  'use strict';

  app.registerModule('siifts', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('siifts.admin', ['core.admin']);
  app.registerModule('siifts.admin.routes', ['core.admin.routes']);
  app.registerModule('siifts.services');
  app.registerModule('siifts.routes', ['ui.router', 'core.routes', 'siifts.services']);
}(ApplicationConfiguration));
