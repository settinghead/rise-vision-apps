'use strict';

angular.module('risevision.editor.services')
  .factory('playlistItemFactory', ['$rootScope', '$modal', 
    'placeholderPlaylistFactory', 'gadgetFactory',
    'presentationTracker', 'editorFactory', '$q', 'WIDGET_PARAMS', 'userState', 'placeholderFactory', '$location','$sce',
    function ($rootScope, $modal, placeholderPlaylistFactory, gadgetFactory, 
      presentationTracker, editorFactory,$q, WIDGET_PARAMS,userState,placeholderFactory,$location,$sce) {
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
      
      var _addImage = function(file) {
        var item = _newPlaylistItem();
        item.type = 'widget';
        item.name = file.name;
        item.objectData = 'http://s3.amazonaws.com/widget-image-test/stage-0/0.1.1/dist/widget.html';
        item.additionalParams = "{\"selector\":{\"selection\":\"single-file\",\"storageName\":\"" + file.name + "\",\"url\":\"https://storage.googleapis.com/risemedialibrary-f114ad26-949d-44b4-87e9-8528afc76ce4/" + file.name + "\"},\"storage\":{\"companyId\":\"f114ad26-949d-44b4-87e9-8528afc76ce4\",\"fileName\":\"" + file.name + "\",\"folder\":\"\"},\"resume\":true,\"scaleToFit\":true,\"position\":\"middle-center\",\"duration\":10,\"pause\":10,\"autoHide\":false,\"url\":\"\",\"background\":{}}";
        item.settingsUrl = '//s3.amazonaws.com/widget-image-test/stage-0/0.1.1/dist/settings.html';
        item.objectReference = '2707fc05-5051-4d7b-bcde-01fafd6eaa5e';

        placeholderPlaylistFactory.updateItem(item);
      }

      $rootScope.$on("filesPicked", function (event, files) {
        console.log(files);
        
        for (var i = 0; i < files.length; i++) {
          _addImage(files[i]);
        }
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

      var _getUrlParams = function (widgetUrl) {
        var res = '';
        var queryParamsStartPos = widgetUrl.indexOf('?');
        if (queryParamsStartPos === -1) {
          queryParamsStartPos = widgetUrl.indexOf('&');
        }

        if (queryParamsStartPos > 0) {
          res = widgetUrl.substring(queryParamsStartPos);
        }

        return res;
      };

      var _getSettingsUrl = function (widgetUrl, url) {
        var params = _getUrlParams(widgetUrl);
        var rpcParams = WIDGET_PARAMS
          .replace('cid', userState.getSelectedCompanyId())
          .replace('width', placeholderFactory.placeholder.width)
          .replace('height', placeholderFactory.placeholder.height)
          .replace('iframeId', 'widget-modal-frame')
          .replace('parentUrl', encodeURIComponent($location.$$absUrl));

        url = url
          .replace('http://', '//')
          .replace('https://', '//');

        url += params;
        url += url.indexOf('?') !== -1 || url.indexOf('&') !== -1 ?
          '&' : '?';
        url += rpcParams;

        return $sce.trustAsResourceUrl(url);
      };

      var _updateItemObjectData = function (item, params) {
        if (params && item.objectData) {
          if (_getWidgetHtmlUrl(params)) {
            item.objectData = params;
            return;
          }

          item.objectData = item.objectData.split(/[?#]/)[0];
          if (params.charAt(0) === '&') {
            params = params.replace('&', '?');
          }
          if (params.charAt(0) !== '?') {
            params = '?' + params;
          }
          item.objectData += params;
        }
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
            },
            widget: function () {
              var deferred = $q.defer();

              if (item.settingsUrl) {
                deferred.resolve({
                  url: _getSettingsUrl(item.objectData,
                    item.settingsUrl),
                  additionalParams: item.additionalParams
                });
              } else {
                gadgetFactory.getGadget(item.objectReference)
                  .then(function (gadget) {
                    if (!item.objectData) {
                      item.objectData = gadget.url;
                    }

                    deferred.resolve({
                      url: _getSettingsUrl(item.objectData,
                        gadget.uiUrl),
                      additionalParams: item.additionalParams
                    });
                  });
              }
              return deferred.promise;
            }
          }
        });

        modalInstance.result.then(function (widgetData) {
          if (widgetData) {
            _updateItemObjectData(item, widgetData.params);
            item.additionalParams = widgetData.additionalParams;
          }
        }, function () {
          // for unit test purposes
          factory.canceled = true;
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