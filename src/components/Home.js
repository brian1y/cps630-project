import { useNavigate } from "react-router-dom";
function Home ({ user }) {
    
    const navigate = useNavigate();
    
    // Default landing page for non logged in users
    return (
        <main id='landing'>
            {user ? <p id='welcome-message'>Hello {user}!</p> : ''}

            {/* Debugging stuff; to be removed */}
            <ul>
                <li>
                    <button onClick={() => navigate('/post-ad')}>Post Ad</button>
                </li>
                <li>
                    <div onClick={() => navigate('/listing')}>Post Listing</div>
                </li>
                <li>
                    <div onClick={() => navigate('/admin')}>Admin Page</div>
                </li>
            </ul>
        </main>
    );
}

// Debugging: to be removed
Home.defaultProps = {
    user: 'User',
};

export default Home;