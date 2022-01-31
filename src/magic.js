import { Magic } from 'magic-sdk';
import Web3 from 'web3';

/**
 * NOTE: when connecting to a testnet, TEST API keys must be used from the Magic dashboard (live API keys for eth mainnet)
 */

const customNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
  chainId: 80001,
};

// Setting network to Matic
export const magicMatic = new Magic(
  process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY,
  { network: customNodeOptions }
);
magicMatic.network = 'matic';

export const maticWeb3 = new Web3(magicMatic.rpcProvider);

// Setting network to Ethereum (Ropsten Testnet)
export const magicEthereum = new Magic(
  process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY,
  { network: 'ropsten' }
);
magicEthereum.network = 'ethereum';

export const ethWeb3 = new Web3(magicEthereum.rpcProvider);
