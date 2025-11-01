// src/components/Nav.jsx
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/create">Create Post</Link>
    </nav>
  );
};

export default Nav; // ✅ This line is crucial
