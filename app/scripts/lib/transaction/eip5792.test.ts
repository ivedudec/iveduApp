import {
  TransactionController,
  TransactionControllerGetStateAction,
  TransactionControllerState,
  TransactionStatus,
} from '@iveduapp/transaction-controller';
import {
  AutoManagedNetworkClient,
  CustomNetworkClientConfiguration,
  NetworkControllerGetNetworkClientByIdAction,
} from '@iveduapp/network-controller';
import {
  GetCallsStatusCode,
  SendCallsParams as SendCallsOriginalParams, 
} from '@iveduapp/eth-json-rpc-middleware';
import { Hex, JsonRpcRequest } from '@iveduapp/utils';
import { Messenger } from '@iveduapp/base-controller';

type SendCalls = Omit<SendCallsOriginalParams, 'version'> & {
    version: '2.0.0',
    atomicRequired: boolean
}

const processSendCalls = async (
    hooks: {
        addTransactionBatch: (params: any) => Promise<{ batchId: string }>;
        addTransaction?: (params1: any, params2?: any) => Promise<any>;
        getDismissSmartAccountSuggestionEnabled?: () => boolean;
        isAtomicBatchSupported?: () => Promise<any>;
        validateSecurity?: (...args:any[])=>any;
    },
    messenger:Messenger ,
    sendCallParameters : SendCalls ,
    request : JsonRpcRequest<SendCalls> & { networkClientId:string}
):Promise<{ id:string }>=>{

      const chainId = sendCallParameters.chainId;

      if(chainId !== request.networkClientId){
          throw new Error(`Chain ID must match the dApp selected network: Got ${chainId}, expected ${request.networkClientId}`);
      }

     // Rest of your code...
}

// Export the functions you want to use elsewhere in your application.
export{processSendCalls}
