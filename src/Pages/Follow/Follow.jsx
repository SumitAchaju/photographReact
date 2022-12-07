import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import FollowCard from "../../Components/FollowCard";
import useAxios from "../../utils/useAxios";

export default function Follow() {
  const [followSuggestion, setFollowSuggestion] = useState({});
  const api = useAxios();
  useEffect(() => {
    api.get("followsuggestion/").then((res) => setFollowSuggestion(res.data));
  }, []);

  const unFollow = (unFollowId) => {
    api.get(`removefriend/${unFollowId}`).then((res) => {
      if (res.data.status === "success") {
        api
          .get("followsuggestion/")
          .then((res) => setFollowSuggestion(res.data));
      }
    });
  };
  const Follow = (FollowId) => {
    api.get(`addfriend/${FollowId}`).then((res) => {
      if (res.data.status === "success") {
        api
          .get("followsuggestion/")
          .then((res) => setFollowSuggestion(res.data));
      }
    });
  };
  return (
    <>
      <FollowCard
        followSuggestion={followSuggestion}
        unFollow={unFollow}
        Follow={Follow}
      />
    </>
  );
}
