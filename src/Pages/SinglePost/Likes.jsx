import React from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function Likes() {
  let { data } = useOutletContext();
  const baseUrlImg = "http://127.0.0.1:8000";
  return (
    <>
      <div className="likes-comment-con">
        {data.like_by.length ? (
          data.like_by.map((like) => (
            <div key={like.id} className="likeby">
              <img src={baseUrlImg + like.profile_image} alt="" />
              <Link to={`/profile/${like.id}`}>
                <h4>
                  {like.first_name} {like.last_name}
                </h4>
              </Link>
            </div>
          ))
        ) : (
          <p className="notfound">"No Likes Yet"</p>
        )}
      </div>
    </>
  );
}
