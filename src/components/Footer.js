import '../css/Navbar.css'

function Footer() {
    const date = new Date();

    return (
        <footer>
            &copy; {date.getFullYear()} SiteName
        </footer>
    )
}

export default Footer;