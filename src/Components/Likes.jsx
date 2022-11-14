import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Likes() {
  let { data } = useOutletContext();
  const baseUrlImg = "http://127.0.0.1:8000";
  return (
    <>
      <div className="likes-comment-con">
        {data &&
        data.like_by.map(like=>
          <div key={like.id} className="likeby">
          <img src={baseUrlImg+like.profile_image} alt="" />
          <h4>{like.first_name} {like.last_name}</h4>
          </div>
        )
        }
      </div>
    </>
  );
}
