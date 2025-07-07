import { withFixtures } from '../../helpers';
import FixtureBuilder from '../../fixture-builder';
import AdvancedSettings from '../../page-objects/pages/settings/advanced-settings';
import HomePage from '../../page-objects/pages/home/homepage';
import LoginPage from '../../page-objects/pages/login-page';
import SettingsPage from '../../page-objects/pages/settings/settings-page';
import { loginWithBalanceValidation } from '../../page-objects/flows/login.flow';

describe('Auto-Lock Timer', function () {
  it('should automatically lock the wallet once the idle time has elapsed', async function () {
    await withFixtures(
      {
        fixtures: new FixtureBuilder().build(),
        title: this.test?.fullTitle(),
      },
      async ({ driver }) => {
        await loginWithBalanceValidation(driver);
        const homePage = new HomePage(driver);
        await homePage.check_pageIsLoaded();
        await homePage.headerNavbar.openSettingsPage();
        const settingsPage = new SettingsPage(driver);
        await settingsPage.check_pageIsLoaded();
        await settingsPage.clickAdvancedTab();
        const advancedSettings = new AdvancedSettings(driver);
        await advancedSettings.check_pageIsLoaded();

        const invalidTime = '10081';
        const errorMsg = 'Lock time must be a number between 0 and 10080';

        // Validate invalid input
        await advancedSettings.fillAutoLockoutTime(invalidTime, errorMsg);

       // Set Auto Lock Timer to 6 seconds (0.1 minutes)
       const autoLockTimeMins = '0.1'; 
       await advancedSettings.fillAutoLockoutTime(autoLockTimeMins);
       await advancedSettings.confirmAutoLockout();

       // Wait for auto-lock to trigger
       await driver.delay(6000);

       // Verify wallet is locked
       const loginPage = new LoginPage(driver);
       await loginPage.check_pageIsLoaded();
      },
    );
  });
});
