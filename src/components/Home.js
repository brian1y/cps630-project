function Home ({ user }) {
    // TODO: Check if logged in

    // Default landing page for non logged in users
    return (
        <main id='landing'>
            {user ? <p id='welcome-message'>Hello {user}!</p> : ''}

            {/* Debugging stuff; to be removed */}
            <ul>
                <li>
                    <a href='/post-ad'>Post Ad</a>
                </li>
                <li>
                    <a href='/listing'>Post Listing</a>
                </li>
                <li>
                    <a href='/admin'>Admin Page</a>
                </li>
                <li>
                    <a href='/send-message'>Send Message</a>
                </li>
                <li>
                    <a href='/inbox'>Inbox</a>
                </li>
            </ul>
        </main>
    );
}

// Debugging: to be removed
Home.defaultProps = {
    user: JSON.parse(localStorage.getItem('user')).username,
};

export default Home;
