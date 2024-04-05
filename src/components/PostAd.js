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
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState();

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
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('desc', desc);
        formData.append('category', category);
        formData.append('image', file);
        formData.append('username', user.username);

        fetch('http://localhost:3001/api/create-post', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to submit ad');
            })
            .then(data => {
                console.log(data);
                alert('Post submitted!');
                setTitle('');
                setPrice('');
                setLocation('');
                setDesc('');
                setCategory('');
                setFile(null);
            })
            .catch(error => {
                console.log('Error:', error);
                alert(error.message);
            });
    };

    isLoading && <Loading />;

    return (
        <div id='post-page'>
            <h2 className='noShadowBox'>
                Create New Ad
            </h2>
            <fieldset id='ad-form' className='shadowBox'> 
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Title</p>
                        <input type='text' id='title' autoComplete='off' value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        <p>Price</p>
                        <input type='number' id='price' autoComplete='off' value={price} onChange={(e) => setPrice(e.target.value)} min='0' step='0.01' required />
                    </label>
                    <label>
                        <p>Location</p>
                        <input type='text' id='location' autoComplete='off' value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </label>
                    <label>
                        <p>Description</p>
                        <textarea id='desc' value={desc} onChange={(e) => setDesc(e.target.value)} required />
                    </label>
                    <label>
                        <p>Image</p>
                        <input type='file' name='image' accept='image/*' onChange={(e) => setFile(e.target.files[0])} required/>
                    </label><br></br>

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
            <br></br>
        </div>
    )
}

export default PostAd;