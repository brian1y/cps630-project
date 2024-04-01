import '../css/Navbar.css'

function CorrespondingDisplay({ user }) {
    if (user) {
        return <div>Dashboard</div>
    }
    else {
        return <div>Login</div>
    }
}

function Navbar({ user }) {

    // TODO: Add login check

    return (
        <header id='navbar'>
            <div>
                <a href='/'>SiteName</a>
            </div>
            <CorrespondingDisplay user={user} />
        </header>
    );
}

// Debugging: to be removed
Navbar.defaultProps = {
    user: 'User',
};

export default Navbar;