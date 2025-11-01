import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost';
import PostForm from "./components/PostForm";
import { Link } from "react-router-dom";
import { PostProvider } from './context/PostContext.jsx';
import Login from "./components/Login.jsx";
import Nav from "./components/Nav.jsx";

function App() {
  return (
    <PostProvider>
      <Router>
        <Nav /> {/* Add navigation */}
        <div>
          <h1>MERN Blog Frontend</h1>
          <nav>
            {/* Optional links can go here */}
          </nav>

          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:slug" element={<SinglePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<PostForm />} />
            <Route path="/edit/:id" element={<PostForm />} /> {/* Handles editing */}
          </Routes>
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;
