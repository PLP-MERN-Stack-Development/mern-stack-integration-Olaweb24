import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postService } from "../services/api";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [loading, setLoading] = useState(true);

  // 🟢 Fetch post data when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postService.getPost(id);
        setPostData({
          title: response.title,
          content: response.content,
          tags: response.tags ? response.tags.join(", ") : "",
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // 🟢 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  // 🟢 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...postData,
        tags: postData.tags.split(",").map((tag) => tag.trim()),
      };
      await postService.updatePost(id, updatedData);
      alert("Post updated successfully!");
      navigate("/"); // Redirect to post list after saving
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
    }
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-5">Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Content:</label>
        <textarea
          name="content"
          value={postData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          rows="5"
        />

        <label className="block mb-2">Tags (comma-separated):</label>
        <input
          type="text"
          name="tags"
          value={postData.tags}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPost;
