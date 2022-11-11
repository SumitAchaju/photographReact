import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../utils/useAxios";
import Slider from "./swipper";

export default function Home() {
  const api = useAxios();
  const [homeData,setHomeData] = useState(()=>[]);
  const baseUrlImg = "http://127.0.0.1:8000";
  
  useEffect(()=>{
    api.get("/friendposts/").then(res=>setHomeData(res.data))
  },[])

  return (
    <>
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
                    {<Slider images={data.postimage}/>}
                </div>
                <div className="likes">
                  <Link to="">
                    <i className="bi bi-heart"></i>
                  </Link>
                  <Link to="">
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
                  <p>1770 Likes</p>
                </div>
                <div className="content-discription">
                  <p>{data.caption}</p>
                </div>
                <div className="content-comment">
                  <Link to="">View all comments...</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
