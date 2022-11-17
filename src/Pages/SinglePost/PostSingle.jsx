import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useParams, NavLink, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";
import Slider from "../../Components/swipper";

export default function ExploreInner() {
  let { pid } = useParams();
  let { userId } = useContext(AuthContext);
  const api = useAxios();
  const [singlePost, setSinglePost] = useState(() => {});
  const baseUrlImg = "http://127.0.0.1:8000";

  const likeStatus = (data,work) => {
    if(work==="like"){
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
    }
    else if(work==="save"){
      for (let save of data.saved_by) {
        if (save.id === userId) {
          return (
            <i
              onClick={() => likePost(data.id, "unsave")}
              className="bi bi-bookmark-fill"
            ></i>
          );
        }
      }
      return (
        <i onClick={() => likePost(data.id, "save")} className="bi bi-bookmark"></i>
      );
    }
  };

  const likePost = (id, action) => {
    api.post(`postlikeout/${id}`,{
      "action":`${action}`
    }).then((res) => {
    if(res.data.status==="success"){
      api.get(`singlepost/${pid}`).then((res) => setSinglePost(res.data));
    }
  }
    );
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
                  {likeStatus(singlePost,"like")}
                  <Link to={`comment/`}>
                    <i className="bi bi-chat"></i>
                  </Link>
                  <Link to="">
                    <i className="bi bi-send"></i>
                  </Link>
                </div>
                <div className="save">
                {likeStatus(singlePost,"save")}
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
