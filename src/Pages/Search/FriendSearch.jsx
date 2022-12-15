import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {  useParams } from "react-router-dom";
import FollowCard from "../../Components/FollowCard";
import useAxios from "../../utils/useAxios";

export default function FriendSearch() {
  const [followSuggestion, setFollowSuggestion] = useState({ user: [] });
  const api = useAxios();
  let { searchName } = useParams();
  useEffect(() => {
    api
      .post("followsuggestion/", { searchname: `${searchName}` })
      .then((res) => setFollowSuggestion(res.data));
  }, [searchName]);

  const unFollow = (unFollowId) => {
    api.get(`removefriend/${unFollowId}`).then((res) => {
      if (res.data.status === "success") {
        api
          .post("followsuggestion/", { searchname: `${searchName}` })
          .then((res) => setFollowSuggestion(res.data));
      }
    });
  };
  const Follow = (FollowId) => {
    api.get(`addfriend/${FollowId}`).then((res) => {
      if (res.data.status === "success") {
        api
          .post("followsuggestion/", { searchname: `${searchName}` })
          .then((res) => setFollowSuggestion(res.data));
      }
    });
  };
  return (
    <>
      {followSuggestion.user && (
        <div className="container-mine flex">
          {followSuggestion.user.length ? (
            <span className="searchresultname">
              Search result for "{searchName}"
            </span>
          ) : (
            <span className="searchresultname">
              No result found for "{searchName}"
            </span>
          )}
        </div>
      )}
      <FollowCard
        followSuggestion={followSuggestion}
        unFollow={unFollow}
        Follow={Follow}
      />
    </>
  );
}
