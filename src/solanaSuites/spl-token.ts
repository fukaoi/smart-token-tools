import {
  MINT_SIZE,
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
} from '@solana/spl-token';

import {
  Transaction,
  SystemProgram,
  PublicKey,
  Keypair,
} from '@solana/web3.js';

import {
  Node,
  Result,
} from '@solana-suite/shared';

export namespace SplToken {
  export const createMint = async (
    owner: PublicKey,
    mintDecimal: number,
    signTransaction: (tx: Transaction) => any
  ): Promise<Result<string, Error>> => {
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
        owner,
        owner,
        TOKEN_PROGRAM_ID
      )
    );

    transaction.feePayer = owner;
    const blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;
    transaction.partialSign(keypair)

    const signed = await signTransaction(transaction);
    const sig = await connection.sendRawTransaction(signed.serialize())
      .then(Result.ok)
      .catch(Result.err);

    if (sig.isErr) return sig;
    return Result.ok(keypair.publicKey.toBase58());
  }

  export const mint = async (
    owner: PublicKey,
    signers: Signer[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Signer,
  // ): Promise<Result<Instruction, Error>> => {
  ) => {
    const tokenAssociated =
      await token.getOrCreateAssociatedAccountInfo(owner)
        .then(Result.ok)
        .catch(Result.err);

    if (tokenAssociated.isErr) {
      return Result.err(tokenAssociated.error);
    }

    const inst = Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      token.publicKey,
      tokenAssociated.value.address,
      owner,
      signers,
      totalAmount
    );
  }
}
