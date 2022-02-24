import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const useSessionCheck = (setWalletAddress: (address: string) => void) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.solana) {
      if (!window.solana.isConnected) {
        const message = 'Your session disconnected from phantom wallet';
        navigate('/', {state: {warning: message}});
      }
      window.solana.connect().then((conn: any) => {
        setWalletAddress(conn.publicKey.toString());
      });
    }
    const id = setInterval(() => {
      window.solana.connect({onlyIfTrusted: true}).then((conn: any) => {
        setWalletAddress(conn.publicKey.toString());
      });
    }, 5000);
    return () => clearInterval(id);
  });

}
