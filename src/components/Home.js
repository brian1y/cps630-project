import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import Loading from './Loading';
import '../css/Home.css';
import UserPage from './UserPage';

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

    // Generates render for non logged in users
    function guestView() {
        return (
            <>
                <ul className='shadowBox'>
                    <li>
                        <a href='/listing'>Post Listing</a>
                    </li>
                </ul>
            </>
        );
    }

    return (
        <main id='landing'>
            {/* Changes render depending on login state (user included in check as a fail-safe) */}
            {isLoggedIn && user ? <UserPage /> : guestView()}
        </main>
    );
}

export default Home;
