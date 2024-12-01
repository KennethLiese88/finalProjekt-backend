import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Login.css";
import { toast } from "react-toastify";

export default function Login({ setRegistered }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const formData = {
    email: loginEmail,
    password: loginPassword,
  };

  async function loginUser(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);
        setUserData(data);
        navigate("/gallery");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <section className="login_section">
      <hr />
      <h2>Discover Artwork from the Past</h2>
      <form onSubmit={loginUser}>
        <fieldset>
          <legend>Login to your Account</legend>
          <label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
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
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            Password
          </label>
        </fieldset>
        <button type="submit">Login</button>
      </form>
      <p>Or create a new Account</p>
      <button onClick={() => setRegistered(false)}>Register</button>
      <hr />
    </section>
  );
}
