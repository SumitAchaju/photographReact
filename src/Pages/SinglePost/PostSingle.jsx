import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import Content from "../../Components/Content";

export default function ExploreInner() {
  let { pid } = useParams();
  const api = useAxios();
  const [singlePost, setSinglePost] = useState(() => {});

  const likePost = (id, action) => {
    api
      .post(`postlikeout/${id}`, {
        action: `${action}`,
      })
      .then((res) => {
        if (res.data.status === "success") {
          api.get(`singlepost/${pid}`).then((res) => setSinglePost(res.data));
        }
      });
  };

  useEffect(() => {
    api.get(`singlepost/${pid}`).then((res) => setSinglePost(res.data));
  }, [pid]);

  return (
    <>
      {singlePost && (
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
      )}
    </>
  );
}
