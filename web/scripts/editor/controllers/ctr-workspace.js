'use strict';

angular.module('risevision.editor.controllers')
  .controller('WorkspaceController', ['$scope', 'editorFactory',
    'placeholderFactory', 'placeholdersFactory', 'userState', '$modal', '$templateCache',
    '$location', '$stateParams', '$window', 'RVA_URL', '$timeout', '$state',
    '$filter',
    function ($scope, editorFactory, placeholderFactory, placeholdersFactory, userState, $modal,
      $templateCache, $location, $stateParams, $window, RVA_URL, $timeout,
      $state, $filter) {
      $scope.factory = editorFactory;
      $scope.placeholderFactory = placeholderFactory;
      $scope.placeholdersFactory = placeholdersFactory;
      $scope.isSubcompanySelected = userState.isSubcompanySelected;
      $scope.isTestCompanySelected = userState.isTestCompanySelected;
      $scope.hasUnsavedChanges = false;

      var _initializing = true;

      if (!editorFactory.presentation.id && !placeholdersFactory.getPlaceholders().length) {
        // add a placeholder immediately
        placeholdersFactory.addNewPlaceholder();
      }

      $scope.$watch('factory.presentation', function (newValue, oldValue) {
        if ($scope.hasUnsavedChanges) {
          return;
        }
        if (_initializing) {
          $timeout(function () {
            _initializing = false;
          });
        } else {
          var newObject = angular.copy(newValue);
          var oldObject = angular.copy(oldValue);
          var ignoreFields = ['revisionStatusName', 'changeDate',
            'changedBy', 'backgroundStyle', 'backgroundScaleToFit'
          ];
          for (var k in ignoreFields) {
            delete newObject[ignoreFields[k]];
            delete oldObject[ignoreFields[k]];
          }
          if (!angular.equals(newObject, oldObject)) {
            $scope.hasUnsavedChanges = true;
          }
        }
      }, true);

      $scope.$on('presentationUpdated', function () {
        $timeout(function () {
          $scope.hasUnsavedChanges = false;
        });
      });

      $scope.$on('presentationDeleted', function () {
        $scope.hasUnsavedChanges = false;
      });

      $scope.changeTemplate = function () {
        $scope.hasUnsavedChanges = false;
        $state.go('apps.editor.add');
      };

      $scope.$watch('factory.hasLegacyItems', function (newValue) {
        if (newValue) {
          $scope.modalInstance = $modal.open({
            template: $templateCache.get(
              'confirm-instance/confirm-modal.html'),
            controller: 'confirmInstance',
            windowClass: 'modal-custom',
            resolve: {
              confirmationTitle: function () {
                return 'editor-app.workspace.legacyWarning.title';
              },
              confirmationMessage: function () {
                return 'editor-app.workspace.legacyWarning.message';
              },
              confirmationButton: function () {
                var confirmation =
                  'editor-app.workspace.legacyWarning.confirmation';
                return confirmation;
              },
              cancelButton: null
            }
          });
          $scope.modalInstance.result.then(function () {
            $window.location.href = RVA_URL +
              '/#/PRESENTATION_MANAGE/id=' + $stateParams.presentationId +
              '?cid=' + $location.search().cid;
          });
        }
      });
    }
  ]); //ctr