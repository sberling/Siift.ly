'use strict';

describe('Siifts E2E Tests:', function () {
  describe('Test siifts page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/siifts');
      expect(element.all(by.repeater('siift in siifts')).count()).toEqual(0);
    });
  });
});
