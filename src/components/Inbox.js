import React, { useState } from 'react';

function Inbox() {
    const user = JSON.parse(localStorage.getItem('user')).username
    const [messages, setMessages] = useState('')
    const [first, setFirst] = useState(true);

    //Used to display messages on first load
    const messagesOnload = () => {
        const user = JSON.parse(localStorage.getItem('user')).username
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
                {/* Map DB contents */}
                {messages.map((message) => (
                    <article>
                        <h3>From: {post.title}</h3>
                        <p>{post.desc}</p>
                    </article>        
                ))}
            </section>
        </>
    )
}

export default Inbox;
