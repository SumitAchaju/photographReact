import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils/ApiUrl";

export default function ProfileFollow(props) {
  let { userId } = useContext(AuthContext);
  return (
    <>
      {props.follow.length ? (
        <div className="follow-following-follow">
          {props.follow.map((follow) => (
            <div key={follow.id} className="follow-following-follow-single">
              <div className="follow-following-follow-single-profile">
                <div>
                  <img src={baseUrl + follow.profile_image} alt="" />
                </div>
                <div>
                  <span>
                    <Link to={`/profile/${follow.id}`}>
                      {follow.first_name} {follow.last_name}
                    </Link>
                  </span>
                </div>
              </div>
              <div>
                {follow.id === userId ? (
                  <Link to={`/profile/${userId}`}>
                    <button className="me">Your Profile</button>
                  </Link>
                ) : follow.myfriend_status === true ? (
                  <button
                    className="following"
                    onClick={() => props.unFollow(follow.id)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button onClick={() => props.Follow(follow.id)}>
                    Follow
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="notfound">"No {props.followorfollowing} yet"</p>
      )}
    </>
  );
}
