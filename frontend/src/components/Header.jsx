import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import "./Header.css";

export default function Header() {
    const {userData, setUserData} = useContext(UserContext);
    const navigate = useNavigate();
    
    function redirect() {
        setUserData({})
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
                <p>{userData.username || "Username"}</p>
                <img src="https://thumbs.dreamstime.com/b/happy-girl-avatar-funny-child-profile-picture-isolated-white-background-239402901.jpg" alt="user_picture" />
                <button className={!userData.username ? "button_off" : "button_on" }
                    onClick={redirect}>Logout
                </button>
            </div>
        </header>
        <Outlet />
    </>
  )
}
