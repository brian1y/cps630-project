import { useState, useEffect } from 'react';
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
        // Main display
        return (
            <PostListing canDelete={true} />
        )
    }

    // TODO: Add navigation menu to switch between dash and listing
    return AdminListing();
}

export default AdminPage;