import React, { useEffect, useState } from 'react';
import '../css/PostListing.css'

function PostListing() {
    const [posts, setPosts] = useState('')
    const [category, setCategory] = useState('')
    const [first, setFirst] = useState(true);
    
    // TODO: Additional filter options: price & location filters + text matching
    
    // Displays search bar upon call
    function search_bar() {
        return (
            <div id='sort-bar'>
                <form onSubmit={handleInput}>
                    {/*
                    TODO: Handle user input

                    <input type='search' id='text-search'></input>
                    */}
                    <select name='category' id='category-select' onChange={(e) => setCategory(e.target.value)} required>
                        <option disabled selected className='hide'></option>
                        <option value='all'>All</option>
                        <option value='wanted'>Items Wanted</option>
                        <option value='sale'>Items for Sale</option>
                        <option value='service'>Academic Service</option>
                    </select>
                    <input type='submit' value='Search'/>
                </form>
            </div>
        )
    }

    // Handle filter
    const handleInput = (e) => {
        e.preventDefault();
        const filter = {category: category};
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

    // If no filter is set, display search bar
    if (first) {
        return search_bar();
    }

    // No posts
    if (!posts) {
        return (
            <div>
                No posts to fetch.
            </div>
        )
    }

    // Main display
    return (
        <div id='listing'>
            {search_bar()}

            <div id='post-container'>
                {/* Map DB contents */}
                {posts.map((post) => (
                    <div className={`${post.category} post`} key={post.id}>
                        <h3>
                            {post.title}
                        </h3>
                        <p>
                            {post.desc}
                        </p>
                    </div>        
                ))}
            </div>
        </div>
    )
}

export default PostListing;