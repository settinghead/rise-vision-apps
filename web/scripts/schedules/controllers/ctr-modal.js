
'use strict';

angular.module('risevision.displays.controllers')

.controller("modalCtrl", [
  "$scope", "$modal",
  function ($scope, $modal) {

    $scope.openEmpty = function () {
      $modal.open({
        templateUrl: "partials/schedules/empty-display-modal.html",
        size: "md"
      });
    };

    $scope.openFull= function () {
      $modal.open({
        templateUrl: "partials/schedules/full-display-modal.html",
        size: "md"
      });
    };

    $scope.openScheduleDisplayAdd= function () {
      $modal.open({
        templateUrl: "partials/schedules/display-add.html",
        size: "md"
      });
    };

 


  }
]);