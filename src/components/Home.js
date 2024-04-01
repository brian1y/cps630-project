function Home() {
    // TODO: Check if logged in

    // Default landing page for non logged in users
    return (
        <div id='landing'>
            Hello User!

            {/* Debugging stuff; to be removed */}
            <ul>
                <li>
                    <a href='/post-ad'>Post Ad</a>
                </li>
                <li>
                    <a href='/listing'>Post Listing</a>
                </li>
                <li>
                    <a href='/admin'>Admin Page</a>
                </li>
            </ul>
        </div>
    );
}

export default Home;