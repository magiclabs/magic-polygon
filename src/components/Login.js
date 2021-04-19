import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { magicEthereum } from "../magic";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const history = useHistory();

  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const login = useCallback(async () => {    
    setIsLoggingIn(true);

    try {
      await magicEthereum.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href,
      });
      history.push("/");
    } catch {
      setIsLoggingIn(false);
    }
  }, [email]);

  /**
   * Saves the value of our email input into component state.
   */
  const handleInputOnChange = useCallback(event => {
    setEmail(event.target.value);
  }, []);

  return (
    <div className="container">
      <h1>Please sign up or login</h1>
      <input
        type="email"
        name="email"
        required="required"
        placeholder="Enter your email"
        onChange={handleInputOnChange}
        disabled={isLoggingIn}
      />
      <button onClick={login} disabled={isLoggingIn}>Send</button>
    </div>
  );
}

