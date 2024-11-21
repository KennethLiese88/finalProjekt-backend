import React from 'react';
import "./Register.css";

export default function Registeregister({setRegistered}) {
  return (
    <section class='register_section'>
      <form>
        <fieldset>
          <legend>Register your Account</legend>
          <label>
            <input
              type="text"
              id="username"
              name="username"
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
              placeholder="Enter your password"
              required
            />
            Password
          </label>
          <p>Profil Picture</p>
        </fieldset>
      <button onClick={()=>setRegistered(true)}>Submit</button>
      </form>
    </section>
  )
}
