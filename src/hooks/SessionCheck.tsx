import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSessionCheck = (
  setWalletAddress: (address: string) => void
) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.Phantom) {
      if (!window.Phantom.isConnected) {
        const message = 'Your session disconnected from phantom wallet';
        navigate('/', { state: { warning: message } });
      }
      window.Phantom.connect().then((conn: any) => {
        setWalletAddress(conn.publicKey.toString());
      });
    }
    const id = setInterval(() => {
      window.Phantom.connect().then((conn: any) => {
        setWalletAddress(conn.publicKey.toString());
      });
    }, 5000);
    return () => clearInterval(id);
  });
};
