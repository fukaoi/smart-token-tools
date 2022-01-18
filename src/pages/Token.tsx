import {useEffect} from 'react';
import * as core from '@solana-suite/core';
import * as shared from '@solana-suite/shared';
import {
  TransactionInstruction,
  Transaction,
  PublicKey,
  Connection,
  SystemProgram
} from '@solana/web3.js';

console.log(shared.Constants.API_URL);

export const encode = (data: string): Buffer => Buffer.from(data);

const userPublicKey = new PublicKey('Gd5ThBjFzEbjfbJFGqwmBjDXR9grpAdqzb2L51viTqYV');
const receiptPublicKey = new PublicKey('9vguAhFraAyv8QGukf8MvsLE3HHWKN3LqHMKMKtSirv3');
const memoProgramId = new PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo');

const instruction = new TransactionInstruction({
programId: memoProgramId,
data: encode('data'),
keys: [{
pubkey: new PublicKey('Gd5ThBjFzEbjfbJFGqwmBjDXR9grpAdqzb2L51viTqYV'),
isSigner: true,
isWritable: true
}]
});

// const instruction = SystemProgram.transfer({
  // fromPubkey: userPublicKey,
  // toPubkey: receiptPublicKey,
  // lamports: 10 //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
// });

const Token = () => {
  useEffect(() => {
    window.solana.connect().then(async (wallet: any) => {
      console.log(wallet.publicKey.toString(), wallet);
      const connection = new Connection('http://api.devnet.solana.com');
      const transaction = new Transaction();
      let blockhashObj = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhashObj.blockhash;
      const tx = transaction.add(instruction);
      tx.feePayer = userPublicKey;
      const signed = await window.solana.signTransaction(tx);
      console.log(signed);
      const sig = await connection.sendRawTransaction(signed.serialize());
      console.log(sig);
    });
  }, []);

  return (
    <div>
      Token page
    </div>
  );
};
export default Token;
