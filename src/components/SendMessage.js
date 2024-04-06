import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { useAuthContext } from '../hooks/useAuthContext';
import '../css/SendMessage.css'


function SendMessage() {
    // States for message information
    const [to, setTo] = useState('')
    const [message, setMessage] = useState('')

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

    // Displays loading page, if loading
    isLoading && <Loading />;

    //Sends message
    const handleSubmit = (e) => {
        const from = JSON.parse(localStorage.getItem('user')).username
        const timestamp = Date.now();
        const newMessage = { to, message, from, timestamp };

        // Send newPost to server
        fetch('https://cps630-project-api.onrender.com/api/send-message', {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(newMessage)
        })

            // Server response
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to send message');
            })
            .then(data => {
                console.log(data);
                alert('Message sent!');
                setTo('');
                setMessage('');
            })
            .catch(error => {
                console.log('Error:', error);
                alert(error.message);
            });
    };

    return (
        <div id='post-page'>
            <h2 className='noShadowBox'>
                Send Message
            </h2>
            <fieldset id='ad-form' className='shadowBox'>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>To:</p>
                        <input type='text' id='to' autoComplete='off' value={to} onChange={(e) => setTo(e.target.value)} required />
                    </label>
                    <label>
                        <p>Message:</p>
                        <textarea id='message' value={message} onChange={(e) => setMessage(e.target.value)} required />
                    </label>
                    <input id='submit' type='submit' value='Send Message' />
                </form>
            </fieldset>
        </div>
    )
}

export default SendMessage;
