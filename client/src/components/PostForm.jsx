// PostForm.jsx
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext.jsx";
import { authService } from "../services/api";

const PostForm = () => {
  const { posts, categories, createPost, updatePost } = useContext(PostContext);
  const { id } = useParams(); // undefined if creating a new post
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    isPublished: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Populate form if editing
  useEffect(() => {
    if (id) {
      const postToEdit = posts.find((p) => p._id === id);
      if (postToEdit) {
        setFormData({
          title: postToEdit.title,
          content: postToEdit.content,
          category: postToEdit.category,
          isPublished: postToEdit.isPublished,
        });
      }
    }
  }, [id, posts]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ✅ Get the current logged-in user safely
      const user = authService.getCurrentUser();
      if (!user) {
        setError("You must be logged in to create or edit a post");
        setLoading(false);
        return;
      }

      // ✅ Include author ID in post data
      const postDataWithAuthor = {
        ...formData,
        author: user._id,
      };

      if (id) {
        await updatePost(id, postDataWithAuthor);
      } else {
        console.log("Submitting post data:", postDataWithAuthor);

        await createPost(postDataWithAuthor);
      }

      navigate("/"); // go back to post list
    } catch (err) {
      setError("Failed to create/update post");
      console.error("Error creating/updating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Post" : "Create New Post"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            Published
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
