'use strict';

describe('Renovates E2E Tests:', function () {
  describe('Test Renovates page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/renovates');
      expect(element.all(by.repeater('renovate in renovates')).count()).toEqual(0);
    });
  });
});
