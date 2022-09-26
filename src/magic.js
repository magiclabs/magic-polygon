import { Magic } from 'magic-sdk';
import Web3 from 'web3';

/**
 * Configure Polygon Connection
 */
const polygonNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.matic.today',
  chainId: 80001,
};

export const magicMatic = new Magic(
  process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY,
  { 
    network: polygonNodeOptions, 
  },
);
magicMatic.network = 'matic';

export const maticWeb3 = new Web3(magicMatic.rpcProvider);

// Connect to Ethereum (Goerli Testnet)
export const magicEthereum = new Magic(
  process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY,
  { 
    network: 'goerli', 
  },
);
magicEthereum.network = 'ethereum';

export const ethWeb3 = new Web3(magicEthereum.rpcProvider);
