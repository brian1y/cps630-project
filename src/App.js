import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PostAd from './components/PostAd';
import PostListing from './components/PostListing';
import AdminPage from './components/AdminPage';
import './css/Home.css';

// To run: 'npm install' on README.md directory
//         'npm start'
// 
// Backend: 'node src\server.js'
//
// DB name: 'projectDB' & collection name: 'posts'


// TODO: CSS & responsive designs
// TODO: Handle state passing between components
// i.e, logins & user states
// TODO: Admin dashboard
// TODO: Messaging system

function App() {
	return (
		<>
			<Navbar />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/post-ad' element={<PostAd />} />
					<Route path='/listing' element={<PostListing />} />
					<Route path='/admin' element={<AdminPage />} />
				</Routes>
			</BrowserRouter>
			<Footer />
		</>
	);
}

export default App;
