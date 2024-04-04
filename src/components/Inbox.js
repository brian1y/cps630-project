import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { useAuthContext } from '../hooks/useAuthContext';

function Inbox() {
    const { user } = useAuthContext();
    const [messages, setMessages] = useState('')
    const [first, setFirst] = useState(true);

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

    //Used to display messages on first load
    const messagesOnload = () => {
        const filter = { user: user };
        setFirst(null);

        fetch('http://localhost:3001/api/get-messages', {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(filter)
        })
            .then(res => res.json())
            .then(messages => setMessages(messages))
    }

    //Query DB for messages on first load
    if (first) {
        return messagesOnload();
    }

    //Loading (?)
    if (!messages) {
        return (
            <>
                <section id='no-results'>
                    <p>Loading...</p>
                </section>
            </>
        )
    }

    //No messages
    if (messages.length === 0) {
        return (
            <>
                <section id='no-results'>
                    <p>No messages found.</p>
                </section>
            </>
        )
    }

    //Messages found
    return (
        <>
            <section id='message-container'>
                {messages.map((message) => (
                    <div style={{ border: 'double' }}>
                        <h4>To: {message.title}</h4>
                        <h4>From: {message.url}</h4>
                        <hr></hr>
                        <p>{message.desc}</p>
                    </div>
                ))}
            </section>
        </>
    )
}

export default Inbox;
