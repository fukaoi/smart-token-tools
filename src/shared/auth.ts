export namespace Auth {
  export const isConnectedWallet = async() => {
    alert(await window.Phantom.isConnected); 
  }
}
