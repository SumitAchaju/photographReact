import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams, NavLink, Outlet } from "react-router-dom";
import useAxios from "../utils/useAxios";
import Slider from "./swipper";

export default function ExploreInner() {
  let { pid } = useParams();
  const api = useAxios();
  const [singlePost, setSinglePost] = useState(() =>{});
  const baseUrlImg = "http://127.0.0.1:8000";

  useEffect(() => {
    api.get(`singlepost/${pid}`).then((res) => setSinglePost(res.data));
  }, [pid]);
  console.log(singlePost);

  return (
    <>
      {singlePost && 
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
                  <Link to="">
                    <i className="bi bi-heart"></i>
                  </Link>
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
                <Outlet context={{ data: singlePost,setData:setSinglePost }} />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
