'use strict';
describe('controller: Home', function() {
  beforeEach(module('risevision.apps.launcher.controllers'));
  var $scope, localStorageService, localStorageGetSpy;
  beforeEach(function(){
    module(function ($provide) {
      $provide.service('localStorageService', function() {
        return localStorageService = {
          get: function() { return false; },
          set: function(){}
        };
      });      
    })
    inject(function($injector,$rootScope, $controller, localStorageService){
      localStorageGetSpy = sinon.spy(localStorageService,'get');
      $scope = $rootScope.$new();
      $controller('HomeCtrl', {
        $scope: $scope,
        launcherTracker: function(){},
        editorFactory: function(){},
      });
      $scope.$digest();
    });
  });
  it('should exist',function(){
    expect($scope).to.be.ok;
    expect($scope.launcherTracker).to.be.ok;
    expect($scope.editorFactory).to.be.ok;
    expect($scope.showHelp).to.be.false;

    expect($scope.toggleHelp).to.be.a('function');
  });

  it("should init showHelp from localstorage",function(){
    localStorageGetSpy.should.have.been.calledWith("launcher.showHelp");
  });

  describe("toggleHelp:",function(){
    it("should toggle showHelp",function(){
      $scope.toggleHelp();
      expect($scope.showHelp).to.be.true;
      $scope.toggleHelp();
      expect($scope.showHelp).to.be.false;
    });

    it("should persist showHelp value",function(){
      var spy = sinon.spy(localStorageService,'set');
      $scope.toggleHelp();
      spy.should.have.been.calledWith("launcher.showHelp",true);
      $scope.toggleHelp();
      spy.should.have.been.calledWith("launcher.showHelp",false);
    });
  });
});
