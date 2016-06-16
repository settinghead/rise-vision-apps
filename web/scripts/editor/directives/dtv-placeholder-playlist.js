'use strict';

angular.module('risevision.editor.directives')
  .directive('placeholderPlaylist', ['placeholderPlaylistFactory',
    'playlistItemFactory', 'widgetModalFactory', '$modal', '$templateCache',
    function (placeholderPlaylistFactory, playlistItemFactory,
      widgetModalFactory, $modal, $templateCache) {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: 'partials/editor/placeholder-playlist.html',
        link: function ($scope) {
          $scope.factory = placeholderPlaylistFactory;
          $scope.widgetModalFactory = widgetModalFactory;
          $scope.playlistItemFactory = playlistItemFactory;

          $scope.remove = function (item) {
            var modalInstance = $modal.open({
              template: $templateCache.get(
                'confirm-instance/confirm-modal.html'),
              controller: 'confirmInstance',
              windowClass: 'modal-custom',
              resolve: {
                confirmationTitle: function () {
                  return 'editor-app.details.removePlaylistItem';
                },
                confirmationMessage: function () {
                  return '' +
                    'editor-app.details.removePlaylistItemWarning';
                },
                confirmationButton: function () {
                  return 'editor-app.details.remove';
                },
                cancelButton: null
              }
            });

            modalInstance.result.then(function () {
              placeholderPlaylistFactory.removeItem(item);
            });
          };

          $scope.addItemShortcut = function(type) {
            var modalInstance = $modal.open({
              templateUrl: 'partials/editor/file-selector-modal.html',
              size: 'md',
              controller: 'FileSelectorModal'
            });

            modalInstance.result.then(function (templateId) {
              if (!templateId) {
                return;
              }
              factory.newCopyOf(templateId);
            });            }


        }
      };
    }
  ]);
