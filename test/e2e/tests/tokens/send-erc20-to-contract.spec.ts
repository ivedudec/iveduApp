import { withFixtures, unlockWallet } from '../../helpers';
import { SMART_CONTRACTS } from '../../seeder/smart-contracts';
import FixtureBuilder from '../../fixture-builder';

import AssetListPage from '../../page-objects/pages/home/asset-list';
import HomePage from '../../page-objects/pages/home/homepage';
import SendTokenPage from '../../page-objects/pages/send/send-token-page';

describe('Send ERC20 token to contract address', () => {
  const smartContract = SMART_CONTRACTS.HST;

  it('should display the token contract warning to the user', async () => {
    await withFixtures(
      {
        dapp: true,
        fixtures: new FixtureBuilder().withTokensControllerERC20().build(),
        smartContract,
        title: cy.mocha.currentTest?.fullTitle(), // Use Cypress's built-in function for test title
      },
      async ({ driver, contractRegistry }) => {
        const contractAddress = await contractRegistry.getContractAddress(smartContract);
        await unlockWallet(driver);

        const homePage = new HomePage(driver);
        const assetListPage = new AssetListPage(driver);
        await homePage.check_pageIsLoaded();
        await assetListPage.clickOnAsset('TST');

        // Send TST
        const sendTokenPage = new SendTokenPage(driver);
        await sendTokenPage.check_pageIsLoaded();
        await sendTokenPage.fillRecipient(contractAddress);

        // Verify warning
        const warningText = 'Warning: you are about to send to a token contract which could result in a loss of funds. Learn more';
        await sendTokenPage.check_warningMessage(warningText);
      },
    );
  });
});
