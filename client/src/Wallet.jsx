import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import {keccak256} from "ethereum-cryptography/keccak";
import {toHex} from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, privateKey, setPrivateKey, publicKey, setPublicKey, balance, setBalance }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = secp.getPublicKey(privateKey);
    setPublicKey(toHex(publicKey));
    const address = "0x" + toHex(keccak256(publicKey.slice(1).slice(-20)));
    console.log(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type a private key, for example: 1d211cb10357378cc7485c43537c8d8f5f56e61a4f344aab4670519f1c6a03a7" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
