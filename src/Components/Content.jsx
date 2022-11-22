import React, { useContext } from "react";
import Slider from "./swipper";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Content(props) {
  let { userId } = useContext(AuthContext);
  const baseUrlImg = "http://127.0.0.1:8000";
  return (
    <>
      <div className="content">
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
            {props.data.like_by.find((like) => like.id === userId) ? (
              <i
                style={{ color: "red" }}
                onClick={() => props.likePost(props.data.id, "unlike")}
                className="bi bi-heart-fill"
              ></i>
            ) : (
              <i
                onClick={() => props.likePost(props.data.id, "like")}
                className="bi bi-heart"
              ></i>
            )}
            <Link to={`/singlepost/${props.data.id}/comment/`}>
              <i className="bi bi-chat"></i>
            </Link>
            <Link to="">
              <i className="bi bi-send"></i>
            </Link>
          </div>
          <div className="save">
            {props.data.saved_by.find((save) => save.id === userId) ? (
              <i
                onClick={() => props.likePost(props.data.id, "unsave")}
                className="bi bi-bookmark-fill"
              ></i>
            ) : (
              <i
                onClick={() => props.likePost(props.data.id, "save")}
                className="bi bi-bookmark"
              ></i>
            )}
          </div>
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
