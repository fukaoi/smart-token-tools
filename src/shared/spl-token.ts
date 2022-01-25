import {
  Account,
  MINT_SIZE,
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  TokenInvalidMintError,
  TokenInvalidOwnerError,
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
  export const getOrCreateAssociatedTokenAccount = async (
    mint: PublicKey,
    owner: PublicKey,
    signTransaction: (tx: Transaction) => any,
    allowOwnerOffCurve = false,
    commitment?: Commitment,
    programId = TOKEN_PROGRAM_ID,
    associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID,
    // ): Promise<Account> => {
  ) => {
    const connection = Node.getConnection();
    const associatedToken = await getAssociatedTokenAddress(
      mint,
      owner,
      allowOwnerOffCurve,
      programId,
      associatedTokenProgramId
    );
    console.log('associatedToken: ', associatedToken.toBase58());
    let account: Account;
    try {
      account = await getAccount(connection, associatedToken, commitment, programId);
    } catch (error: unknown) {
      if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
        try {
          const transaction = new Transaction().add(
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

          const signed = await signTransaction(transaction);
          const sig = await connection.sendRawTransaction(signed.serialize());
          await T.confirmedSig(sig);
        } catch (error: unknown) {}
        account = await getAccount(connection, associatedToken, commitment, programId);
      } else {
        throw error;
      }
    }

    if (!account.mint.equals(mint)) throw new TokenInvalidMintError();
    if (!account.owner.equals(owner)) throw new TokenInvalidOwnerError();

    return account;
  }

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

    if (sig.isErr) {
      return sig;
    } else {
      T.confirmedSig(sig.value);
      return Result.ok(keypair.publicKey.toBase58());
    }
  }

  export const mint = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    totalAmount: number,
    mintDecimal: number,
    signTransaction: (tx: Transaction) => any,
    // ): Promise<Result<Instruction, Error>> => {
  ) => {
    const connection = Node.getConnection();
    const tokenAssociated =
      await getOrCreateAssociatedTokenAccount(
        tokenKey,
        owner,
        signTransaction
      ) as Account
    // .then(Result.ok)
    // .catch(Result.err);

    // if (tokenAssociated.isErr) {
    // return Result.err(tokenAssociated.error);
    // }

    const transaction = new Transaction().add(
      createMintToCheckedInstruction(
        tokenKey,
        tokenAssociated.address,
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

    const signed = await signTransaction(transaction);
    const sig = await connection.sendRawTransaction(signed.serialize())
    console.log(sig);
  }
}
