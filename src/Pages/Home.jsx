import React, { useEffect } from "react";
import { useState } from "react";
import Content from "../Components/Content";
import useAxios from "../utils/useAxios";

export default function Home() {
  const api = useAxios();
  const [homeData, setHomeData] = useState(() => []);
  
  const likePost = (id, action) => {
    api
      .post(`postlikeout/${id}`, {
        action: `${action}`,
      })
      .then((res) => {
        if (res.data.status === "success") {
          api.get("/friendposts/").then((res) => setHomeData(res.data));
        }
      });
  };

  useEffect(() => {
    api.get("/friendposts/").then((res) => setHomeData(res.data));
  }, []);
  if(window.screen.width>1024){
    return (
      <>
        {homeData.length!==0 && (
          <div id="home">
            <div className="container-mine flex">
              <div className="content-column1">
              {homeData.map((data,index) => {
                if(index % 2 === 0 ){
                  return <Content key={data.id} data={data} likePost={likePost}/>
                }
                else{
                  return null
                }
              }
              )}
              </div>
              <div className="content-column2">
              {homeData.map((data,index) =>{
                if(index % 2 !== 0 ){
                  return <Content key={data.id} data={data} likePost={likePost}/>
                }
                else{
                  return null
                }
              }
              )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  else{
    return (
      <>
        {homeData.length!==0 && (
          <div id="home">
            <div className="container-mine flex">
              {homeData.map(data=>
                <Content key={data.id} data={data} likePost={likePost}/>
                )}
            </div>
          </div>
        )}
      </>
    );
  }

}
