import React, { useState } from 'react';

function SendMessage() {
    // States for message information
    const [to, setTo] = useState('')
    const [message, setMessage] = useState('')
  
    //Sends message
    const handleSubmit = (e) => {
        const from = JSON.parse(localStorage.getItem('user')).username
        const newMessage = {to, message, from};
        setTo('');
        setMessage('');

        // Send newPost to server
        fetch('http://localhost:3001/api/send-message', {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(newMessage)
        })

        // Server response
        .then((resp) => {
            console.log(resp);
            if (resp.ok) {
                alert('Message sent!');
                resp.json().then(data => console.log(data))
            }
            else {
                resp.json().then(data => alert(data.error))
            }
        })
    };
  
    return (
        <div id='post-page'>
            <h2>
                Send Message
            </h2>
            <hr/>
            <fieldset id='ad-form'>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>To:</p>
                        <input type='text' id='to' autoComplete='off' value={to} onChange={(e) => setTo(e.target.value)} required />
                    </label>
                    <label>
                        <p>Message:</p>
                        <textarea id='message' value={message} onChange={(e) => setMessage(e.target.value)} required />
                    </label>
                    <input id='submit' type='submit' value='Send Message'/>
                </form>
            </fieldset>
        </div>
    )   
}

export default SendMessage;
