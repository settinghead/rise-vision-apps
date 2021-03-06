'use strict';
describe('directive: storage-file-select', function() {
  var $rootScope, element, $compile, storageFactory;

  beforeEach(module('risevision.storage.directives'));
  beforeEach(module(function ($provide) {
    $provide.service('storageFactory', function() {
      return {
        fileIsVideo: function() {
          return false;
        },
        fileIsImage: function() {
          return true;
        },
        fileIsFolder: function() {
          return false;
        },
        canSelect: function() {
          return true;
        },
        isDisabled: function() {
          return false;
        },
        fileIsTrash: function() {
          return false;
        }
      };
    });
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, $injector){    
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    storageFactory = $injector.get('storageFactory');

    $rootScope.file = {
      name: "file1.jpg",
      metadata: {
        thumbnail: 'http://example.com/thumb.jpg'
      }
    };
  }));

  var _compile = function() {
    element = $compile('<li thumbnail-image></li>')($rootScope);
    $rootScope.$apply();
  }

  it('should render thumbnail', function() {
    _compile();
    expect(element.scope().isSvg).to.be.false;
    expect(element.scope().imgSrc).to.equal('http://example.com/thumb.jpg=s100-ci');
    expect(element.scope().imgClasses).to.equal('');
  });

  it('should flag thorttled file',function() {
    $rootScope.file.isThrottled = true;
    _compile();
    expect(element.scope().isSvg).to.be.false;
    expect(element.scope().imgSrc).to.equal('http://s3.amazonaws.com/Rise-Images/Icons/file_throttled.png');
    expect(element.scope().imgClasses).to.equal('');
  });

  it('should render folders',function() {
    storageFactory.fileIsFolder = function() {return true};
    _compile();
    expect(element.scope().isSvg).to.be.true;
    expect(element.scope().imgSrc).to.equal('riseWidgetFolder');
    expect(element.scope().imgClasses).to.equal('');
  });

  it('should show image icon when no thumbnail',function(){
    $rootScope.file.metadata = {};
    _compile();
    expect(element.scope().isSvg).to.be.true;
    expect(element.scope().imgSrc).to.equal('riseWidgetImage');
    expect(element.scope().imgClasses).to.equal('');
  });

  it('should show video icon for videos',function(){
    $rootScope.file.metadata = {};
    storageFactory.fileIsVideo = function() {return true};
    storageFactory.fileIsImage = function() {return false};
    _compile();
    expect(element.scope().isSvg).to.be.true;
    expect(element.scope().imgSrc).to.equal('riseWidgetVideo');
    expect(element.scope().imgClasses).to.equal('');
  });

  it('should add disabled class is can\'t select file',function() {
    storageFactory.canSelect = function() {return false};
    _compile();
    expect(element.scope().isSvg).to.be.false;
    expect(element.scope().imgClasses).to.equal('disabled');
  });


  describe('gridItemClasses:',function() {
    it('should add class for file',function(){
      _compile();
      expect(element.scope().gridItemClasses).to.contain('single-item');
      expect(element.scope().gridItemClasses).to.not.contain('folder');
    });

    it('should add class for folder',function(){
      storageFactory.fileIsFolder = function() {return true};
      _compile();
      expect(element.scope().gridItemClasses).to.not.contain('single-item');
      expect(element.scope().gridItemClasses).to.contain('folder');
    });

    it('should flag throttled files',function(){
      $rootScope.file.isThrottled = true;
      _compile();
      expect(element.scope().gridItemClasses).to.contain('single-item');
      expect(element.scope().gridItemClasses).to.contain('throttled-item');
    });

    it('should flag disabled files',function(){
      storageFactory.canSelect = function() {return false};
      _compile();
      expect(element.scope().gridItemClasses).to.contain('disabled-item');
      expect(element.scope().gridItemClasses).to.not.contain('throttled-item');
    });

    it('should flag checked files',function(){
      $rootScope.file.isChecked = true;
      _compile();
      expect(element.scope().gridItemClasses).to.contain('single-item');
      expect(element.scope().gridItemClasses).to.contain('selected-border');
    });

    it('should flag checked folders',function(){
      storageFactory.fileIsFolder = function() {return true};
      $rootScope.file.isChecked = true;
      _compile();
      expect(element.scope().gridItemClasses).to.contain('folder');
      expect(element.scope().gridItemClasses).to.contain('folder-extended');
      expect(element.scope().gridItemClasses).to.contain('selected-border');
    });

  });

});
