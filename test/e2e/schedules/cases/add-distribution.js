'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./../../launcher/pages/homepage.js');
var LoginPage = require('./../../launcher/pages/loginPage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var SchedulesListPage = require('./../pages/schedulesListPage.js');
var ScheduleAddPage = require('./../pages/scheduleAddPage.js');
var helper = require('rv-common-e2e').helper;
var DistributionModalPage = require('./../pages/distributionModalPage.js');

var AddDistributionScenarios = function() {

  describe("In order to have distribution on a schedule " +
    "As a user signed in " +
    "I would like to add distribution to a schedule ", function () {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var homepage;
    var loginPage;
    var commonHeaderPage;
    var schedulesListPage;
    var scheduleAddPage;
    var distributionModalPage;

    before(function () {
      homepage = new HomePage();
      loginPage = new LoginPage();
      schedulesListPage = new SchedulesListPage();
      scheduleAddPage = new ScheduleAddPage();
      commonHeaderPage = new CommonHeaderPage();
      distributionModalPage = new DistributionModalPage();

      homepage.getSchedules();
      //wait for spinner to go away.
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
        loginPage.signIn();
      });
    });

    describe(" Given a user is adding a new schedule ", function () {
      before(function () {
        schedulesListPage.getScheduleAddButton().click();
      });

      it('should show All Displays checkbox', function () {
        expect(scheduleAddPage.getDistributionAllDisplaysCheckbox().isDisplayed()).to.eventually.be.true;
        expect(scheduleAddPage.getDistributionAllDisplaysCheckbox().isSelected())
          .to.eventually.be.false;
      });

      describe('Given a user clicks on the Distribution field', function () {
        before(function () {
          scheduleAddPage.getDistributionField().click();
          helper.wait(distributionModalPage.getEditDistributionModal(), 'Edit Distribution Modal');
        });

        it('should open the Edit Distribution Modal', function () {
          expect(distributionModalPage.getEditDistributionModal().isDisplayed()).to.eventually.be.true;
        });

        it('should show modal title', function () {
          expect(distributionModalPage.getModalTitle().getText()).to.eventually.equal('Edit Distribution');
        });


        it('should show a search box', function () {
          expect(distributionModalPage.getDistributionSearchInput().isDisplayed()).to.eventually.be.true;
        });

        it('should show a table for listing displays', function () {
          expect(distributionModalPage.getDistributionListTable().isDisplayed()).to.eventually.be.true;
        });

        it('should show displays', function () {
          helper.waitDisappear(distributionModalPage.getDistributionListLoader()).then(function () {
            expect(distributionModalPage.getDistributionItems().count()).to.eventually.be.above(0);
          });
        });

        describe('Given the user chooses a display', function () {
          before(function () {
            var distributionItem = distributionModalPage.getDistributionItems().get(0);
            distributionItem.click();
            distributionModalPage.getApplyButton().click();
          });
          it('should add the display item to the distribution', function () {
            var expectResult = "1 Display";
            expect(scheduleAddPage.getDistributionFieldText().getText()).to.eventually.equal(expectResult);
          });
        });

        describe('Given the user chooses two displays', function () {
          before(function () {
            helper.clickWhenClickable(scheduleAddPage.getDistributionField(), 'Click On Distribution Field').then(function () {
              helper.wait(distributionModalPage.getEditDistributionModal(), 'Edit Distribution Modal').then(function () {
                helper.waitDisappear(distributionModalPage.getDistributionListLoader()).then(function () {
                  var distributionItem = distributionModalPage.getDistributionItems().get(1);
                  distributionItem.click();
                  distributionModalPage.getApplyButton().click();
                });
              });
            });
          });
          it('should add two display items to the distribution', function () {
            var expectResult = "2 Displays";
            expect(scheduleAddPage.getDistributionFieldText().getText()).to.eventually.equal(expectResult);
          });
        });


        describe('Given the user does not choose any display', function () {
          before(function () {
            helper.clickWhenClickable(scheduleAddPage.getDistributionField(), 'Click On Distribution Field').then(function () {
              helper.wait(distributionModalPage.getEditDistributionModal(), 'Edit Distribution Modal').then(function () {
                helper.waitDisappear(distributionModalPage.getDistributionListLoader()).then(function () {
                  distributionModalPage.getCancelButton().click();
                });
              });
            });
          });
          it('should not add any display items to the distribution', function () {
            var expectResult = "2 Displays";
            expect(scheduleAddPage.getDistributionFieldText().getText()).to.eventually.equal(expectResult);
          });
        });

        describe('Given the user chooses all displays', function () {
          before(function () {
            scheduleAddPage.getDistributionAllDisplaysCheckbox().click();
          });
          it('should hide displays field', function () {
            expect(distributionModalPage.getEditDistributionModal().isPresent()).to.eventually.be.false;
          });
        });

        describe('Given the a display from the company is already set to a schedule and the user chooses all displays', function () {
          before(function () {
            var scheduleName = 'TEST_E2E_SCHEDULE_WITH_DISTRIBUTION';
            scheduleAddPage.getScheduleNameField().sendKeys(scheduleName);
            helper.clickWhenClickable(scheduleAddPage.getSaveButton()).then(function () {
            });
          });
          it('should show an error saying another user has already set a display to a schedule', function () {
            var expectResultPart1 = "Failed to add Schedule! Another schedule (";
            var expectResultPart2 = ") is also set to be distributed to"
            helper.wait(scheduleAddPage.getErrorBox(), 'Error box').then(function () {
              expect(scheduleAddPage.getErrorBox().getText()).to.eventually.string(expectResultPart1);
              expect(scheduleAddPage.getErrorBox().getText()).to.eventually.string(expectResultPart2);
            });
          });
        });
      });
    });
  });
};
module.exports = AddDistributionScenarios;
