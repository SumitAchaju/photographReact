import React from "react";
import Slider from "./swipper";
import { Link } from "react-router-dom";

export default function Content(props) {
    const baseUrlImg = "http://127.0.0.1:8000";
  return (
    <>
      <div key={props.data.id} className="content">
        <div className="content-profile">
          <div>
            <Link to={`/profile/${props.data.user.id}`}>
              <img
                width="20px"
                src={baseUrlImg + props.data.user.profile_image}
                alt=""
              />
              <p>
                {props.data.user.first_name + " " + props.data.user.last_name}
              </p>
            </Link>
          </div>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
        <div className="content-image">
          <div className="image">
            {<Slider images={props.data.postimage} />}
          </div>
          <div className="likes">
            {props.likeStatus(props.data, "like")}
            <Link to={`/singlepost/${props.data.id}/comment/`}>
              <i className="bi bi-chat"></i>
            </Link>
            <Link to="">
              <i className="bi bi-send"></i>
            </Link>
          </div>
          <div className="save">{props.likeStatus(props.data, "save")}</div>
        </div>
        <div className="content-info">
          <div className="content-likes">
            <Link to={`/singlepost/${props.data.id}`}>
              <p>{props.data.like_by.length} likes</p>
            </Link>
          </div>
          <div className="content-discription">
            <p>{props.data.caption}</p>
          </div>
          <div className="content-comment">
            <Link to={`/singlepost/${props.data.id}/comment/`}>
              View all {props.data.comment.length} comments
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
