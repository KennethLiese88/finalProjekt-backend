import React, { useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";

export default function Registeregister({ setRegistered }) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const formData = {
    username: registerUsername,
    email: registerEmail,
    password: registerPassword,
  };

  async function registerNewUser(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
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
        setRegistered(true);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        "There was a problem with the registration. Please try again later."
      );
    }
  }

  return (
    <section className="register_section">
      <form>
        <fieldset>
          <legend>Register your Account</legend>
          <label>
            <input
              type="text"
              id="username"
              name="username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
            Username
          </label>
          <label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
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
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            Password
          </label>
          {/* <label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              value={}
              onChange={}
            />
            Profile Picture
          </label> */}
        </fieldset>
        <button onClick={registerNewUser}>Register</button>
        <button className="back_button" onClick={() => setRegistered(true)}>
          go back
        </button>
      </form>
    </section>
  );
}
