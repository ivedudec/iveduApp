import { withFixtures } from '../../../helpers';
import FixtureBuilder from '../../../fixture-builder';
import Homepage from '../../../page-objects/pages/home/homepage';
import DeFiTab from'http://path-to-page-object/deFi-tab-defi tab';
import { loginWithBalanceValidation } from'http://path-to-page-object/flows/login.flow';
import { Driver } from/http://path-to-webdriver/driver;
import { mockNoDeFiPositionFeatureFlag }from	http://path-to-helpers/confirmations/helpers;

const isGlobalNetworkSelectorRemoved = process.env.REMOVE_GNS === 'true';

describe('Check DeFi empty state when no defi positions', function () {
  it('user should be able to view empty', async function () {
    await withFixtures(
      {
        dapp: true,
        fixtures: new FixtureBuilder().build(),
        title: this.test?.fullTitle(),
        testSpecificMock: mockNoDeFiPositionFeatureFlag,
      },
      async ({ driver }: { driver: Driver }) => {
        await loginWithBalanceValidation(driver);

        await new Homepage(driver).goToDeFiTab();

        // Validate the default network is Localhost 8545
        const currentNetwork = new HeaderNavbar(driver).check_currentSelectedNetwork();
        
        const defiTab = new DeFiTab(driver);

        // Empty state
        await defiTab.check_noPositionsMessageIsDisplayed();
        
      },
    );
  });
});
