import React, { useState } from 'react';
import "./Register.css";

export default function Registeregister({setRegistered}) {
  const [registerUsername, setRegisterUsername] = useState();
  const [registerEmail, setRegisterEmail] = useState();
  const [registerPassword, setRegisterPassword] = useState();

  const formData = {
    username: registerUsername,
    email: registerEmail,
    password: registerPassword
  }

  async function registerNewUser(e) {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) return alert("Invalid or missing Input")

      const data = await response.json();
      alert("Success!")
      setRegistered(true)
    } catch (error) {
      console.error("Registrierung fehlgeschlagen:", error);
    }
  }

  return (
    <section className='register_section'>
      <form>
        <fieldset>
          <legend>Register your Account</legend>
          <label>
            <input
              type="text"
              id="username"
              name="username"
              value={registerUsername}
              onChange={(e)=>setRegisterUsername(e.target.value)}
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
              onChange={(e)=>setRegisterEmail(e.target.value)}
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
              onChange={(e)=>setRegisterPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            Password
          </label>
          <p>Profil Picture</p>
        </fieldset>
      <button onClick={registerNewUser}>Register</button>
      </form>
    </section>
  )
}
