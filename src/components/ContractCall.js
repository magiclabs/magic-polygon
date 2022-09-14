import React, { useState, useRef } from "react";

export default function ContractCall({ network, user, fetchBalance, message, contract, fetchContractMessage }) {
  const [newMessage, setNewMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [txnHash, setTxnHash] = useState();
  const updateBtnRef = useRef();

  // Update contract `message` value on the blockchain
  const updateContractMessage = async () => {
    if (!newMessage) return;
    disableForm();
    const receipt = await contract.methods.update(newMessage).send({ from: user.publicAddress });
    setTxnHash(receipt.transactionHash);
    enableForm();
  }

  // Disable input form while the transaction is being confirmed
  const disableForm = () => {
    setTxnHash(); // Clear link to previous transaction hash
    setDisabled(true);
    updateBtnRef.current.innerText = 'Submitted...';
  }

  // Re-enable input form once the transaction is confirmed
  const enableForm = () => {
    setDisabled(false);
    setNewMessage('');
    fetchBalance(user.publicAddress);
    fetchContractMessage()
    updateBtnRef.current.innerText = 'Update';
  }


  return (
    <div className="container">
          <h1>Contract Message</h1>
          <div className="info">{message}</div>

          <h1>Update Message</h1>
          <input type="text" disabled={disabled} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="full-width" placeholder="New Message" />
          <button disabled={disabled} ref={updateBtnRef} onClick={updateContractMessage}>Update</button>
          {
          txnHash &&
            <div className="info">
              <a href={network === "ethereum" ? `https://goerli.etherscan.io/tx/${txnHash}` : `https://explorer-mumbai.maticvigil.com/tx/${txnHash}`} target="_blank">
                View Transaction
              </a> ↗️
            </div>
          }
        </div>
  )
}