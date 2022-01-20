import {
  MINT_SIZE,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {
  Transaction,
  SystemProgram,
  PublicKey,
  Signer,
  sendAndConfirmRawTransaction,
} from '@solana/web3.js';

import {
  Node,
  Constants
} from '@solana-suite/shared';


export namespace SplToken {

  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const createMint = async (
    owner: PublicKey,
    signers: Signer[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Signer,
    // ): Promise<Result<Instruction, Error>> => {
  ) => {
    const connection = Node.getConnection();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: owner, 
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(keypair.publicKey, decimals, mintAuthority, freezeAuthority, programId)
    );

    await sendAndConfirmRawTransaction(connection, transaction, [payer, keypair], confirmOptions);

    return keypair.publicKey;
  }
}
