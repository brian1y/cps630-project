import '../css/Navbar.css'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

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
        </header>
    );
}

export default Navbar;