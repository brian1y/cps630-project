import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import MapPosts from "./MapPosts";
import '../css/PostListing.css';
import Loading from './Loading';

function UserPage() {
    const { user } = useAuthContext();
    const [posts, setPosts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoading) {
            // Fetch posts
            fetch('http://localhost:3001/api/get-posts-by-user', {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(posts => setPosts(posts))
        }
        else {
            setIsLoading(false);
        }
    }, [isLoading])

    isLoading && <Loading />

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
                    </nav>
                </section>
                <section id='grid-2' className='shadowBox'>
                    <h2>Posts:</h2>
                    <section id='user-posts'>
                        {console.log(posts)}
                        {/* Renders based on if there are posts */}
                        {posts
                            ? posts.length === 0
                                ? <div id='no-posts'><p>You currently have no ads posted.</p></div>
                                : <section id='post-container' className='backgroundGray'><MapPosts canDelete={true} posts={posts} /></section>
                            : <div id='no-posts'><p>Loading...</p></div>}
                    </section>
                </section>
            </article>
        </>
    );
}

export default UserPage;