import assert from "assert";
import { Metaplex } from "@solana-suite/nft";
import { Node, sleep } from "@solana-suite/shared";

export const nftMint = async (
  file: string,
  name: string,
  description: string,
  royalty: number,
  address: string,
  feePayer: string
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
      symbol: "ATONOY",
      royalty,
      storageType: "nftStorage",
    },
    address.toPublicKey(),
    feePayer.toKeypair()
  );

  // this is NFT ID
  (await inst1.submit()).match(
    async (value) => await Node.confirmedSig(value),
    (error) => assert.fail(error)
  );

  await sleep(5);

  const mint = inst1.unwrap().data as string;
  console.log("# mint: ", mint);
  console.log("mint");
};

// export {};
