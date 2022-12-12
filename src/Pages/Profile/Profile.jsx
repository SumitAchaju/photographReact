import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../Components/Content";
import ProfileInfo from "../../Components/ProfileInfo";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";

export default function Profile() {
  let { uid } = useParams();
  let { userId } = useContext(AuthContext);
  const api = useAxios();
  const [homeData, setHomeData] = useState(() => []);
  const [follow, setFollow] = useState(() => {});
  const baseUrlImg = "http://127.0.0.1:8000";

  const likePost = (id, action) => {
    api
      .post(`postlikeout/${id}`, {
        action: `${action}`,
      })
      .then((res) => {
        if (res.data.status === "success") {
          api.get(`userpost/${uid}`).then((res) => setHomeData(res.data));
        }
      });
  };

  const unFollow = (unFollowId) => {
    api.get(`removefriend/${unFollowId}`).then((res) => {
      if (res.data.status === "success") {
        api
          .get(`userfollowfollowing/${uid}`)
          .then((res) => setFollow(res.data));
      }
    });
  };
  const Follow = (FollowId) => {
    api.get(`addfriend/${FollowId}`).then((res) => {
      if (res.data.status === "success") {
        api
          .get(`userfollowfollowing/${uid}`)
          .then((res) => setFollow(res.data));
      }
    });
  };
  useEffect(() => {
    api.get(`userpost/${uid}`).then((res) => setHomeData(res.data));
  }, [uid]);
  useEffect(() => {
    api.get(`userfollowfollowing/${uid}`).then((res) => setFollow(res.data));
  }, [uid]);
  if(window.screen.width>1024){
    return (
      <>
        {homeData && follow && (
          <div id="home">
            <ProfileInfo
              userfriend={follow}
              baseUrlImg={baseUrlImg}
              post={homeData.length}
              myprofile={uid.toString() === userId.toString() ? true : false}
              userId={userId}
              unFollow={unFollow}
              Follow={Follow}
            />
            {homeData.length ? (
              <div id="userprofilepost" className="container-mine flex">
                <div className="content-column1">
                {homeData.map((data,index) => {
                  if(index % 2 === 0 ){
                    return <Content key={data.id} data={data} likePost={likePost}/>
                  }
                  else{
                    return null
                  }
                }
                )}
                </div>
                <div className="content-column2">
                {homeData.map((data,index) =>{
                  if(index % 2 !== 0 ){
                    return <Content key={data.id} data={data} likePost={likePost}/>
                  }
                  else{
                    return null
                  }
                }
                )}
                </div>
              </div>
            ) : (
              <div id="userprofilepostnot" className="container-mine flex">
                <div className="content">
                  <span>"No Post Yet"</span>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
  else{
    return (
      <>
        {homeData && follow && (
          <div id="home">
            <ProfileInfo
              userfriend={follow}
              baseUrlImg={baseUrlImg}
              post={homeData.length}
              myprofile={uid.toString() === userId.toString() ? true : false}
              userId={userId}
              unFollow={unFollow}
              Follow={Follow}
            />
            {homeData.length ? (
              <div id="userprofilepost" className="container-mine flex">
                {homeData.map((data) => 
                <Content key={data.id} data={data} likePost={likePost}/>
                )}
              </div>
            ) : (
              <div id="userprofilepostnot" className="container-mine flex">
                <div className="content">
                  <span>"No Post Yet"</span>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}
