import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getAllUsers, deletePost } from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import defaultUser from '../../../assets/user.png'
import { BsPencil, BsTrash } from "react-icons/bs";
import "./index.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  //function to get currentUser 
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);
  
  

  return (
    <>
      <div className="posts-card" key={id}>
        <div className="post-image-wrapper">
          
          {/* edit only if the post is of the same user */}
          {currentUser.id === posts.userID ? (
            <div className="action-container">
              <BsPencil 
                size={20} 
                className="action-icon" 
                onClick={() => getEditData(posts)} 
              />

              <BsTrash 
                size={20} 
                className="action-icon"
                onClick={() => deletePost(posts.id)}
              />
            </div>
          ) : (
            <></>
          )}

          <img
            className="profile-image"
            src={(allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]) || defaultUser}
            alt="profile-image"
          />
          <div>
            <div>

              <p
                className="name"
                onClick={() =>
                  // redirecting to profile with our current id and email
                  navigate("/profile", {
                    state: { id: posts?.id, email: posts.userEmail },
                  })
                }
              >
                {allUsers.filter((user)=> user.id === posts.userID)[0]?.name}
              </p>
            </div>
            <p className="headline">
              {allUsers.filter((user)=> user.id === posts.userID)[0]?.headline}  {/* headline for the user*/}
              </p>
            <p className="timestamp">{posts.timeStamp}</p>
          </div>

        </div>
        <p className="status">{posts.status}</p>

        <LikeButton
          userId={currentUser?.id}
          postId={posts.id}
          currentUser={currentUser} />
      </div>
    </>
  )
};