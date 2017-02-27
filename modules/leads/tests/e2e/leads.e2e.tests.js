'use strict';

describe('Leads E2E Tests:', function () {
  describe('Test Leads page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/leads');
      expect(element.all(by.repeater('lead in leads')).count()).toEqual(0);
    });
  });
});
