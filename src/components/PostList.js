import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import PostCard from "./PostCard";
import CommentDialog from "./CommentDialog";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleteQueue, setDeleteQueue] = useState([]);

  // Fetch posts from API on first load
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  // Filter posts based on search query
  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  // Handle post click to show comments
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  // Handle delete post
  const handleDeletePost = (post) => {
    // Queue up delete request
    setDeleteQueue([...deleteQueue, post.id]);

    // Optimistically remove post from UI
    const updatedPosts = posts.filter((p) => p.id !== post.id);
    setPosts(updatedPosts);

    // Remove post from filtered posts
    const updatedFilteredPosts = filteredPosts.filter((p) => p.id !== post.id);
    setFilteredPosts(updatedFilteredPosts);
  };

  // Handle refresh state button click
  const handleRefreshState = () => {
    // Clear local state and refetch data
    setPosts([]);
    setFilteredPosts([]);
    setDeleteQueue([]);

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  };

  return (
    <div style={{ marginTop: "20px", marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleRefreshState}
          style={{ marginLeft: "20px" }}
        >
          Refresh
        </Button>
      </div>
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={handlePostClick}
          onDelete={handleDeletePost}
        />
      ))}
      {selectedPost && (
        <CommentDialog
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default PostList;
