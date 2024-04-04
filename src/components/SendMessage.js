import React, { useState } from 'react';

function SendMessage() {
    // States for message information
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
  
    //Sends message
    const handleSubmit = (e) => {
        const url = JSON.parse(localStorage.getItem('user')).username
        const newMessage = {title, desc, url};
        setTitle('');
        setDesc('');

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
                        <input type='text' id='title' autoComplete='off' value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        <p>Message:</p>
                        <textarea id='desc' value={desc} onChange={(e) => setDesc(e.target.value)} required />
                    </label>
                    <input id='submit' type='submit' value='Send Message'/>
                </form>
            </fieldset>
        </div>
    )   
}

export default SendMessage;
