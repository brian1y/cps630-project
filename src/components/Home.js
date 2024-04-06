import { useState, useEffect } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import Loading from './Loading';
import '../css/Home.css';
import { Link } from 'react-router-dom';

function Home() {
    const { user } = useAuthContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Login check
    useEffect(() => {
        if (user) {
            if (!isLoading) {
                setIsLoggedIn(true);
            }
            else {
                setIsLoading(false);
            }
        }
    }, [user, isLoading])

    // Displays loading page, if loading
    isLoading && <Loading />;

    // Generates render for logged in users
    function loggedInView() {
        return (
            <>
                <article id='user-page'>
                    <section id='user-box'>
                        <div id='profile'>
                            <p>{user.username[0]}</p>
                        </div>
                        <h1 id='name'>{user.username}</h1>
                    </section>
                    <section id='content'>
                        {user && <h2 id='welcome-message'><span>Hello</span> {user.username}!</h2>}
                        <nav>
                            <ul>
                                <li>
                                    <Link to='/post-ad'>Post Ad</Link>
                                </li>
                                <li>
                                    <Link to='/listing'>Post Listing</Link>
                                </li>
                                <li>
                                    <Link to='/admin'>Admin Page</Link>
                                </li>
                                <li>
                                    <Link to='/send-message'>Send Message</Link>
                                </li>
                                <li>
                                    <Link to='/inbox'>Inbox</Link>
                                </li>
                            </ul>
                        </nav>
                    </section>
                </article>
            </>
        );
    }

    // Generates render for non logged in users
    function guestView() {
        return (
            <>
                <ul className='shadowBox'>
                    <li>
                        <Link to="/listing">Post Listing</Link>
                    </li>
                </ul>
            </>
        );
    }

    return (
        <main id='landing'>
            {/* Changes render depending on login state (user included in check as a fail-safe) */}
            {isLoggedIn && user ? loggedInView() : guestView()}
        </main>
    );
}

export default Home;
