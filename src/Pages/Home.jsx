import React, { useCallback, useState } from "react";
import Content from "../Components/Content";
import useInfiniteScroll from "../Components/InfiniteScroll";
import useAxios from "../utils/useAxios";

export default function Home() {
  const api = useAxios();
  const [level, setLevel] = useState(() => 10);
  const { loading, posts, hasMore, setPosts } = useInfiniteScroll(
    "/friendposts/",
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
          console.log("work");
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  const likePost = (id, action) => {
    api
      .post(`postlikeout/${id}`, {
        action: `${action}`,
      })
      .then((res) => {
        if (res.data.status === "success") {
          api
            .get("/friendposts/", { params: { level: level } })
            .then((res) => setPosts(res.data.post));
        }
      });
  };
  if (window.screen.width > 1024) {
    return (
      <>
        {posts.length !== 0 && (
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
              <div className="container-mine flex">
                <p style={{ color: "white" }}>Loading...</p>
              </div>
            ) : (
              <div className="container-mine flex">
                <p style={{ color: "white" }}>
                  Follow More People to Watch More Posts
                </p>
              </div>
            )}
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {posts.length !== 0 && (
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
              <div className="container-mine flex">
                <p style={{ color: "white" }}>Loading...</p>
              </div>
            ) : (
              <div className="container-mine flex">
                <p style={{ color: "white" }}>
                  Follow More People to Watch More Posts
                </p>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}
