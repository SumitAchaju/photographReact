import React, { useEffect } from "react";
import { useState } from "react";
import Content from "../Components/Content";
import useAxios from "../utils/useAxios";

export default function Home() {
  const api = useAxios();
  const [homeData, setHomeData] = useState(() => []);

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
            <Content key={data.id} data={data} likePost={likePost}/>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
