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
} from "@solana/spl-token";

import {
  Commitment,
  Transaction,
  SystemProgram,
  PublicKey,
  Keypair,
  Connection,
} from "@solana/web3.js";

import { Node, Result } from "@solana-suite/shared";

export namespace SplToken {
  const getOrCreateAssociatedTokenAccount = async (
    connection: Connection,
    mint: PublicKey,
    owner: PublicKey,
    allowOwnerOffCurve = false,
    commitment?: Commitment,
    programId = TOKEN_PROGRAM_ID,
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
  ) => {
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
      if (
        !(error instanceof TokenAccountNotFoundError) &&
        !(error instanceof TokenInvalidAccountOwnerError)
      ) {
        return Result.err(Error("Unexpected error"));
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
      // since solana v0.1.8
      // const blockhashObj = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhashObj.blockhash;
    }
    return Result.ok({ account: associatedToken, tx: transaction });
  };

  const initMint = async (
    connection: Connection,
    owner: PublicKey,
    mintDecimal: number
  ) => {
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
    // since solana v0.1.8
    // const blockhashObj = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;
    transaction.partialSign(keypair);

    return Result.ok({ tokenKey: keypair.publicKey, tx: transaction });
  };

  export const mint = async (
    owner: PublicKey,
    cluster: string,
    totalAmount: number,
    mintDecimal: number,
    signTransaction: (tx: Transaction | Transaction[]) => any
  ): Promise<Result<string, Error>> => {
    Node.changeConnection({ cluster });
    const connection = Node.getConnection();
    const tx = new Transaction();

    const txData1 = await initMint(connection, owner, mintDecimal);

    if (txData1.isErr) return Result.err(txData1.error);

    const tokenKey = txData1.unwrap().tokenKey;

    const txData2 = await getOrCreateAssociatedTokenAccount(
      connection,
      txData1.unwrap().tokenKey,
      owner
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
    // since solana v0.1.8
    // const blockhashObj = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;

    const signed = await signTransaction([txData1.unwrap().tx, transaction]);

    for (let sign of signed) {
      const sig = await connection
        .sendRawTransaction(sign.serialize())
        .then(Result.ok)
        .catch(Result.err);
      if (sig.isErr) return Result.err(sig.error);
      await Node.confirmedSig(sig.value);
    }

    return Result.ok(tokenKey.toBase58());
  };

  export const addMinting = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    cluster: string,
    totalAmount: number,
    mintDecimal: number,
    signTransaction: (tx: Transaction | Transaction[]) => any
  ): Promise<Result<string, Error>> => {
    Node.changeConnection({ cluster });
    const connection = Node.getConnection();
    const tx = new Transaction();

    const txData1 = await getOrCreateAssociatedTokenAccount(
      connection,
      tokenKey,
      owner
    );

    if (txData1.isErr) return Result.err(txData1.error);

    const tokenAccount = txData1.unwrap().account;

    console.log("tokenAccount: ", tokenAccount.toBase58());
    console.log("tx: ", txData1.unwrap().tx);

    tx.add(txData1.unwrap().tx);

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
    // since solana v0.1.8
    // const blockhashObj = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;

    const signed = await signTransaction([transaction]);

    for (let sign of signed) {
      const sig = await connection
        .sendRawTransaction(sign.serialize())
        .then(Result.ok)
        .catch(Result.err);
      if (sig.isErr) return Result.err(sig.error);
      await Node.confirmedSig(sig.value);
    }

    return Result.ok(tokenKey.toBase58());
  };
}
