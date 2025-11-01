// PostContext.jsx - Global context for managing posts and categories

import React, { createContext, useState, useEffect } from "react";
import { postService, categoryService } from "../services/api";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch posts
  const fetchPosts = async () => {
  try {
    setLoading(true);
    // Explicitly pass page=1 and limit=10
    const data = await postService.getAllPosts(1, 10); 
    setPosts(data);
  } catch (err) {
    console.error("Error fetching posts:", err.response || err);
    setError("Failed to fetch posts");
  } finally {
    setLoading(false);
  }
};

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories");
    }
  };

  // ✅ Create a new post (optimistic UI)
  const createPost = async (postData) => {
    const tempId = Date.now().toString();
    const tempPost = { ...postData, _id: tempId };
    setPosts([tempPost, ...posts]); // show immediately
    try {
      const newPost = await postService.createPost(postData);
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === tempId ? newPost : p))
      );
    } catch (err) {
      console.error("Error creating post:", err);
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== tempId));
      setError("Failed to create post");
    }
  };

  // ✅ Update an existing post (optimistic UI)
  const updatePost = async (id, updatedData) => {
    const oldPost = posts.find((p) => p._id === id);
    setPosts(posts.map((post) => (post._id === id ? { ...post, ...updatedData } : post)));
    try {
      const updatedPost = await postService.updatePost(id, updatedData);
      setPosts(posts.map((post) => (post._id === id ? updatedPost : post)));
    } catch (err) {
      console.error("Error updating post:", err);
      setPosts(posts.map((post) => (post._id === id ? oldPost : post))); // rollback
      setError("Failed to update post");
    }
  };

  // ✅ Delete a post (optimistic UI)
  const deletePost = async (id) => {
    const oldPosts = [...posts];
    setPosts(posts.filter((post) => post._id !== id)); // remove immediately
    try {
      await postService.deletePost(id);
    } catch (err) {
      console.error("Error deleting post:", err);
      setPosts(oldPosts); // rollback
      setError("Failed to delete post");
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        categories,
        loading,
        error,
        fetchPosts,
        fetchCategories,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
