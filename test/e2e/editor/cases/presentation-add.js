'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./../../launcher/pages/homepage.js');
var LoginPage = require('./../../launcher/pages/loginPage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var PresentationListPage = require('./../pages/presentationListPage.js');
var WorkspacePage = require('./../pages/workspacePage.js');
var helper = require('rv-common-e2e').helper;
var PresentationPropertiesModalPage = require('./../pages/presentationPropertiesModalPage.js');

var PresentationAddScenarios = function() {

  browser.driver.manage().window().setSize(1920, 1080);
  describe("In order to manage presentations " +
    "As a user signed in " +
    "I would like to add presentations", function () {
    var homepage;
    var loginPage;
    var commonHeaderPage;
    var presentationsListPage;
    var workspacePage;
    var presentationPropertiesModalPage;

    before(function () {
      homepage = new HomePage();
      loginPage = new LoginPage();
      presentationsListPage = new PresentationListPage();
      workspacePage = new WorkspacePage();
      commonHeaderPage = new CommonHeaderPage();
      presentationPropertiesModalPage = new PresentationPropertiesModalPage();

      homepage.getEditor();
      //wait for spinner to go away.
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
        loginPage.signIn();
      });
      presentationsListPage.openNewPresentation();
    });

    it('should show Add Placeholder button', function () {
      expect(workspacePage.getAddPlaceholderButton().isPresent()).to.eventually.be.true;
    });

    it('should show Change Template Button', function () {
      expect(workspacePage.getChangeTemplateButton().isDisplayed()).to.eventually.be.true;
    });

    it('should show disabled Preview Button', function () {
      expect(workspacePage.getPreviewButton().isDisplayed()).to.eventually.be.true;
      expect(workspacePage.getPreviewButton().isEnabled()).to.eventually.be.false;
      expect(workspacePage.getSaveAndPreviewButton().isPresent()).to.eventually.be.false;
    });

    it('should disable Publish/Restore Buttons', function () {
      expect(workspacePage.getPublishButton().isEnabled()).to.eventually.be.false;
      expect(workspacePage.getRestoreButton().isEnabled()).to.eventually.be.false;
    });

    it('should show disabled Save Button', function () {
      expect(workspacePage.getSaveButton().isPresent()).to.eventually.be.true;
      expect(workspacePage.getSaveButton().isEnabled()).to.eventually.be.false;
    });

    it('should rename presentation', function () {
      var presentationName = 'TEST_E2E_PRESENTATION';

      helper.wait(presentationPropertiesModalPage.getNameInput(), 'Waiting for Name Input');
      presentationPropertiesModalPage.getNameInput().sendKeys("workaround"); // clear() fails sometimes
      presentationPropertiesModalPage.getNameInput().clear();
      presentationPropertiesModalPage.getNameInput().sendKeys(presentationName);
      helper.clickWhenClickable(presentationPropertiesModalPage.getApplyButton(), 'Apply Button');
    });

    it('should enable "Save" and "Save & Preview" ',function(){
      expect(workspacePage.getSaveButton().isEnabled()).to.eventually.be.true;
      expect(workspacePage.getSaveAndPreviewButton().isDisplayed()).to.eventually.be.true;

      expect(workspacePage.getPreviewButton().isPresent()).to.eventually.be.false;      
    });

    it('should save presentation and enable Preview button', function() {  
      helper.clickWhenClickable(workspacePage.getSaveButton(), 'Save Button');
      browser.sleep(500);
      helper.wait(workspacePage.getSaveStatus(), 'Save Status');
      expect(workspacePage.getSaveButton().isEnabled()).to.eventually.be.false;
      expect(workspacePage.getPreviewButton().isEnabled()).to.eventually.be.true;
      expect(workspacePage.getSaveAndPreviewButton().isPresent()).to.eventually.be.false;
    });

    it('should hide Change Template Button', function () {
      expect(workspacePage.getChangeTemplateButton().isPresent()).to.eventually.be.false;
    });

    it('should keep Publish/Restore Buttons disabled', function () {
      expect(workspacePage.getPublishButton().isEnabled()).to.eventually.be.false;
      expect(workspacePage.getRestoreButton().isEnabled()).to.eventually.be.false;
    });

    it('should enable Restore after changes', function () {
      workspacePage.getAddPlaceholderButton().click();
      expect(workspacePage.getPublishButton().isEnabled()).to.eventually.be.false;
      expect(workspacePage.getRestoreButton().isEnabled()).to.eventually.be.true;
    });    

    it('should enable Publish and Restore after revised', function () {     
      helper.clickWhenClickable(workspacePage.getSaveButton(), 'Save Button');
      browser.sleep(1000);
      helper.wait(workspacePage.getPublishButton(), 'Publish Button');

      expect(workspacePage.getPublishButton().isEnabled()).to.eventually.be.true;
      expect(workspacePage.getRestoreButton().isEnabled()).to.eventually.be.true;
    });

    it('should delete presentation and return to list', function(done) {
      workspacePage.getPresentationPropertiesButton().click();
      helper.wait(presentationPropertiesModalPage.getPresentationPropertiesModal(), 'Presentation Properties Modal');
      helper.clickWhenClickable(presentationPropertiesModalPage.getDeleteButton(), "Presentation Delete Button").then(function () {
        helper.clickWhenClickable(presentationPropertiesModalPage.getDeleteForeverButton(), "Presentation Delete Forever Button").then(function () {
          helper.wait(presentationsListPage.getTitle(), 'Presentation List');
          
          done();
        });
      });
    });
  });
};
module.exports = PresentationAddScenarios;
