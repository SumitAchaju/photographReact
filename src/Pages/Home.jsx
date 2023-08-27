import React, { useCallback } from "react";
import { useContext } from "react";
import Content from "../Components/Content";
import DataContext from "../context/DataContext";
import useLikePost from "../Components/LikePost";
import Loading from "../Components/Loading";

export default function Home() {
  const { homeValue } = useContext(DataContext);
  const { level, setLevel, loading, posts, hasMore, setPosts } = homeValue;
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

  const likePost = useLikePost(setPosts,"friendposts",level)

  if (window.screen.width > 1024) {
    return (
      <>
        {posts.length !== 0 ? (
          <div id="home">
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
            {loading === true ? (
              <Loading ring={1}/>
            ) : (
              <div className="container-mine flex">
                <p style={{ color: "white" }}>
                  Follow More People to Watch More Posts
                </p>
              </div>
            )}
          </div>
        ) : (
          <Loading/>
        )}
      </>
    );
  } else {
    return (
      <>
        {posts.length !== 0 ? (
          <div id="home">
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
            </div>
            {loading === true ? (
              <Loading ring={1}/>
            ) : (
              <div className="container-mine flex">
                <p style={{ color: "white" }}>
                  Follow More People to Watch More Posts
                </p>
              </div>
            )}
          </div>
        ) : (
          <Loading/>
        )}
      </>
    );
  }
}
