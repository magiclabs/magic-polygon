import React, { useCallback } from "react";
import { useHistory } from "react-router";

export default function Info({ user, magic, handleChangeNetwork, balance }) {
  const history = useHistory();

  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      history.push("/login");
    })
  }, [history]);

  return (
    <>
      <div className="container">
          <h1>Current user: {user.email}</h1>
          <button onClick={logout}>Logout</button>
        </div>

        <div className="container">
          <h1>Network</h1>
          <div className="info">
            <select name="network" onChange={(e) => handleChangeNetwork(e)}>
              <option value="ethereum">Ethereum (Goerli Testnet)</option>
              <option value="matic">Matic (Mumbai Testnet)</option>
            </select>
          </div>
          <h1>Public Address</h1>
          <div className="info">{user.publicAddress}</div>
          <h1>Balance</h1>
          <div className="info">{balance.toString().substring(0, 6)} {magic.network === 'matic' ? 'MATIC' : 'ETH'}</div>
          <div><a href="https://goerlifaucet.com/" target="_blank">Get Test ETH</a></div>
          <div><a href="https://faucet.matic.network/" target="_blank">Get Test MATIC</a></div>
        </div>
    </>
  )
}