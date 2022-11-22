import React from 'react';
import { Outlet,Link,NavLink } from 'react-router-dom';

export default function ProfileInfo(props) {
  return (
    <>
    <div className="container-mine flex align-items-start">
    <div className="content">
      <div className="profile-card">
        <div className="profile-info-top">
          <div className="profile-page-img">
            <img src={props.baseUrlImg + props.follow.user.profile_image} alt="" />
          </div>
          <div className="profile-info-status">
            <div className="profile-post">
              <Link to="">
                <p>{props.post}</p>
                <p>POSTS</p>
              </Link>
            </div>
            <div className="profile-follow">
              <Link to="">
                <p>{props.follow.follow.length}</p>
                <p>FOLLOW</p>
              </Link>
            </div>
            <div className="profile-follow">
              <Link to="">
                <p>{props.follow.following.length}</p>
                <p>FOLLOWING</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="profile-name">
          <span>{props.follow.user.first_name} {props.follow.user.last_name}</span>
          {props.myprofile?
          <button>Edit Profile</button>
          :<button className='notmyprofile'></button>
        }
          
        </div>
        <div className="profile-work">
          <p>{props.follow.user.skill}</p>
        </div>
        <div className="profile-bio">
          <p>
            {props.follow.user.bio}
          </p>
        </div>
        {!props.myprofile?
        <div className='other-profile-follow-message'>
          <Link to=''>
            {props.follow.follow.find(a=>
             a.friends.id===props.userId)?"Following":"Follow"}
          </Link>
          <Link to="">
            Message
          </Link>
        </div>
        :<div></div>
      }
      </div>
    </div>
    <div className="content">
      <div className="follow-following">
        <div className="follow-following-box">
          <div className="follow-following-box-nav">
            <NavLink activeclassname={"active"} to="">Follow</NavLink>
            <NavLink activeclassname={"active"} to="following/">Following</NavLink>
          </div>
          <Outlet context={{follow:props.follow.follow,following:props.follow.following}}/>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}
