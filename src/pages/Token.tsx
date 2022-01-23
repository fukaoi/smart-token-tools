import assert from 'assert';
import {useEffect} from 'react';
import {SplToken} from '../solanaSuites/spl-token';

const mint = () => {
  window.solana.connect().then(async (wallet: any) => {
    const sig = await SplToken.createMint(
      wallet.publicKey,
      1,
      window.solana.signTransaction
    );
    sig.isErr && assert(sig);
  });
}


const Token = () => {
  useEffect(() => {
    mint();
  }, []);

  return (
    <div>
      Token page
    </div>
  );
};
export default Token;
