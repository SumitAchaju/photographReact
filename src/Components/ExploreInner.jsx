import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import Slider from "./swipper";

export default function ExploreInner() {
  let { id } = useParams();
  let { userId } = useContext(AuthContext);
  const api = useAxios();
  const [homeData, setHomeData] = useState(() => []);
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

  const likePost = (pid, action) => {
    api.post(`postlikeout/${pid}`,{
      "action":`${action}`
    }).then((res) => {
    if(res.data.status==="success"){
      api.get(`categoryposts/${id}`).then((res) => setHomeData(res.data));
    }
  }
    );
  };
  useEffect(() => {
    api.get(`categoryposts/${id}`).then((res) => setHomeData(res.data));
  }, []);

  return (
    <>
      {homeData && (
        <div id="home">
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
                    <Link to={`/singlepost/${data.id}/comment/`}>
                    <i
                      className="bi bi-chat"
                    ></i>
                    </Link>

                    <Link to={`/singlepost/${data.id}/comment/`}>
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
                    <Link to={`/singlepost/${data.id}/`}>
                    <p
                    >
                      {data.like_by.length} Likes
                    </p>
                    </Link>
                  </div>
                  <div className="content-discription">
                    <p>{data.caption}</p>
                  </div>
                  <div className="content-comment">
                    <Link to={`/singlepost/${data.id}/comment/`}>
                      <p>
                        View all {data.comment.length} comments
                      </p>
                    </Link>
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
