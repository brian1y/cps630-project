import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PostAd from './components/PostAd';
import PostListing from './components/PostListing';
import AdminPage from './components/AdminPage';
import SendMessage from './components/SendMessage';
import Inbox from './components/Inbox';
import './css/Home.css';
import Login from "./components/Login";
import Registration from "./components/Registration";
import { useAuthContext } from "./hooks/useAuthContext";

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
  const { user } = useAuthContext()

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/' />} />
          <Route path='/post-ad' element={<PostAd />} />
          <Route path='/listing' element={<PostListing />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/send-message' element={<SendMessage />} />
          <Route path='/inbox' element={<Inbox />} />
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route path='/registration' element={user ? <Navigate to='/' /> : <Registration />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
