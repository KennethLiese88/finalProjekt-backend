import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import "./Header.css";

export default function Header() {
    const navigate = useNavigate();
    
    function redirect() {
        navigate("/")
    }

  return (
    <>
        <header>
            <div className='title_field'>
                <h1>Sketch Archive</h1>
                <i className="fa-solid fa-pencil fa-x2"></i>
            </div>
            <div className='user_field'>
                <p>Username</p>
                <img src="https://thumbs.dreamstime.com/b/happy-girl-avatar-funny-child-profile-picture-isolated-white-background-239402901.jpg" alt="user_picture" />
                <button onClick={redirect}>Logout</button>
            </div>
        </header>
        <Outlet />
    </>
  )
}
