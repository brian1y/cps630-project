import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import PostListing from './PostListing';
import '../css/PostListing.css';
import '../css/Admin.css';

function AdminPage() {

    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);

    const redirect = new useNavigate();

    // Login check
    useEffect(() => {
        if (!user) {
            if (!isLoading) {
                redirect('/login', { replace: true });
            }
            else {
                setIsLoading(false);
            }
        }
        // eslint-disable-next-line
    }, [user, isLoading])

    // TODO: Check if admin

    /*
    // Used for admin-related actions (i.e, reset passwords)
    function AdminDash() {
    
    }
    */

    // Used for post-related actions (i.e, post deletion)
    function AdminListing() {

        const handleDeletion = (id, e) => {
            e.preventDefault();
            console.log(e);
            if (window.confirm("Do you really want to delete this post?")) {
                const remove_id = { _id: id }

                // Delete post
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

        // Main display
        return (
            <PostListing isAdmin={true} handleDeletion={handleDeletion} />
        )
    }

    // TODO: Add navigation menu to switch between dash and listing
    return AdminListing();
}

export default AdminPage;