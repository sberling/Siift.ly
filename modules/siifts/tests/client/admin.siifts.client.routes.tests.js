(function () {
  'use strict';

  describe('Siifts Route Tests', function () {
    // Initialize global variables
    var $scope,
      SiiftsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SiiftsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SiiftsService = _SiiftsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('admin.siifts');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/siifts');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('admin.siifts.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('modules/siifts/client/views/admin/list-siifts.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SiiftsAdminController,
          mockSiift;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.siifts.create');
          $templateCache.put('modules/siifts/client/views/admin/form-siift.client.view.html', '');

          // Create mock siift
          mockSiift = new SiiftsService();

          // Initialize Controller
          SiiftsAdminController = $controller('SiiftsAdminController as vm', {
            $scope: $scope,
            siiftResolve: mockSiift
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.siiftResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/siifts/create');
        }));

        it('should attach an siift to the controller scope', function () {
          expect($scope.vm.siift._id).toBe(mockSiift._id);
          expect($scope.vm.siift._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/siifts/client/views/admin/form-siift.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SiiftsAdminController,
          mockSiift;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.siifts.edit');
          $templateCache.put('modules/siifts/client/views/admin/form-siift.client.view.html', '');

          // Create mock siift
          mockSiift = new SiiftsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Siift about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          SiiftsAdminController = $controller('SiiftsAdminController as vm', {
            $scope: $scope,
            siiftResolve: mockSiift
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:siiftId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.siiftResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            siiftId: 1
          })).toEqual('/admin/siifts/1/edit');
        }));

        it('should attach an siift to the controller scope', function () {
          expect($scope.vm.siift._id).toBe(mockSiift._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/siifts/client/views/admin/form-siift.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
