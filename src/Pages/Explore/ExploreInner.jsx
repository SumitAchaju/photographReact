import React from "react";
import useInfiniteScroll from "../../Components/InfiniteScroll";
import { useState, useCallback } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Content from "../../Components/Content";
import useLikePost from "../../Components/LikePost";

export default function ExploreInner() {
  let { id } = useParams();
  const [level, setLevel] = useState(() => 10);
  const { loading, posts, hasMore, setPosts } = useInfiniteScroll(
    `categoryposts/${id}`,
    level
  );
 const data = useLoaderData();
 console.log(data)
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

  const likePost = useLikePost(setPosts, `categoryposts/${id}`, level);

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
            {loading && (
              <div className="container-mine flex">
                <div class="lds-ring1">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div id="home">
            <div className="container-mine flex">
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
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
            {loading && (
              <div className="container-mine flex">
                <div class="lds-ring1">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div id="home">
            <div className="container-mine flex">
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
