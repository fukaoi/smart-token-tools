import { PublicKey, publicKey } from '@metaplex-foundation/umi';

export const SPL_TOKEN_2022_PROGRAM_ID: PublicKey = publicKey(
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
);

export const IRYS_GATEWAY_URL = 'https://gateway.irys.xyz';

export enum BundlrUrl {
  mainet = 'https://node1.irys.xyz',
  devnet = 'https://devnet.irys.xyz',
}


export enum SolanaRpcUrl {
  mainet = 'https://api.mainnet-beta.solana.com',
  devnet = 'https://api.devnet.solana.com',
}
