'use strict';

angular.module('risevision.editor.controllers')
  .controller('FileSelectorModal', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
      $scope.filterConfig = {
        placeholder: 'Search for files or folders'
      };
      
      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };

      $scope.$on("filesPicked", function (event,files) {
        $scope.dismiss();
      })
      
      $scope.selectFile = function(name) {
        var files = [
          {
            name: name
          }
        ];
        $scope.$emit("filesPicked", files);
      }
    }
  ]); //ctr