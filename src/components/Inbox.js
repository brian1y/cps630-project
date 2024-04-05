import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import '../css/Inbox.css';

function Inbox() {
    const { user } = useAuthContext();
    const [messages, setMessages] = useState('')
    const [first, setFirst] = useState(true);

    //Used to display messages on first load
    const messagesOnload = () => {
        const filter = { user: user };

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

    function convertTimestamp(epoch) {
        const time = new Date(epoch);
        return time.toLocaleString("en-US");
    }

    const redirect = new useNavigate();

    //Query DB for messages on first load
    useEffect(() => {
        if (!user) {
            if (!first) {
                redirect('/login', { replace: true });
            }
            else {
                setFirst(false);
            }
        }
        else {
            if (!first) {
                return messagesOnload();
            }
            else {
                setFirst(false);
            }
        }
    }, [user, first])

    //Loading (?)
    if (!messages) {
        return (
            <>
                <h2>Inbox</h2>
                <section id='no-results'>
                    <p>Loading...</p>
                </section>
            </>
        )
    }
    else {
        //No messages
        if (messages.length === 0) {
            return (
                <>
                    <h2>Inbox</h2>
                    <section id='no-results'>
                        <p>No messages found.</p>
                    </section>
                </>
            )
        }



        else {
            //Messages found
            return (
                <>
                    <h2>Inbox</h2>
                    <section id='message-container' className='backgroundGray'>
                        {messages.map((message) => (
                            <div className='message shadowBox'>
                                <h4>From: {message.from}</h4>
                                <p className='time'>{convertTimestamp(message.timestamp)}</p>
                                <hr></hr>
                                <p className='message'>{message.message}</p>
                            </div>
                        ))}
                    </section>
                </>
            )
        }
    }
}

export default Inbox;
