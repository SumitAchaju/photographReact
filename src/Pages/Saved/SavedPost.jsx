import React from "react";
import useInfiniteScroll from "../../Components/InfiniteScroll";
import { useState, useCallback } from "react";
import Content from "../../Components/Content";
import useLikePost from "../../Components/LikePost";

export default function SavedPost() {
  const [level, setLevel] = useState(() => 10);
  const { loading, posts, hasMore, setPosts, totalPost } = useInfiniteScroll(
    "/savedpost/",
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

  const likePost = useLikePost(setPosts,"savedpost",level)

  if (window.screen.width > 1024) {
    return (
      <>
        {posts ? (
          <div id="home">
            <div className="container-mine flex">
              <span className="searchresultname">{totalPost} Saved Posts</span>
            </div>
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
        {posts ? (
          <div id="home">
            <div className="container-mine flex">
              <span className="searchresultname">{totalPost} Saved Posts</span>
            </div>
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
                    <Content key={data.id} data={data} likePost={likePost} />
                  );
                }
              })}
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
