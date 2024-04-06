import '../css/Navbar.css'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header id='navbar'>
            <div>
                <Link to='/'>SiteName</Link>
            </div>
            {user && (
                <div>
                    <span>{user.username}</span>
                    <button onClick={handleClick}>Log out</button>
                </div>
            )}
            {!user && (
                <div>
                    <Link to='/login'>Login/Signup</Link>
                </div>
            )}
        </header>
    );
}

export default Navbar;