import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

const CommentDialog = ({ post, onClose }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error(error));
  }, [post.id]);

  return (
    <Dialog open={!!post} onClose={onClose}>
      <DialogTitle>{post.title}</DialogTitle>
      <DialogContent>
        {comments.map((comment) => (
          <Typography key={comment.id}>{comment.body}</Typography>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
