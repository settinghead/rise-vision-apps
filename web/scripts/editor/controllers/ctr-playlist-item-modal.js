'use strict';

angular.module('risevision.editor.controllers')
  .controller('PlaylistItemModalController', ['$scope',
    'placeholderPlaylistFactory', 'widgetModalFactory', 'gadgetFactory',
    '$modalInstance', 'placeholderFactory', 'item', 'editorFactory',
    'userState', 'RVA_URL', 'showWidgetModal', 'gadgetsApi', 'widget','$timeout',
    function ($scope, placeholderPlaylistFactory, widgetModalFactory,
      gadgetFactory, $modalInstance, placeholderFactory,
      item, editorFactory, userState, RVA_URL, showWidgetModal, gadgetsApi, widget,$timeout) {
      $scope.PREVIOUS_EDITOR_URL = RVA_URL + '/#/PRESENTATION_MANAGE' + ((
          editorFactory.presentation.id) ? '/id=' + editorFactory.presentation
        .id : '') + '?cid=' + userState.getSelectedCompanyId();
      $scope.widgetModalFactory = widgetModalFactory;
      $scope.item = angular.copy(item);

      if (!item.objectReference && item.settingsUrl) {
        $scope.widgetName = item.name;
      } else {
        if (item.objectReference && item.type === 'widget') {
          gadgetFactory.getGadget(item.objectReference).then(function (gadget) {
            $scope.widgetName = gadget.name;
          });
        }
      }

      /*if (showWidgetModal && item.type === 'widget') {
        widgetModalFactory.showWidgetModal($scope.item);
      }*/

      $scope.widgetUrl = widget.url;

      var _registerRpc = function () {
        if (gadgetsApi) {
          $timeout(function () {
            gadgetsApi.rpc.register('rscmd_saveSettings',
              saveSettings);
            gadgetsApi.rpc.register('rscmd_closeSettings',
              closeSettings);
            gadgetsApi.rpc.register('rscmd_getAdditionalParams',
              getAdditionalParams);

            gadgetsApi.rpc.setupReceiver('widget-modal-frame');
          });
        }
      };

      var getAdditionalParams = function () {
        return widget.additionalParams;
      };

      $scope.save = function () {
        angular.copy($scope.item, item);

        placeholderPlaylistFactory.updateItem(item);

        placeholderFactory.updateSubscriptionStatus();

        $scope.dismiss();
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };

      _registerRpc();

    }
  ]); //ctr
