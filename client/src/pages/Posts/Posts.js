import React, { useEffect } from "react";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client"

const GET_POST = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;
export default function Posts() {
  const { data, error, loading } = useQuery(GET_POST);

  if (error) return <p>Error</p>
  if (loading) return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
  const { posts } = data;
  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id} title={post.title} content={post.content} date={post.createdAt}
          user={post.user.name}
        />
      ))}
    </div>
  );
}
