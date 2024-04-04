import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import '../css/PostAd.css'
import Loading from './Loading';

function PostAd() {
    // TODO: Add price & location
    // TODO: Append user to post submission

    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);

    // States for user inputs
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');

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


    // Handle post submission
    const handleSubmit = (e) => {
        const newPost = { id: Date.now(), title, desc, category };
        setTitle('');
        setDesc('');
        setCategory('');

        // Send newPost to server
        fetch('http://localhost:3001/api/create-post', {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(newPost)
        })

            // Server response
            .then((resp) => {
                console.log(resp);
                if (resp.ok) {
                    alert('Post submitted!');
                    resp.json().then(data => console.log(data))
                }
                else {
                    resp.json().then(data => alert(data.error))
                }
            })
    };

    isLoading && <Loading />;

    return (
        <div id='post-page'>
            <h2>
                Create New Ad
            </h2>
            <hr />
            <fieldset id='ad-form'>
                <legend>
                    New Ad
                </legend>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Title</p>
                        <input type='text' id='title' autoComplete='off' value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        <p>Description</p>
                        <textarea id='desc' value={desc} onChange={(e) => setDesc(e.target.value)} required />
                    </label>

                    <fieldset id='set-type'>
                        <legend>
                            Category
                        </legend>
                        <label>
                            <input type='radio' name='ad-type' value='wanted' onChange={(e) => setCategory(e.target.value)} required />
                            Item Wanted
                        </label>
                        <label>
                            <input type='radio' name='ad-type' value='sale' onChange={(e) => setCategory(e.target.value)} />
                            Item for Sale
                        </label>
                        <label>
                            <input type='radio' name='ad-type' value='service' onChange={(e) => setCategory(e.target.value)} />
                            Academic Service
                        </label>
                    </fieldset>

                    { /*  
                    -> System to handle images??

                    <label>
                        <p>Image</p>
                        <input type='file' accept='image/png, image/jpeg'/>
                    </label>
                    */ }

                    <input id='submit' type='submit' value='Submit Ad' />
                </form>
            </fieldset>
        </div>
    )
}

export default PostAd;