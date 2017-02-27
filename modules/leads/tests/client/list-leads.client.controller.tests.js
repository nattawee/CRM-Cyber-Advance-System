(function () {
  'use strict';

  describe('Leads List Controller Tests', function () {
    // Initialize global variables
    var LeadsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      LeadsService,
      mockLead;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _LeadsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      LeadsService = _LeadsService_;

      // create mock article
      mockLead = new LeadsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Lead Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Leads List controller.
      LeadsListController = $controller('LeadsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockLeadList;

      beforeEach(function () {
        mockLeadList = [mockLead, mockLead];
      });

      it('should send a GET request and return all Leads', inject(function (LeadsService) {
        // Set POST response
        $httpBackend.expectGET('api/leads').respond(mockLeadList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.leads.length).toEqual(2);
        expect($scope.vm.leads[0]).toEqual(mockLead);
        expect($scope.vm.leads[1]).toEqual(mockLead);

      }));
    });
  });
}());
