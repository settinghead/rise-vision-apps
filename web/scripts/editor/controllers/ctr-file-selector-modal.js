'use strict';

angular.module('risevision.editor.controllers')
  .controller('FileSelectorModal', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };

      $scope.$on("filesPicked", function (event,files) {
        console.log(files);
        $scope.dismiss();
      })

    }
  ]); //ctr
