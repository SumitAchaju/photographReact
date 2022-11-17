import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";

export default function Profile() {
  let { uid } = useParams();
  let { userId } = useContext(AuthContext);
  const api = useAxios();
  const [homeData, setHomeData] = useState(() => []);
  const [follow, setFollow] = useState(() => {});
  const baseUrlImg = "http://127.0.0.1:8000";

  const likeStatus = (data) => {
    for (let like of data.like_by) {
      if (like.id === userId) {
        return (
          <i
            style={{ color: "red" }}
            onClick={() => likePost(data.id, "unlike")}
            className="bi bi-heart-fill"
          ></i>
        );
      }
    }
    return (
      <i onClick={() => likePost(data.id, "like")} className="bi bi-heart"></i>
    );
  };

  const likePost = (id, action) => {
      api.post(`postlikeout/${id}`,{
        "action":`${action}`
      }).then((res) => {
      if(res.data.status==="success"){
        api.get(`userpost/${uid}`).then((res) => setHomeData(res.data));
      }
    }
      );
  };
  useEffect(() => {
    api.get(`userpost/${uid}`).then((res) => setHomeData(res.data));
  }, [uid]);
  useEffect(()=>{
    api.get(`userfollowfollowing/${uid}`).then(res=>setFollow(res.data))
  },[])

  return (
    <>
      {homeData && follow && (
        <div id="home">
          <div className="container-mine flex align-items-start">
            <div className="content">
              <div className="profile-card">
                <div className="profile-info-top">
                  <div className="profile-page-img">
                    <img src={baseUrlImg + follow.user.profile_image} alt="" />
                  </div>
                  <div className="profile-info-status">
                    <div className="profile-post">
                      <Link to="">
                        <p>{homeData.length}</p>
                        <p>POSTS</p>
                      </Link>
                    </div>
                    <div className="profile-follow">
                      <Link to="">
                        <p>{follow.follow.length}</p>
                        <p>FOLLOW</p>
                      </Link>
                    </div>
                    <div className="profile-follow">
                      <Link to="">
                        <p>{follow.following.length}</p>
                        <p>FOLLOWING</p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="profile-name">
                  <span>{follow.user.first_name} {follow.user.last_name}</span>
                  <button>Edit Profile</button>
                </div>
                <div className="profile-work">
                  <p>{follow.user.skill}</p>
                </div>
                <div className="profile-bio">
                  <p>
                    {follow.user.bio}
                  </p>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="follow-following">
                <div className="follow-following-box">
                  <div className="follow-following-box-nav">
                    <NavLink activeclassname={"active"} to="">Follow</NavLink>
                    <NavLink activeclassname={"active"} to="following/">Following</NavLink>
                  </div>
                  <Outlet context={{follow:follow.follow,following:follow.following,setFollow:setFollow}}/>
                </div>
              </div>
            </div>
          </div>

          <div className="container-mine flex justify-content-start">
            <div className="user-posts">
              <Link to="">
                Post
              </Link>
            </div>
            <div className="user-saved">
              <Link to="">
                Saved
              </Link>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
