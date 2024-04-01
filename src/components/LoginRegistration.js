import React, { useState } from 'react';
import '../css/LoginRegistration.css'
import user_icon from '../assets/username.png'
import pass_icon from '../assets/password.png'

function LoginRegistration() {

    const [action,setAction] = useState("Sign Up");

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img className="icon" src={user_icon} alt="username-icon"></img>
                    <input type="text" placeholder="Username"></input>
                </div>
                <div className="input">
                    <img className="icon" src={pass_icon} alt="password-icon"></img>
                    <input type="text" placeholder="Password"></input>
                </div>
            </div>
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>
        </div>
    )
}

export default LoginRegistration