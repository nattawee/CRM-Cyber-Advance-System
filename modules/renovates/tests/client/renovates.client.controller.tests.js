(function () {
  'use strict';

  describe('Renovates Controller Tests', function () {
    // Initialize global variables
    var RenovatesController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      RenovatesService,
      mockRenovate;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _RenovatesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      RenovatesService = _RenovatesService_;

      // create mock Renovate
      mockRenovate = new RenovatesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Renovate Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Renovates controller.
      RenovatesController = $controller('RenovatesController as vm', {
        $scope: $scope,
        renovateResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleRenovatePostData;

      beforeEach(function () {
        // Create a sample Renovate object
        sampleRenovatePostData = new RenovatesService({
          name: 'Renovate Name'
        });

        $scope.vm.renovate = sampleRenovatePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (RenovatesService) {
        // Set POST response
        $httpBackend.expectPOST('api/renovates', sampleRenovatePostData).respond(mockRenovate);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Renovate was created
        expect($state.go).toHaveBeenCalledWith('renovates.list');
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/renovates', sampleRenovatePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Renovate in $scope
        $scope.vm.renovate = mockRenovate;
      });

      it('should update a valid Renovate', inject(function (RenovatesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/renovates\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('renovates.list');
      }));

      it('should set $scope.vm.error if error', inject(function (RenovatesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/renovates\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Renovates
        $scope.vm.renovate = mockRenovate;
      });

      it('should delete the Renovate and redirect to Renovates', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/renovates\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('renovates.list');
      });

      it('should should not delete the Renovate and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
