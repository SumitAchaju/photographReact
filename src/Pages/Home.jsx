import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Content from "../Components/Content";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

export default function Home() {
  let { userId } = useContext(AuthContext);
  const api = useAxios();
  const [homeData, setHomeData] = useState(() => []);

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
      api.get("/friendposts/").then((res) => setHomeData(res.data));
    }
  }
    );
  };


  useEffect(() => {
    api.get("/friendposts/").then((res) => setHomeData(res.data));
  }, []);

  return (
    <>
      {homeData && (
        <div id="home">
          <div className="container-mine flex">
            {homeData.map((data) => (
            <Content data={data} likeStatus={likeStatus} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
