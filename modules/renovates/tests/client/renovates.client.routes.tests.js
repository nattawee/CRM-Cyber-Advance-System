(function () {
  'use strict';

  describe('Renovates Route Tests', function () {
    // Initialize global variables
    var $scope,
      RenovatesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _RenovatesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      RenovatesService = _RenovatesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('renovates');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/renovates');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          RenovatesController,
          mockRenovate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('renovates.view');
          $templateCache.put('modules/renovates/client/views/view-renovate.client.view.html', '');

          // create mock Renovate
          mockRenovate = new RenovatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Renovate Name'
          });

          // Initialize Controller
          RenovatesController = $controller('RenovatesController as vm', {
            $scope: $scope,
            renovateResolve: mockRenovate
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:renovateId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.renovateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            renovateId: 1
          })).toEqual('/renovates/1');
        }));

        it('should attach an Renovate to the controller scope', function () {
          expect($scope.vm.renovate._id).toBe(mockRenovate._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/renovates/client/views/view-renovate.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          RenovatesController,
          mockRenovate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('renovates.create');
          $templateCache.put('modules/renovates/client/views/form-renovate.client.view.html', '');

          // create mock Renovate
          mockRenovate = new RenovatesService();

          // Initialize Controller
          RenovatesController = $controller('RenovatesController as vm', {
            $scope: $scope,
            renovateResolve: mockRenovate
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.renovateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/renovates/create');
        }));

        it('should attach an Renovate to the controller scope', function () {
          expect($scope.vm.renovate._id).toBe(mockRenovate._id);
          expect($scope.vm.renovate._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/renovates/client/views/form-renovate.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          RenovatesController,
          mockRenovate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('renovates.edit');
          $templateCache.put('modules/renovates/client/views/form-renovate.client.view.html', '');

          // create mock Renovate
          mockRenovate = new RenovatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Renovate Name'
          });

          // Initialize Controller
          RenovatesController = $controller('RenovatesController as vm', {
            $scope: $scope,
            renovateResolve: mockRenovate
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:renovateId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.renovateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            renovateId: 1
          })).toEqual('/renovates/1/edit');
        }));

        it('should attach an Renovate to the controller scope', function () {
          expect($scope.vm.renovate._id).toBe(mockRenovate._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/renovates/client/views/form-renovate.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
