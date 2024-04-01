import React, { useState } from 'react';
import '../css/PostListing.css';
import '../css/Admin.css';

function AdminPage() {
    // TODO: Check if admin

    /*
    // Used for admin-related actions (i.e, reset passwords)
    function AdminDash() {
    
    }
    */

    // Used for post-related actions (i.e, post deletion)
    function AdminListing() {
        const [posts, setPosts] = useState('')
        const [category, setCategory] = useState('')
        const [first, setFirst] = useState(true);
        
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

        const handleDeletion = (id, e) => {
            e.preventDefault();
            console.log(e);
            if (window.confirm("Do you really want to delete this post?")) {
                // Delete post
                const remove_id = {_id: id}
                

                fetch('http://localhost:3001/api/delete-post', {
                    method: 'POST',
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: JSON.stringify(remove_id)
                })
                        
                // Server response
                .then((resp) => {
                    console.log(resp);
                    if (resp.ok) {
                        alert('Post deleted.');
                        resp.json().then(data => console.log(data))
                        window.location.reload();
                    }
                    else {
                        resp.json().then(data => alert(data.error))
                    }
                })
            }
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
                        <div className={`${post.category} post`} key={post._id}>
                            <div className='delete-post'>
                                <button type='button' onClick={(e) => handleDeletion(post._id, e)}>X</button>
                            </div>
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

    // TODO: Add navigation menu to switch between dash and listing
    return AdminListing();
}

export default AdminPage;