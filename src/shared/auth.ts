export namespace Auth {
  export const isConnectedWallet = async() => {
    alert(await window.solana.isConnected); 
  }
}
