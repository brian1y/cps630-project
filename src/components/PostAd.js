import React, { useState } from 'react';
import '../css/PostAd.css'

function PostAd() {
    // TODO: Add login check
    // TODO: Add price & location
    // TODO: Append user to post submission

    // States for user inputs
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState();

    // Handle post submission
    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('desc', desc);
        formData.append('category', category);
        formData.append('image', file);

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
                // Optionally, reset form fields
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