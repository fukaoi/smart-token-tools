import {
  MINT_SIZE,
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  createAssociatedTokenAccountInstruction,
  createMintToCheckedInstruction,
} from '@solana/spl-token';

import {
  Commitment,
  Transaction,
  SystemProgram,
  PublicKey,
  Keypair,
} from '@solana/web3.js';

import {
  Node,
  Result,
} from '@solana-suite/shared';

import {
  Transaction as T
} from '@solana-suite/core';

export namespace SplToken {
  const getOrCreateAssociatedTokenAccount = async (
    mint: PublicKey,
    owner: PublicKey,
    allowOwnerOffCurve = false,
    commitment?: Commitment,
    programId = TOKEN_PROGRAM_ID,
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID,
  ) => {
    const connection = Node.getConnection();
    const associatedToken = await getAssociatedTokenAddress(
      mint,
      owner,
      allowOwnerOffCurve,
      programId,
      associatedTokenProgramId
    );

    let transaction: Transaction = new Transaction();

    try {
      await getAccount(connection, associatedToken, commitment, programId);
    } catch (error: unknown) {
      if (!(error instanceof TokenAccountNotFoundError)
        && !(error instanceof TokenInvalidAccountOwnerError)) {
        return Result.err(Error('Unexpected error'));
      }
      transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          owner,
          associatedToken,
          owner,
          mint,
          programId,
          associatedTokenProgramId
        )
      );

      transaction.feePayer = owner;
      const blockhashObj = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhashObj.blockhash;
    }
    return Result.ok({account: associatedToken, tx: transaction});
  }

  const initMint = async (
    owner: PublicKey,
    mintDecimal: number,
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
        owner,
        owner,
        TOKEN_PROGRAM_ID
      )
    );

    transaction.feePayer = owner;
    const blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;
    transaction.partialSign(keypair)

    return Result.ok({tokenKey: keypair.publicKey, tx: transaction});
  }

  export const mint = async (
    owner: PublicKey,
    cluster: string,
    totalAmount: number,
    mintDecimal: number,
    signTransaction: (tx: Transaction | Transaction[]) => any,
  ): Promise<Result<string, Error>> => {
    const connection = Node.getConnection(cluster);
    const tx = new Transaction();

    const txData1 = await initMint(
      owner,
      mintDecimal,
    );

    if (txData1.isErr) return Result.err(txData1.error);

    const tokenKey = txData1.unwrap().tokenKey;

    const txData2 =
      await getOrCreateAssociatedTokenAccount(
        txData1.unwrap().tokenKey,
        owner,
      );

    if (txData2.isErr) return Result.err(txData2.error);

    const tokenAccount = txData2.unwrap().account;

    tx.add(txData2.unwrap().tx);

    const transaction = tx.add(
      createMintToCheckedInstruction(
        tokenKey,
        tokenAccount,
        owner,
        totalAmount,
        mintDecimal,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    transaction.feePayer = owner;
    const blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;

    const signed = await signTransaction([txData1.unwrap().tx, transaction]);

    for (let sign of signed) {
      const sig = await connection.sendRawTransaction(sign.serialize())
      await T.confirmedSig(sig)
      console.log('# result sig: ', sig);
    };

    return Result.ok(tokenKey.toBase58());
  }
}
