import React from "react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";

import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";

const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
        isMyProfile
        profile {
          bio
          user {
          name
          id
          posts {
            id
            title
            content
            createdAt
            published
          }
        }
        }
    }
}
`;
export default function Profile() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: { userId: id },
  });
  if (error) return <p>Error</p>
  if (loading) return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
  const { profile } = data;
  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{profile.profile.user.name}</h1>
          <p>
            {profile.profile.bio}
          </p>
        </div>
        <div>{profile.isMyProfile ? <AddPostModal /> : null}</div>
      </div>
      <div>
        {profile.profile.user.posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            date={post.createdAt}
            user={profile.profile.user.name}
            published={post.published}
            isMyProfile={profile.isMyProfile}
          />
        ))}
      </div>
    </div>
  );
}
