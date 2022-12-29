import React, { useEffect, useCallback } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../Components/Content";
import useInfiniteScroll from "../../Components/InfiniteScroll";
import ProfileInfo from "../../Components/ProfileInfo";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";
import useLikePost from "../../Components/LikePost";

export default function Profile() {
  let { uid } = useParams();
  let { userId, authToken } = useContext(AuthContext);
  const api = useAxios();
  const baseUrlImg = "https://sumitachaju.pythonanywhere.com";
  const [follow, setFollow] = useState(() => {});
  const [level, setLevel] = useState(() => 10);
  const { loading, posts, hasMore, setPosts, totalPost } = useInfiniteScroll(
    `userpost/${uid}`,
    level
  );
  const observer = React.createRef();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLevel((prevLevel) => prevLevel + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const likePost = useLikePost(setPosts, `userpost/${uid}`, level);

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
    api.get(`userfollowfollowing/${uid}`).then((res) => setFollow(res.data));
  }, [uid, authToken]);
  if (window.screen.width > 1024) {
    return (
      <>
        {posts && follow ? (
          <div id="home">
            <ProfileInfo
              userfriend={follow}
              baseUrlImg={baseUrlImg}
              post={totalPost}
              myprofile={uid.toString() === userId.toString() ? true : false}
              userId={userId}
              unFollow={unFollow}
              Follow={Follow}
            />
            {posts.length ? (
              <div>
                <div className="container-mine flex">
                  <div className="content-column1">
                    {posts.map((data, index) => {
                      if (index % 2 === 0) {
                        if (index + 1 === posts.length) {
                          return (
                            <Content
                              ref={lastPostRef}
                              key={data.id}
                              data={data}
                              likePost={likePost}
                            />
                          );
                        } else {
                          return (
                            <Content
                              key={data.id}
                              data={data}
                              likePost={likePost}
                            />
                          );
                        }
                      } else {
                        return null;
                      }
                    })}
                  </div>
                  <div className="content-column2">
                    {posts.map((data, index) => {
                      if (index % 2 !== 0) {
                        if (index + 1 === posts.length) {
                          return (
                            <Content
                              ref={lastPostRef}
                              key={data.id}
                              data={data}
                              likePost={likePost}
                            />
                          );
                        } else {
                          return (
                            <Content
                              key={data.id}
                              data={data}
                              likePost={likePost}
                            />
                          );
                        }
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </div>
                {loading && (
                  <div className="container-mine flex">
                    <div className="lds-ring1">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
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
        ) : (
          <div className="container-mine flex">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {posts && follow ? (
          <div id="home">
            <ProfileInfo
              userfriend={follow}
              baseUrlImg={baseUrlImg}
              post={posts.length}
              myprofile={uid.toString() === userId.toString() ? true : false}
              userId={userId}
              unFollow={unFollow}
              Follow={Follow}
            />
            {posts.length ? (
              <div>
                <div className="container-mine flex">
                  {posts.map((data, index) => {
                    if (index + 1 === posts.length) {
                      return (
                        <Content
                          ref={lastPostRef}
                          key={data.id}
                          data={data}
                          likePost={likePost}
                        />
                      );
                    } else {
                      return (
                        <Content
                          key={data.id}
                          data={data}
                          likePost={likePost}
                        />
                      );
                    }
                  })}
                </div>
                {loading && (
                  <div className="lds-ring1">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
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
        ) : (
          <div className="container-mine flex">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </>
    );
  }
}
