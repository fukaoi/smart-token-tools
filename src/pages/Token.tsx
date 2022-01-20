import {useEffect} from 'react';
import {
  TransactionInstruction,
  Transaction,
  PublicKey,
  Connection,
  SystemProgram
} from '@solana/web3.js';

import { SplToken } from '../solanaSuites/spl-token';

// export const encode = (data: string): Buffer => Buffer.from(data);

// const instruction = new TransactionInstruction({
// programId: memoProgramId,
// data: encode('data'),
// keys: [{
// pubkey: new PublicKey('Gd5ThBjFzEbjfbJFGqwmBjDXR9grpAdqzb2L51viTqYV'),
// isSigner: true,
// isWritable: true
// }]
// });

// const instruction = SystemProgram.transfer({
  // fromPubkey: userPublicKey,
  // toPubkey: receiptPublicKey,
  // lamports: 10 //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
// });

const Token = () => {
  // useEffect(() => {
    // window.solana.connect().then(async (wallet: any) => {
      // console.log(wallet.publicKey.toString(), wallet);
      // const connection = new Connection('http://api.devnet.solana.com');
      // const transaction = new Transaction();
      // let blockhashObj = await connection.getRecentBlockhash();
      // transaction.recentBlockhash = blockhashObj.blockhash;
      // const tx = transaction.add(instruction);
      // tx.feePayer = userPublicKey;
      // const signed = await window.solana.signTransaction(tx);
      // console.log(signed);
      // const sig = await connection.sendRawTransaction(signed.serialize());
      // console.log(sig);
    // });
  // }, []);
  
  useEffect(() => {
    window.solana.connect().then(async (wallet: any) => {
      SplToken.createMint(
        wallet.publicKey,
        1,
        window.solana.signTransaction
      );
    });
  });

  return (
    <div>
      Token page
    </div>
  );
};
export default Token;
