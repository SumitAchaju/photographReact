import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import Slider from "./swipper";

export default function Profile() {
  let { uid } = useParams();
  let { userId } = useContext(AuthContext);
  const api = useAxios();
  const [homeData, setHomeData] = useState(() => []);
  const [follow, setFollow] = useState(() => {});
  const baseUrlImg = "http://127.0.0.1:8000";
  const go = useNavigate();

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
  },[uid])

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

          <div className="container-mine flex">
            {homeData.map((data) => (
              <div key={data.id} className="content">
                <div className="content-profile">
                  <img
                    width="20px"
                    src={baseUrlImg + data.user.profile_image}
                    alt=""
                  />
                  <p>{data.user.first_name + " " + data.user.last_name}</p>
                  <i className="bi bi-three-dots-vertical"></i>
                </div>
                <div className="content-image">
                  <div className="image">
                    {<Slider images={data.postimage} />}
                  </div>
                  <div className="likes">
                    {likeStatus(data)}
                    <i
                      onClick={() => {
                        go(`/singlepost/${data.id}/comment/`);
                      }}
                      className="bi bi-chat"
                    ></i>

                    <Link to="">
                      <i className="bi bi-send"></i>
                    </Link>
                  </div>
                  <div className="save">
                    <Link to="">
                      <i className="fa-regular fa-bookmark"></i>
                    </Link>
                  </div>
                </div>
                <div className="content-info">
                  <div className="content-likes">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        go(`/singlepost/${data.id}`);
                      }}
                    >
                      {data.like_by.length} Likes
                    </p>
                  </div>
                  <div className="content-discription">
                    <p>{data.caption}</p>
                  </div>
                  <div className="content-comment">
                    <button
                      style={{
                        cursor: "pointer",
                        background: "none",
                        border: 0,
                        color: "white",
                      }}
                      onClick={() => {
                        go(`/singlepost/${data.id}/comment/`);
                      }}
                    >
                      View all {data.comment.length} comments
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
