import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const PostCard = ({ post, onClick, onDelete }) => {
  return (
    <Card style={{marginTop:"10px"}}>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Button onClick={() => onClick(post)}>View Comments</Button>
        <Button onClick={() => onDelete(post)}>Delete</Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;
