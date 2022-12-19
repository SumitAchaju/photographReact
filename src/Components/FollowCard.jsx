import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function FollowCard(props) {
  const baseUrlImg = "https://sumitachaju.pythonanywhere.com";
  let { userId } = useContext(AuthContext);
  return (
    <>
      {props.followSuggestion.user && (
        <div id="follow">
          <div className="container-mine grid">
            {props.followSuggestion.user.map((sugg) => (
              <div key={sugg.id} className="content">
                <Link to={`/profile/${sugg.id}`}>
                  <div className="follow-img">
                    <img
                      src={baseUrlImg + sugg.profile_image}
                      alt="followimg"
                    />
                  </div>
                  <div className="follow-content">
                    <h3>
                      {sugg.first_name} {sugg.last_name}
                    </h3>
                    <p>followed by {sugg.mutual_friend}</p>
                    <h4>
                      {sugg.followers} Followers | {sugg.following} Following
                    </h4>
                  </div>
                </Link>
                {sugg.id === userId ? (
                  <div className="follow-message">
                    <Link className="myprofile" to={`/profile/${userId}`}>
                      Your Profile
                    </Link>
                  </div>
                ) : (
                  <div className="follow-message">
                    {sugg.myfriend ? (
                      <Link
                        className="followed"
                        to=""
                        onClick={() => props.unFollow(sugg.id)}
                      >
                        UnFollow
                      </Link>
                    ) : (
                      <Link to="" onClick={() => props.Follow(sugg.id)}>
                        Follow
                      </Link>
                    )}
                    <Link className="follow-message-change-color" to="">
                      Message
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
