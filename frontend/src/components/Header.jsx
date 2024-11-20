import React from 'react';
import { Outlet } from 'react-router-dom';
import "./Header.css";

export default function Header() {
  return (
    <>
        <header>
            <div class='title_field'>
                <h1>Sketch Archive</h1>
                <i class="fa-solid fa-pencil fa-x2"></i>
            </div>
            <div class='user_field'>
                <p>Username</p>
                <img src="https://thumbs.dreamstime.com/b/happy-girl-avatar-funny-child-profile-picture-isolated-white-background-239402901.jpg" alt="user_picture" />
                <p>Logout</p>
            </div>
        </header>
        <Outlet />
    </>
  )
}
