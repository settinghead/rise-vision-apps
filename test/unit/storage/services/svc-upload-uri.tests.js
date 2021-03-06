'use strict';
describe('service: UploadURIService', function() {
  beforeEach(module('risevision.storage.services'));
  beforeEach(module(function ($provide) {
    $provide.service('$q', function() {return Q;});
    
    $provide.factory('storage',function () {
      return {
        getResumableUploadURI: function(fileName, fileType) {            
          var def = Q.defer();
          if (returnResult) {
            def.resolve({
              result: {}
            });
          } else {
            def.reject("API Failed");
          }
          return def.promise;
        },

        notifyGCMTargetsChanged: function(files) {            
          var def = Q.defer();
          if (returnResult) {
            def.resolve({
              result: {}
            });
          } else {
            def.reject("API Failed");
          }
          return def.promise;
        }
      };
    }); 
  }));
  var uploadURIService, storage, returnResult, $rootScope, storageRequestObj;
  beforeEach(function(){
    returnResult = true;
    
    inject(function($injector){
      $rootScope = $injector.get('$rootScope');      
      storage = $injector.get('storage');
      uploadURIService = $injector.get('UploadURIService');
    });
  });

  it('should exist',function(){
    expect(uploadURIService).to.be.truely;
    expect(uploadURIService.getURI).to.be.a('function');
    expect(uploadURIService.notifyGCMTargetsChanged).to.be.a('function');
  });
  
  describe('getURI:',function(){
    it('should get Resumable Upload URI',function(done){
      var spy = sinon.spy(storage,'getResumableUploadURI');
      var file = {name: "fileName", type: "fileType"};
      uploadURIService.getURI(file)
        .then(function(result){
          expect(result).to.be.truely;
          spy.should.have.been.calledWith("fileName","fileType")

          done();
        })
        .then(null,done);
    });

    it("should handle failure to get Resumable Upload URI",function(done){
      returnResult = false;

      var file = {name: "fileName", type: "fileType"};
      uploadURIService.getURI(file).then(function(result) {
        done(result);
      })
      .then(null, function(error) {
        expect(error).to.deep.equal('API Failed');
        done();
      })
      .then(null,done);
    });
  });

  
  describe('notifyGCMTargetsChanged:',function(){
    it('should call storage GCM Targets Changed',function(done){
      var spy = sinon.spy(storage,'notifyGCMTargetsChanged');
      var files = ["file1","file2"]
      uploadURIService.notifyGCMTargetsChanged(files)
        .then(function(result){
          expect(result).to.be.truely;
          spy.should.have.been.calledWith(files);

          done();
        })
        .then(null,done);
    });

    it("should handle failure to notify GCM Targets Changed",function(done){
      returnResult = false;
      var files = ["file1","file2"]
      uploadURIService.notifyGCMTargetsChanged(files)
        .then(function(result) {
          done(result);
        })
        .then(null, function(error) {
          expect(error).to.deep.equal('API Failed');
          done();
        })
        .then(null,done);
    });
  });

});
