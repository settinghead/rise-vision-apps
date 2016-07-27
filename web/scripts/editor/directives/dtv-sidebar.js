'use strict';

angular.module('risevision.editor.directives')
  .directive('sidebar', ['placeholderFactory',
    function (placeholderFactory) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/editor/sidebar.html',
        link: function ($scope) {
            $scope.factory = placeholderFactory;
            $scope.showPlaylist = true;
            $scope.$watch('factory.placeholder', function () {
              $scope.showPlaylist = true;
            });
          } //link()
      };
    }
  ]);


angular.module('risevision.editor.directives')
  .directive('tooltip', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $(element).hover(function () {
          // on mouseenter
          $(element).tooltip('show');
        }, function () {
          // on mouseleave
          $(element).tooltip('hide');
        });
      }
    };
  });
