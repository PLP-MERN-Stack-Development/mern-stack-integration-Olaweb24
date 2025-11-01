import { useContext } from 'react';
import { PostContext } from '../context/PostContext.jsx';
import { Link } from 'react-router-dom';
import './PostList.css';


const PostList = () => {
  const { posts, loading, error } = useContext(PostContext);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;
  if (!posts.length) return <p>No posts found.</p>;

return (
    <div className="post-list-container">
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="post-item">
          <Link to={`/post/${post.slug}`}>
            <h3 className="post-title">{post.title}</h3>
          </Link>
          <p className="post-content">{post.content.substring(0, 150)}...</p>
          <Link to={`/edit/${post._id}`} className="edit-link">
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
