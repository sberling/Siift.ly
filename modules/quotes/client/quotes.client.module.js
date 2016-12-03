(function (app) {
  'use strict';

  app.registerModule('quotes.services');
  app.registerModule('quotes.routes', ['ui.router', 'core.routes', 'quotes.services']);
}(ApplicationConfiguration));
