import React, { useContext } from "react";
import FollowCard from "../../Components/FollowCard";
import DataContext from "../../context/DataContext";
import useAxios from "../../utils/useAxios";

export default function Follow() {
  const api = useAxios();
  const {followSuggestion,setFollowSuggestion} = useContext(DataContext)
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
