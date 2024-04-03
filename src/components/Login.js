import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../css/LoginRegistration.css'
import user_icon from '../assets/username.png'
import pass_icon from '../assets/password.png'
import { useLogin } from '../hooks/useLogin';

function Login() {

    // Page title
    useEffect(() => {
        document.title = 'Login | SiteName';
    }, []);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(username, password)
    }


    return (
        <div className="container">
            <div className="header">
                <div className="text">Log In</div>
                <div className="underline"></div>
            </div>
            <form className="inputs" onSubmit={handleSubmit}>
                <div className="input">
                    <img className="icon" src={user_icon} alt="username-icon"></img>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username}></input>
                </div>
                <div className="input">
                    <img className="icon" src={pass_icon} alt="password-icon"></img>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                </div>
                {error && <div className='invalid'>{error}</div>}
                <div className="submit-container">
                    <button className="submit" type="submit" disabled={isLoading}>Submit</button>
                </div>
                <div className="submit-container">
                    <Link to="/Registration" className="submit gray">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login