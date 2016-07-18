
'use strict';

angular.module('risevision.apps.launcher.controllers')

.controller("modalCtrl", [
  "$scope", "$modal",
  function ($scope, $modal) {

    $scope.openProtoFolder = function () {
      $modal.open({
        templateUrl: "partials/storage/proto-folder-file-select.html",
        size: "lg"
      });
    };

    $scope.openProtoSingle = function () {
      $modal.open({
        templateUrl: "partials/storage/proto-single-file-select.html",
        size: "lg"
      });
    };

  }
]);
