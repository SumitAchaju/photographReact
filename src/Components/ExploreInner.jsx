import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../utils/useAxios";
import Slider from "./swipper";

export default function ExploreInner() {
  let {id} = useParams();
  const api = useAxios();
  const [homeData,setHomeData] = useState(()=>[]);
  const baseUrlImg = "http://127.0.0.1:8000";
  const go = useNavigate();

  
  useEffect(()=>{
    api.get(`categoryposts/${id}`).then(res=>setHomeData(res.data))
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
                  <Link to=''>
                    <i className="bi bi-heart"></i>
                  </Link>
                    <i onClick={()=>{go(`/singlepost/${data.id}/comment/`)}} className="bi bi-chat"></i>

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
                  <p style={{cursor: 'pointer'}} onClick={()=>{go(`/singlepost/${data.id}`)}}>1770 Likes</p>
                </div>
                <div className="content-discription">
                  <p>{data.caption}</p>
                </div>
                <div className="content-comment">
                  <button style={{cursor:"pointer",background:"none",border:0,color:'white'}} onClick={()=>{go(`/singlepost/${data.id}/comment/`)}} >View all comments...</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
