import React, { useState } from 'react';
import "./Home.css";
import Login from '../components/Login';
import Register from '../components/Register';

export default function Home() {
    const [registered, setRegistered] = useState(true)

  return (
    <>
        {registered ? 
        <Login setRegistered={setRegistered}/> : 
        <Register setRegistered={setRegistered}/> }
        <footer>
            web-dev final projekt - backend
        </footer>
    </>
  )
}
