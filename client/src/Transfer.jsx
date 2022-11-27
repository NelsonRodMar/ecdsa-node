import {useState} from "react";
import server from "./server";

function Transfer({address, setBalance}) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [signature, setSignature] = useState("");
    const [recoveryBit, setRecoveryBit] = useState("");
    const [publicKey, setPublicKey] = useState("");

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function transfer(evt) {
        evt.preventDefault();

        try {
            const {
                data: {balance},
            } = await server.post(`send`, {
                sender: address,
                amount: parseInt(sendAmount),
                recipient,
                signature,
                recoveryBit: parseInt(recoveryBit),
                publicKey,
            });
            setBalance(balance);
        } catch (ex) {
            alert(ex.response.data.message);
        }
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={sendAmount}
                    onChange={setValue(setSendAmount)}
                ></input>
            </label>

            <label>
                Recipient
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <label>
                Signature
                <input
                    placeholder="Type a signature, for example: 304402200d9ba04e29e93720cebb75fb3dd882d461eb7f18af7fcc803431c82e8b280bac02205d73bdb01d1eddc45184a8d93d5857fa25096ac8d55386729d99c6a436a1ff69"
                    value={signature}
                    onChange={setValue(setSignature)}
                ></input>
            </label>

            <label>
                Revovery Bit
                <input
                    placeholder="Type the recovery bit, for example: 0"
                    value={recoveryBit}
                    onChange={setValue(setRecoveryBit)}
                ></input>
            </label>

            <label>
                Public Key (to verify signature)
                <input
                    placeholder="Type your public key, for example: 043dc1113320dcefcb061ded03da262656161118f8cb4690cdb5bccfe1f0c4ee5ab955e492843ba8cf52094d3a0c193e36be9c027a8bd9f013107599ed17a47ce3"
                    value={publicKey}
                    onChange={setValue(setPublicKey)}
                ></input>
            </label>

            <input type="submit" className="button" value="Transfer"/>
        </form>
    );
}

export default Transfer;
