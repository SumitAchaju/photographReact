import React from "react";
import { useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";

export default function Comment() {
  let { data, setData } = useOutletContext();
  let { userId,Message } = useContext(AuthContext);
  const baseUrlImg = "https://sumitachaju.pythonanywhere.com";
  const api = useAxios();

  const addComment = (e) => {
    e.preventDefault();
    for (let comment of data.comment) {
      if (comment.comment_by.id === userId) {
        Message("comment already exist!!");
        return;
      }
    }
    api
      .post(`/addcomment/${data.id}`, {
        userid: `${userId}`,
        comment: `${e.target.comment.value}`,
      })
      .then((res) => {
        setData(res.data);
      });
    e.target.comment.value = "";
  };

  const deleteComment = (id) => {
    api.post(`/deletecomment/${id}`, { postid: `${data.id}` }).then((res) => {
      setData(res.data);
    });
  };
  return (
    <>
      {data && (
        <div className="likes-comment-con">
          <div className="comment-post">
            <form onSubmit={addComment}>
              <input name="comment" type="text" placeholder="Add comment..." />
              <button type="sumbit">
                <i className="bi bi-send-fill"></i>
              </button>
            </form>
          </div>
          <div className="comment-single">
            {data.comment.map((usercomment) => {
              if (usercomment.comment_by.id === userId) {
                return (
                  <div key={usercomment.comment_by.id}>
                    <div>
                      <img
                        src={baseUrlImg + usercomment.comment_by.profile_image}
                        alt=""
                      />
                    </div>
                    <div>
                      <Link to={`/profile/${usercomment.comment_by.id}`}>
                        <h4>
                          {usercomment.comment_by.first_name}
                          {usercomment.comment_by.last_name}
                        </h4>
                      </Link>
                      <p>{usercomment.comment}</p>
                      <button onClick={() => deleteComment(usercomment.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
            {data.comment.length ? (
              data.comment.map((comment) => {
                if (comment.comment_by.id === userId) {
                  return null;
                } else {
                  return (
                    <div key={comment.comment_by.id}>
                      <Link to={`/profile/${comment.comment_by.id}`}>
                        <div>
                          <img
                            src={baseUrlImg + comment.comment_by.profile_image}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div>
                        <Link to={`/profile/${comment.comment_by.id}`}>
                          <h4>
                            {comment.comment_by.first_name}
                            {comment.comment_by.last_name}
                          </h4>
                        </Link>
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <p className="notfound">"No Comments Yet"</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
