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
          mainstate = $state.get('siifts');
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
          liststate = $state.get('siifts.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('modules/siifts/client/views/list-siifts.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          SiiftsController,
          mockSiift;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('siifts.view');
          $templateCache.put('modules/siifts/client/views/view-siift.client.view.html', '');

          // create mock siift
          mockSiift = new SiiftsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Siift about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          SiiftsController = $controller('SiiftsController as vm', {
            $scope: $scope,
            siiftResolve: mockSiift
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:siiftId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.siiftResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            siiftId: 1
          })).toEqual('/siifts/1');
        }));

        it('should attach an siift to the controller scope', function () {
          expect($scope.vm.siift._id).toBe(mockSiift._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/siifts/client/views/view-siift.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope) {
          $state.go('siifts.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('siifts/');
          $rootScope.$digest();

          expect($location.path()).toBe('/siifts');
          expect($state.current.templateUrl).toBe('modules/siifts/client/views/list-siifts.client.view.html');
        }));
      });
    });
  });
}());
