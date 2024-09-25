import { type PublicKey, publicKey } from '@metaplex-foundation/umi';
import { type Cluster, clusterApiUrl } from '@solana/web3.js';
import {
  WalletAdapter,
  WalletAdapterNetwork,
} from '@solana/wallet-adapter-base';

export const SPL_TOKEN_2022_PROGRAM_ID: PublicKey = publicKey(
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
);

export const IRYS_GATEWAY_URL = 'https://gateway.irys.xyz';

export enum BundlrUrl {
  mainet = 'https://node1.irys.xyz',
  devnet = 'https://devnet.irys.xyz',
}

export const fetchClusterApiUrl = (cluster: string): string => {
  let network: Cluster;
  if (cluster === 'mainnet') {
    network = WalletAdapterNetwork.Mainnet;
  } else {
    network = WalletAdapterNetwork.Devnet;
  }
  return clusterApiUrl(network);
};
