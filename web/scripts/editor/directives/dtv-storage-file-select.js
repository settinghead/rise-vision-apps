(function () {

  'use strict';

  angular.module('risevision.editor.directives')
    .directive('fileSelect', [function () {
      return {
        link: function (scope, element, attributes) {
          element.bind('change', function () {
            console.log(this.files.length);
            scope.$emit("filesPicked", this.files);
          });
        }
      };
    }]);
})();