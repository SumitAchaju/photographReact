import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useParams, NavLink, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import Slider from "./swipper";

export default function ExploreInner() {
  let { pid } = useParams();
  let { userId } = useContext(AuthContext);
  const api = useAxios();
  const [singlePost, setSinglePost] = useState(() => {});
  const baseUrlImg = "http://127.0.0.1:8000";

  const likeStatus = (postid) => {
    for (let like of singlePost.like_by) {
      if (like.id === userId) {
        return (
          <i
            style={{ color: "red" }}
            onClick={() => likePost(postid, "unlike")}
            className="bi bi-heart-fill"
          ></i>
        );
      }
    }
    return (
      <i onClick={() => likePost(postid, "like")} className="bi bi-heart"></i>
    );
  };

  const likePost = (id, action) => {
    if (action === "like") {
      api.get(`postlike/${id}`).then((res) => setSinglePost(res.data));
    } else if (action === "unlike") {
      api.post(`postlike/${id}`).then((res) => setSinglePost(res.data));
    } else {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    api.get(`singlepost/${pid}`).then((res) => setSinglePost(res.data));
  }, [pid]);
  console.log(singlePost);

  return (
    <>
      {singlePost && (
        <div id="home">
          <div className="container-mine flex flex-start">
            <div className="content">
              <div className="content-profile">
                <img
                  width="20px"
                  src={baseUrlImg + singlePost.user.profile_image}
                  alt=""
                />
                <p>
                  {singlePost.user.first_name + " " + singlePost.user.last_name}
                </p>
                <i className="bi bi-three-dots-vertical"></i>
              </div>
              <div className="content-image">
                <div className="image">
                  {<Slider images={singlePost.postimage} />}
                </div>
                <div className="likes">
                  {likeStatus(singlePost.id)}
                  <Link to={`comment/`}>
                    <i className="bi bi-chat"></i>
                  </Link>
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
                  <Link to={``}>
                    <p>1770 Likes</p>
                  </Link>
                </div>
                <div className="content-discription">
                  <p>{singlePost.caption}</p>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="likes-comment">
                <div className="likes-comment-top">
                  <div>
                    <NavLink activeclassname={"active"} to="">
                      Likes
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to={`comment/`}>Comments</NavLink>
                  </div>
                </div>
                <Outlet
                  context={{ data: singlePost, setData: setSinglePost }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
