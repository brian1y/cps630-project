function MapPosts({ canDelete = false, posts }) {

    const handleDeletion = (id, e) => {
        e.preventDefault();
        console.log(e);
        if (window.confirm("Do you really want to delete this post?")) {
            const remove_id = { _id: id }

            // Delete post
            fetch('http://localhost:3001/api/delete-post', {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(remove_id)
            })

                // Server response
                .then((resp) => {
                    console.log(resp);
                    if (resp.ok) {
                        alert('Post deleted.');
                        resp.json().then(data => console.log(data))
                        window.location.reload();
                    }
                    else {
                        resp.json().then(data => alert(data.error))
                    }
                })
        }
    }

    return (
        <>
            {
                posts?.map((post) => (
                    <article tabIndex={0} className={`${post.category} post shadowBox`} key={post._id}>

                        {/* Checks if admin, then displays deletion option */}
                        {canDelete &&
                            <div className='delete-post'>
                                <button type='button' onClick={(e) => handleDeletion(post._id, e)}>X</button>
                            </div>
                        }

                        <h3>
                            {post.title}
                        </h3>
                        <p>
                            ${post.price}<br></br>
                            Location: {post.location}<br></br>
                            <img src={require(`../images/${post.imageName}`)} alt='post-image' className='image' /><br></br>
                            {post.desc}
                        </p>
                    </article>
                ))
            }
        </>

    )
}

export default MapPosts;
