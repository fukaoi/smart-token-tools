import {useEffect} from 'react';
import {SplToken} from '../solanaSuites/spl-token';

export const encode = (data: string): Buffer => Buffer.from(data);

const Token = () => {
  useEffect(() => {
    window.solana.connect().then(async (wallet: any) => {
      SplToken.createMint(
        wallet.publicKey,
        1,
        window.solana.signTransaction
      );
    });
  }, []);

  return (
    <div>
      Token page
    </div>
  );
};
export default Token;
