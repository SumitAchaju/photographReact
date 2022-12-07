import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../Components/Content";
import useAxios from "../../utils/useAxios";

export default function ExploreInner() {
  let { id } = useParams();
  const api = useAxios();
  const [homeData, setHomeData] = useState(() => []);

  const likePost = (pid, action) => {
    api
      .post(`postlikeout/${pid}`, {
        action: `${action}`,
      })
      .then((res) => {
        if (res.data.status === "success") {
          api.get(`categoryposts/${id}`).then((res) => setHomeData(res.data));
        }
      });
  };
  useEffect(() => {
    api.get(`categoryposts/${id}`).then((res) => setHomeData(res.data));
  }, []);

  return (
    <>
      {homeData && (
        <div id="home">
          <div className="container-mine flex">
            {homeData.map((data) => (
              <Content key={data.id} data={data} likePost={likePost} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
