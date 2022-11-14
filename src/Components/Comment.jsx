import React from "react";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

export default function Comment() {
  let { data, setData } = useOutletContext();
  let { userId } = useContext(AuthContext);
  const baseUrlImg = "http://127.0.0.1:8000";
  const api = useAxios();

  const addComment = (e) => {
    e.preventDefault();
    for (let comment of data.comment) {
      if (comment.comment_by.id === userId) {
        alert("comment already exist!!");
        return;
      }
    }
    api
      .post(`/addcomment/${data.id}`, {
        userid: `${userId}`,
        comment: `${e.target.comment.value}`,
      })
      .then((res) => {
        if (res.data.status === "success") {
          e.target.comment.value = "";
          api.get(`singlepost/${data.id}`).then((res) => setData(res.data));
        }
      });
  };

  return (
    <>
      <div className="likes-comment-con">
        <div className="comment-post">
          <form onSubmit={addComment}>
            <input name="comment" type="text" />
            <button type="sumbit">Post</button>
          </form>
        </div>
        <div className="comment-single">
          {data &&
            data.comment.map((comment) => (
              <div key={comment.comment_by.id}>
                <div>
                  <img
                    src={baseUrlImg + comment.comment_by.profile_image}
                    alt=""
                  />
                </div>
                <div>
                  <h4>
                    {comment.comment_by.first_name}{" "}
                    {comment.comment_by.last_name}
                  </h4>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
