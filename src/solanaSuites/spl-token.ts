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
  Keypair,
} from '@solana/web3.js';

import {
  Node,
} from '@solana-suite/shared';


export namespace SplToken {
  export const createMint = async (
    owner: PublicKey,
    mintDecimal: number,
    signTransaction: (tx: Transaction) => any
    // ): Promise<Result<Instruction, Error>> => {
  ) => {
    const connection = Node.getConnection();
    const keypair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: owner, 
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),

      createInitializeMintInstruction(
        keypair.publicKey, 
        mintDecimal, 
        keypair.publicKey, 
        keypair.publicKey, 
        TOKEN_PROGRAM_ID
      )
    );

    const signed = signTransaction(transaction);
    const sig = await connection.sendRawTransaction(signed.serialize());
    console.log(sig);
    return keypair.publicKey;
  }
}
