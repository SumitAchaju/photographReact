import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

export default function ProfileInfo(props) {
  return (
    <>
      <div className="container-mine flex align-items-start">
        <div className="content">
          <div className="profile-card">
            <div className="profile-info-top">
              <div className="profile-page-img">
                <img
                  src={
                    props.baseUrlImg +
                    props.userfriend.userfriend.user.profile_image
                  }
                  alt=""
                />
              </div>
              <div className="profile-info-status">
                <div className="profile-post">
                  <Link to="#userprofilepost">
                    <p>{props.post}</p>
                    <p>POSTS</p>
                  </Link>
                </div>
                <div className="profile-follow">
                  <Link to="">
                    <p>
                      {props.userfriend.userfriend.followers.length +
                        props.userfriend.userfriend.mutual.length}
                    </p>
                    <p>FOLLOWERS</p>
                  </Link>
                </div>
                <div className="profile-follow">
                  <Link to={`following/`}>
                    <p>
                      {props.userfriend.userfriend.following.length +
                        props.userfriend.userfriend.mutual.length}
                    </p>
                    <p>FOLLOWING</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="profile-name">
              <span>
                {props.userfriend.userfriend.user.first_name}{" "}
                {props.userfriend.userfriend.user.last_name}
              </span>
              {props.myprofile ? (
                <Link to="/profile/edits">Edit Profile</Link>
              ) : (
                <button className="notmyprofile"></button>
              )}
            </div>
            <div className="profile-work">
              <p>{props.userfriend.userfriend.user.skill}</p>
            </div>
            <div className="profile-bio">
              <p>{props.userfriend.userfriend.user.bio}</p>
            </div>
            {!props.myprofile ? (
              <div className="other-profile-follow-message">
                {props.userfriend.userfriend.followers.find(
                  (a) => a.id === props.userId
                ) ||
                props.userfriend.userfriend.mutual.find(
                  (a) => a.id === props.userId
                ) ? (
                  <Link
                    to=""
                    onClick={() =>
                      props.unFollow(props.userfriend.userfriend.user.id)
                    }
                    className="followed"
                  >
                    Following
                  </Link>
                ) : (
                  <Link
                    to=""
                    onClick={() =>
                      props.Follow(props.userfriend.userfriend.user.id)
                    }
                  >
                    Follow
                  </Link>
                )}
                <Link to="">Message</Link>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="content">
          <div className="follow-following">
            <div className="follow-following-box">
              <div className="follow-following-box-nav">
                <NavLink activeclassname={"active"} to="">
                  Followers
                </NavLink>
                <NavLink activeclassname={"active"} to="following/">
                  Following
                </NavLink>
              </div>
              <Outlet
                context={{
                  follow: [
                    ...props.userfriend.userfriend.followers,
                    ...props.userfriend.userfriend.mutual,
                  ],
                  following: [
                    ...props.userfriend.userfriend.following,
                    ...props.userfriend.userfriend.mutual,
                  ],
                  unFollow: props.unFollow,
                  Follow: props.Follow,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
