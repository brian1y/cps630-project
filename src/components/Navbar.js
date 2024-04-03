import '../css/Navbar.css'
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    // TODO: Add login check

    return (
        <header id='navbar'>
            <div>
                <a href='/'>SiteName</a>
            </div>
            {user && (
                <div>
                    <span>{user.username}</span>
                    <button onClick={handleClick}>Log out</button>
                </div>
            )}
            {!user && (
                <div>
                    <a href='/login'>Login/Signup</a>
                </div>
            )}
        </div>
    );
}

// Debugging: to be removed
Navbar.defaultProps = {
    user: 'User',
};

export default Navbar;