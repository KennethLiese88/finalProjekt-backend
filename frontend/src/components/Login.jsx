import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ setRegistered }) {
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const navigate = useNavigate();

  function redirect(e) {
    e.preventDefault();
    navigate("/gallery");
  }

  return (
    <section className="login_section">
      <hr />
      <h2>Discover Artwork from the Past</h2>
      <form>
        <fieldset>
          <legend>Login to your Account</legend>
          <label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginEmail}
              onChange={(e)=>setLoginEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            Email
          </label>
          <label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginPassword}
              onChange={(e)=>setLoginPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            Password
          </label>
        </fieldset>
        <button type="submit" onClick={redirect}>Login</button>
      </form>
      <p>Or create a new Account</p>
      <button onClick={() => setRegistered(false)}>Register</button>
      <hr />
    </section>
  );
}
