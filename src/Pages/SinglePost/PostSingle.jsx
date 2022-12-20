import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import Content from "../../Components/Content";
import AuthContext from "../../context/AuthContext";
import useSingleLikePost from "../../Components/SingleLikepost";

export default function PostSingle() {
  let { pid } = useParams();
  const api = useAxios();
  const [singlePost, setSinglePost] = useState(() => {});
  let { edited,authToken } = useContext(AuthContext);
  const go = useNavigate();
  const likePost = useSingleLikePost(setSinglePost,`singlepost/${pid}`)

  useEffect(() => {
    api
      .get(`singlepost/${pid}`)
      .then((res) => setSinglePost(res.data))
      .catch((error) => {
        go("/");
      });
  }, [pid, edited,authToken,go]);

  return (
    <>
      {singlePost ? (
        <div id="home">
          <div className="container-mine flex flex-start">
            <Content data={singlePost} likePost={likePost} />
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
      ):
      <div id="home">
      <div className="container-mine flex">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
      </div>}
    </>
  );
}
