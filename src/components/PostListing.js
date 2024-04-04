import React, { useState } from 'react';
import '../css/PostListing.css';

function PostListing({ isAdmin, handleDeletion }) {
    const [posts, setPosts] = useState('')
    const [textSearch, setTextSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [first, setFirst] = useState(true);
    
    // TODO: Additional filter options: price & location filters + text matching
    
    // Displays search bar upon call
    function searchBar() {
        return (
            <section id='sort-bar'>
                <form onSubmit={handleInput}>
                    <input type='search' id='text-search' autoComplete='off' onChange={(e) => setTextSearch(e.target.value)}></input>
                    <select name='category' id='category-select' onChange={(e) => setCategory(e.target.value)}>
                        <option value='all' selected>All</option>
                        <option value='wanted'>Items Wanted</option>
                        <option value='sale'>Items for Sale</option>
                        <option value='service'>Academic Service</option>
                    </select>
                    <input type='submit' value='Search'/>
                </form>
            </section>
        )
    }

    // Handle filter
    const listingOnload = () => {
        const filter = {category: category, query: ''};
        setFirst(null);
        
        // Fetch posts
        fetch('http://localhost:3001/api/get-posts', {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(filter)
        })
        .then(res => res.json())
        .then(posts => setPosts(posts))
    }

    // Handle filter
    const handleInput = (e) => {
        e.preventDefault();
        const filter = {category: category, query: textSearch};
        
        // Fetch posts
        fetch('http://localhost:3001/api/get-posts', {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(filter)
        })
        .then(res => res.json())
        .then(posts => setPosts(posts))
    }

    // Query DB on first load
    if (first) {
        return listingOnload();
    }

    // Loading (?)
    if (!posts) {
        return (
            <>
                {searchBar()}
                <section id='no-results'>
                    <p>
                        Loading...
                    </p>
                </section>
            </>
        )
    }

    // No posts
    if (posts.length === 0) {
        return (
            <>
                {searchBar()}
                <section id='no-results'>
                    <p>
                        No results found.
                    </p>
                </section>
            </>
        )
    }

    // Main display
    return (
        <>
            {searchBar()}

            <section id='post-container'>
                {/* Map DB contents */}
                {posts.map((post) => (
                    <article tabIndex={0} className={`${post.category} post`} key={post._id}>
                        
                        {/* Checks if admin, then displays deletion option */}
                        {isAdmin 
                        ? 
                            <div className='delete-post'>
                                <button type='button' onClick={(e) => handleDeletion(post._id, e)}>X</button>
                            </div> 
                        : 
                            ''
                        }
    
                        <h3>
                            {post.title}
                        </h3>
                        <p>
                            ${post.price}<br></br>
                            Location: {post.location}<br></br>
                            <img src={require(`../images/${post.imageName}`)} alt='post-image' /><br></br>
                            {post.desc}
                        </p>
                    </article>        
                ))}
            </section>
        </>
    )
}

PostListing.defaultProps = {
    isAdmin: null,
};

export default PostListing;