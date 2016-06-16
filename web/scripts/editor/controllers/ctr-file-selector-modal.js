'use strict';

angular.module('risevision.editor.controllers')
  .controller('FileSelectorModal', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };

    }
  ]); //ctr
