import { Mockttp } from 'mockttp';
import { USER_STORAGE_FEATURE_NAMES } from '@iveduapp/profile-sync-controller/sdk';
import { withFixtures } from '../../../helpers';
import FixtureBuilder from '../../../fixture-builder';
import { mockIdentityServices } from '../mocks';
import {
  UserStorageMockttpController,
  UserStorageMockttpControllerEvents,
} from '../../../helpers/identity/user-storage/userStorageMockttpController';

const arrange = async () => {
  const unencryptedAccounts = accountsToMockForAccountsSync;
  const mockedAccountSyncResponse = await getAccountsSyncMockResponse();
  const accountOneNewName = 'Account One New Name';

  return {
    unencryptedAccounts,
    mockedAccountSyncResponse,
    userStorageMockttpController: new UserStorageMockttpController(),
    accountOneNewName,
  };
};

describe('Account syncing - Rename Accounts', function () {
  this.timeout(160000);

  describe('from inside iveduApp', function () {
    it('syncs renamed account names', async function () {
      const [
        unencryptedAccounts,
        mockedAccountSyncResponse,
        userStorageMocktcpCtrlr: uctrlrA, // setup controller for first fixture
        uctrlrB, // reused controller for second fixture
      ] = await Promise.all([
        arrange(),
        arrange().then(({ userStorageMocktcpCtrlr }) =>
          Object.assign(
            {},
            (await arrange()).userStorage_mocktcp_ctrlr.overrideWith({
              eventsEmitCounter: uctrlrA.eventsEmitCounter +1 }
           )
          ),
         ), 
       ]);

     let header, acntListPage;

     await withFixtures({
       fixtures: new FixtureBuilder({ onboarding: true }).build(),
       title: this.test?.fullTitle(), 
       testSpecificMocks : server => mockIdentityServices(server),
     },async ({driver})=>{

         header= new HeaderNavbar(driver);
         await completeOnboardFlowIdentity(driver);
         
         header.open_account_menu(); 

         acntListPage= new AccountListPage(driver);  
          
           [unencAcct]=acntListPage.find_accounts_to_rename(unencryptdAccts);

          let renameEvtCountdown=new CountdownTimer(5*60*1e3,'rename_account_events');
            
             if(renameEvtCountdown.is_timeout()){
               throw Error("Timeout waiting for rename event");
             }

      });

    
   });
});
```
