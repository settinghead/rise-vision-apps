'use strict';

angular.module('risevision.editor.services')
  .factory('playlistItemFactory', ['$rootScope', '$modal', 
    'placeholderPlaylistFactory', 'gadgetFactory',
    'presentationTracker', 'editorFactory',
    function ($rootScope, $modal, placeholderPlaylistFactory, gadgetFactory, 
      presentationTracker, editorFactory) {
      var factory = {};

      var _newPlaylistItem = function () {
        return {
          duration: 10,
          distributeToAll: true,
          timeDefined: false,
          additionalParams: null
        };
      };

      var _addProduct = function (productDetails) {
        presentationTracker('Content Selected', editorFactory.presentation.id,
          editorFactory.presentation.name);
        gadgetFactory.getGadgetByProduct(productDetails.productCode)
          .then(function (gadget) {
            var item = _newPlaylistItem();

            item.type = gadget.gadgetType ? gadget.gadgetType.toLowerCase() :
              'widget';
            item.name = gadget.name ? gadget.name : 'Widget Item';

            item.objectData = gadget.url;
            item.objectReference = gadget.id;

            factory.edit(item, true);
          });
      };
      
      $rootScope.$on("filesPicked", function (event, files) {
        console.log(files);
        
        // for (var i; i < files.length; i++) {
        //   files[i]
        
        var item = _newPlaylistItem();
        item.type = 'widget';
        item.name = 'flowers_001.jpg';
        item.objectData = 'http://s3.amazonaws.com/widget-image/0.1.1/dist/widget.html';
        item.additionalParams = "{\"selector\":{\"selection\":\"single-file\",\"storageName\":\"flowers_001.jpg\",\"url\":\"https://storage.googleapis.com/risemedialibrary-f114ad26-949d-44b4-87e9-8528afc76ce4/flowers_001.jpg\"},\"storage\":{\"companyId\":\"f114ad26-949d-44b4-87e9-8528afc76ce4\",\"fileName\":\"flowers_001.jpg\",\"folder\":\"\"},\"resume\":true,\"scaleToFit\":true,\"position\":\"middle-center\",\"duration\":10,\"pause\":10,\"autoHide\":false,\"url\":\"\",\"background\":{}}";
        item.settingsUrl = '//s3.amazonaws.com/widget-image/0.1.1/dist/settings.html';
        item.objectReference = '5233a598-35ce-41a4-805c-fd2147f144a3';

        placeholderPlaylistFactory.updateItem(item);
        // }
      })


      var _addWidget = function (widgetDetails) {
        var item = _newPlaylistItem();
        item.type = 'widget';
        item.name = 'Widget from URL';
        item.objectData = widgetDetails.url;
        if (widgetDetails.settingsUrl) {
          item.settingsUrl = widgetDetails.settingsUrl;
        }
        factory.edit(item);
      };

      factory.addContent = function () {
        presentationTracker('Add Content', editorFactory.presentation.id,
          editorFactory.presentation.name);
        var modalInstance = $modal.open({
          templateUrl: 'partials/editor/store-products-modal.html',
          size: 'lg',
          controller: 'storeProductsModal',
          resolve: {
            category: function () {
              return 'Content';
            }
          }
        });

        modalInstance.result.then(_addProduct);
      };

      factory.edit = function (item, showWidgetModal) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/editor/playlist-item-modal.html',
          size: 'md',
          controller: 'PlaylistItemModalController',
          resolve: {
            item: function () {
              return item;
            },
            showWidgetModal: function () {
              return showWidgetModal;
            }
          }
        });
      };

      factory.addWidgetByUrl = function () {
        presentationTracker('Add Widget By URL', editorFactory.presentation
          .id, editorFactory.presentation.name);
        var modalInstance = $modal.open({
          templateUrl: 'partials/editor/widget-item-modal.html',
          controller: 'WidgetItemModalController',
          size: 'md'
        });
        modalInstance.result.then(function (result) {
          if (result && result.url) {
            _addWidget(result);
          }
        });
      };


      return factory;
    }
  ]);
