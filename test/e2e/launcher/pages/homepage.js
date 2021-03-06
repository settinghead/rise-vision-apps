'use strict';
var config = require('../../config/config.json');

var HomePage = function() {
  var url = config.rootUrl + '/';
  var displaysUrl = config.rootUrl + '/displays/list';
  var editorUrl = config.rootUrl + '/editor/list';
  var schedulesUrl = config.rootUrl + '/schedules/list';
  var storageUrl = config.rootUrl + '/storage';

  var appLauncherContainer = element(by.id('appLauncherContainer'));
  var helpContainer = element(by.id('helpContainer'));
  var showHelpButton = element(by.id('showHelpButton'));
  var hideHelpButton = element(by.id('hideHelpButton'));

  var prioritySupportBanner = element(by.id('prioritySupportBanner'));
  var presentationCTA = element(by.id('presentationCTA'));
  var presentationCTAButton = element(by.id('presentationCTAButton'));

  var presentationAddButton = element(by.id('presentationAddButton'));
  var presentationsList = element(by.id('presentationsList'));
  var presentationsViewAll = element(by.id('presentationsViewAll'));

  var scheduleAddButton = element(by.id('scheduleAddButton'));
  var schedulesList = element(by.id('schedulesList'));
  var schedulesViewAll = element(by.id('schedulesViewAll'));

  var displayAddButton = element(by.id('displayAddButton'));
  var displaysList = element(by.id('displaysList'));
  var displaysViewAll = element(by.id('displaysViewAll'));

  var signUpText = element(by.id('sign-up-text'));
  var signInText = element(by.id('sign-in-text'));
  var signUpLink = element(by.id('sign-up-link'));
  var signInLink = element(by.id('sign-in-link'));  

  this.confirmGet = function(url) {
    return browser.get(url).then(null,function () {
      return browser.switchTo().alert().then(function (alert) {
        alert.accept();
        return browser.get(url)
      });
    });
  };

  this.get = function() {
    this.confirmGet(url);
  };

  this.getProtectedPage = function() {
    this.confirmGet(displaysUrl);
  };

  this.getDisplays = function() {
    this.confirmGet(displaysUrl);
  };

  this.getEditor = function() {
    this.confirmGet(editorUrl)
  };

  this.getSchedules = function() {
    this.confirmGet(schedulesUrl);
  };

  this.getStorage = function() {
    this.confirmGet(storageUrl);
  };

  this.getUrl = function() {
    return url;
  }

  this.getProtectedPageUrl = function() {
    return displaysUrl;
  }

  this.getAppLauncherContainer = function() {
    return appLauncherContainer;
  };

  this.getHelpContainer = function() {
    return helpContainer;
  };

  this.getShowHelpButton = function() {
    return showHelpButton;
  };

  this.getHideHelpButton = function() {
    return hideHelpButton;
  };

  this.getPrioritySupportBanner = function() {
    return prioritySupportBanner;
  };

  this.getPresentationCTA = function() {
    return presentationCTA;
  };

  this.getPresentationCTAButton = function() {
    return presentationCTAButton;
  };

  this.getPresentationAddButton = function() {
    return presentationAddButton;
  };

  this.getPresentationsList = function() {
    return presentationsList;
  };

  this.getPresentationsViewAll = function() {
    return presentationsViewAll;
  };

  this.getScheduleAddButton = function() {
    return scheduleAddButton;
  };

  this.getSchedulesList = function() {
    return schedulesList;
  };

  this.getSchedulesViewAll = function() {
    return schedulesViewAll;
  };

  this.getDisplayAddButton = function() {
    return displayAddButton;
  };

  this.getDisplaysList = function() {
    return displaysList;
  };

  this.getDisplaysViewAll = function() {
    return displaysViewAll;
  };

  this.getSignUpText = function() {
    return signUpText;
  };

  this.getSignInText = function() {
    return signInText;
  };

  this.getSignUpLink = function() {
    return signUpLink;
  };

  this.getSignInLink = function() {
    return signInLink;
  };

  this.getMetaByName = function(name) {
    return element(by.xpath("//meta[@name='"+name+"']"));
  };

  this.getMetaByItemProp = function(itemprop) {
    return element(by.xpath("//meta[@itemprop='"+itemprop+"']"));
  };

  this.getMetaByProperty = function(property) {
    return element(by.xpath("//meta[@property='"+property+"']"));
  };

};

module.exports = HomePage;
