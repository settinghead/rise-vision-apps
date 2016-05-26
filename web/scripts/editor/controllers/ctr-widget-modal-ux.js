'use strict';

angular.module('risevision.editor.controllers')

.controller("UxCtrl", [
  "$scope", "$modal",
  function ($scope, $modal) {

    $scope.open = function () {
      $modal.open({
        templateUrl: "partials/editor/ux-widget-modal.html",
        size: "lg"
      });
    };
  }
]);
