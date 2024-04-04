import React, { useState } from 'react';

function Inbox() {
    const user = JSON.parse(localStorage.getItem('user')).username
    const [to, setTo] = usestate('')
    const [message, setMessages] = useState('')

    fetch('http://localhost:3001/api/get-messages', {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(filter)
        })
        .then(res => res.json())
        .then(posts => setPosts(posts))
    }
}
