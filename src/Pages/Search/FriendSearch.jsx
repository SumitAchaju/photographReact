import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FollowCard from "../../Components/FollowCard";
import useAxios from "../../utils/useAxios";

export default function FriendSearch() {
  const [followSuggestion, setFollowSuggestion] = useState({
    user: [],
  });
  const [loading, setLoading] = useState(false);
  const api = useAxios();
  let { searchName } = useParams();
  useEffect(() => {
    setLoading(true);
    api
      .post("followsuggestion/", { searchname: `${searchName}` })
      .then((res) => {
        setFollowSuggestion(res.data);
        setLoading(false);
      });
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
      <div className="container-mine flex">
        {!followSuggestion.user.length && !loading && (
          <span className="searchresultname">
            No result found for "{searchName}"
          </span>
        )}
        {!loading && followSuggestion.user.length !== 0 && (
          <span className="searchresultname">
            Search result for "{searchName}"
          </span>
        )}
        {loading && (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
      {!loading &&
      <FollowCard
        followSuggestion={followSuggestion}
        unFollow={unFollow}
        Follow={Follow}
      />
      }
    </>
  );
}
