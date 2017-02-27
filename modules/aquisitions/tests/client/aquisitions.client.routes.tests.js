(function () {
  'use strict';

  describe('Aquisitions Route Tests', function () {
    // Initialize global variables
    var $scope,
      AquisitionsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AquisitionsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AquisitionsService = _AquisitionsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('aquisitions');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/aquisitions');
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
          AquisitionsController,
          mockAquisition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('aquisitions.view');
          $templateCache.put('modules/aquisitions/client/views/view-aquisition.client.view.html', '');

          // create mock Aquisition
          mockAquisition = new AquisitionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Aquisition Name'
          });

          // Initialize Controller
          AquisitionsController = $controller('AquisitionsController as vm', {
            $scope: $scope,
            aquisitionResolve: mockAquisition
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:aquisitionId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.aquisitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            aquisitionId: 1
          })).toEqual('/aquisitions/1');
        }));

        it('should attach an Aquisition to the controller scope', function () {
          expect($scope.vm.aquisition._id).toBe(mockAquisition._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/aquisitions/client/views/view-aquisition.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AquisitionsController,
          mockAquisition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('aquisitions.create');
          $templateCache.put('modules/aquisitions/client/views/form-aquisition.client.view.html', '');

          // create mock Aquisition
          mockAquisition = new AquisitionsService();

          // Initialize Controller
          AquisitionsController = $controller('AquisitionsController as vm', {
            $scope: $scope,
            aquisitionResolve: mockAquisition
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.aquisitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/aquisitions/create');
        }));

        it('should attach an Aquisition to the controller scope', function () {
          expect($scope.vm.aquisition._id).toBe(mockAquisition._id);
          expect($scope.vm.aquisition._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/aquisitions/client/views/form-aquisition.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AquisitionsController,
          mockAquisition;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('aquisitions.edit');
          $templateCache.put('modules/aquisitions/client/views/form-aquisition.client.view.html', '');

          // create mock Aquisition
          mockAquisition = new AquisitionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Aquisition Name'
          });

          // Initialize Controller
          AquisitionsController = $controller('AquisitionsController as vm', {
            $scope: $scope,
            aquisitionResolve: mockAquisition
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:aquisitionId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.aquisitionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            aquisitionId: 1
          })).toEqual('/aquisitions/1/edit');
        }));

        it('should attach an Aquisition to the controller scope', function () {
          expect($scope.vm.aquisition._id).toBe(mockAquisition._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/aquisitions/client/views/form-aquisition.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
