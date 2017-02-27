'use strict';

describe('Aquisitions E2E Tests:', function () {
  describe('Test Aquisitions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/aquisitions');
      expect(element.all(by.repeater('aquisition in aquisitions')).count()).toEqual(0);
    });
  });
});
