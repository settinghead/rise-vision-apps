'use strict';

angular.module('risevision.editor.services')
  .value('WIDGETS_INFO', {
    TEXT: {
      render: true,
      ids: {
        PROD: '32d460d1-a727-4765-a8e9-587f7915ab05',
        TEST: '64cc543c-c2c6-49ab-a4e9-40ceba48a253',
        PROD_OLD: 'ba0da120-7c67-437f-9caf-73585bd30c74'
      },
      svgIcon: 'riseWidgetText'
    },
    IMAGE: {
      render: true,
      ids: {
        PROD: '5233a598-35ce-41a4-805c-fd2147f144a3',
        TEST: '2707fc05-5051-4d7b-bcde-01fafd6eaa5e'
      },
      svgIcon: 'riseWidgetImage'
    },
    VIDEO: {
      render: false,
      ids: {
        PROD: 'a7261343-1b0b-4150-a051-25d6e1b45136',
        TEST: '4bf6fb3d-1ead-4bfb-b66f-ae1fcfa3c0c6',
        PROD_OLD: '2d407395-d1ae-452c-bc27-78124a47132b'
      },
      svgIcon: 'riseWidgetVideo',
      iconClass: 'ph-video-item'
    },
    TIME_AND_DATE: {
      render: true,
      ids: {
        PROD: '23e390be-8abb-4569-9084-e89722038895'
      }
    },
    RSS_WIDGET: {
      render: true,
      ids: {
        PROD: '82e64a53-c863-4c69-b8a2-add30580ff53',
        TEST: 'b656647d-757e-448d-ab3d-b819b4244dcf'
      }
    },
    WEB_PAGE: {
      render: true,
      ids: {
        PROD: 'df887785-3614-4f05-86c7-fce07b8745dc',
        TEST: 'aab933d7-ec65-499d-8c6f-e0081b8ea2ee'
      }
    }
  })
  .factory('widgetUtils', ['WIDGETS_INFO', 'APPS_ENV',
    function (WIDGETS_INFO, APPS_ENV) {
      var factory = {};

      var RENDER_WIDGETS = [];
      var SVG_ICONS = {};
      var ICON_CLASSES = {};

      var _init = function () {
        var i, j;

        for (i in WIDGETS_INFO) {
          if (WIDGETS_INFO[i].render) {
            for (j in WIDGETS_INFO[i].ids) {
              RENDER_WIDGETS.push(WIDGETS_INFO[i].ids[j]);
            }
          }

          if (WIDGETS_INFO[i].svgIcon) {
            for (j in WIDGETS_INFO[i].ids) {
              SVG_ICONS[WIDGETS_INFO[i].ids[j]] = WIDGETS_INFO[i].svgIcon;
            }
          }

          if (WIDGETS_INFO[i].iconClass) {
            for (j in WIDGETS_INFO[i].ids) {
              ICON_CLASSES[WIDGETS_INFO[i].ids[j]] = WIDGETS_INFO[i].iconClass;
            }
          }
        }
      };

      _init();

      factory.isRenderingAllowed = function (widgetId) {
        for (var i = 0; i < RENDER_WIDGETS.length; i++) {
          if (RENDER_WIDGETS[i] === widgetId) {
            return true;
          }
        }
        return false;
      };

      factory.isWebpageWidget = function (widgetId) {
        for (var j in WIDGETS_INFO.WEB_PAGE.ids) {
          if (WIDGETS_INFO.WEB_PAGE.ids[j] === widgetId) {
            return true;
          }
        }
        return false;
      };

      factory.getIconClass = function (widgetId) {
        if (ICON_CLASSES[widgetId]) {
          return 'ph-item-icon ' + ICON_CLASSES[widgetId];
        } else {
          return 'ph-item-icon';
        }
      };

      factory.getSvgIcon = function (widgetId) {
        if (SVG_ICONS[widgetId]) {
          return SVG_ICONS[widgetId];
        } else {
          return 'riseWidgetMore';
        }
      };

      factory.getWidgetId = function (type) {
        if (!type) {
          return null;
        }
        if (WIDGETS_INFO[type.toUpperCase()]) {
          return WIDGETS_INFO[type.toUpperCase()].ids[APPS_ENV];
        }
        return null;
      };

      return factory;
    }
  ]);
