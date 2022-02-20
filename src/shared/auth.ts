export module Auth {
  export const isConnectedWallet = async() => {
    alert(await window.solana.isConnected); 
  }
}
