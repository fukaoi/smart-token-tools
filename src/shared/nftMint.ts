import { Metaplex } from '@solana-suite/nft';
import { Node, Result } from '@solana-suite/shared';
import { Transaction } from '@solana/web3.js';

export const nftMint = async (
  file: string,
  name: string,
  description: string,
  royalty: number,
  address: string,
  feePayer: string,
  signTransaction: (tx: Transaction | Transaction[]) => any
) => {
  console.log(file);
  console.log(name);
  console.log(description);
  console.log(royalty);
  console.log(address);
  console.log(feePayer);
  const inst1 = await Metaplex.mint(
    {
      filePath: file,
      name,
      description,
      symbol: 'ATONOY',
      royalty,
      storageType: 'nftStorage',
    },
    address.toPublicKey(),
    feePayer.toKeypair()
  );

  const inst = inst1.unwrap().instructions;
  const tx = new Transaction();
  inst.map((i) => tx.add(i));
  tx.feePayer = feePayer.toPublicKey();
  const blockhashObj = await Node.getConnection().getRecentBlockhash();
  tx.recentBlockhash = blockhashObj.blockhash;

  const signed = await signTransaction([tx]);

  for (let sign of signed) {
    const sig = await Node.getConnection()
      .sendRawTransaction(sign.serialize())
      .then(Result.ok)
      .catch(Result.err);
    if (sig.isErr) return Result.err(sig.error);
  }
  return Result.ok(inst1.unwrap().data);
};

// export {};
