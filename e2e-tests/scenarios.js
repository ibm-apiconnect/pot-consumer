'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /inventory when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/inventory");
  });


  describe('inventory', function() {

    beforeEach(function() {
      browser.get('index.html#!/inventory');
    });


    it('should render inventory when user navigates to /inventory', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for inventory/);
    });

  });
});
