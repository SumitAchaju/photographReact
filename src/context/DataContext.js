import React, { createContext, useState,useEffect, useContext } from "react";
import useInfiniteScroll from "../Components/InfiniteScroll";
import useAxios from "../utils/useAxios";
import AuthContext from "./AuthContext";

const DataContext = createContext();
export default DataContext;

export function DataProvider({children}){
    const api = useAxios();
    let {authToken} = useContext(AuthContext)
    const [levelHome, setLevelHome] = useState(() => 10);
    let { loading, posts, hasMore, setPosts } = useInfiniteScroll(
      "/friendposts/",
      levelHome
    );
    const homeValue ={
        level:levelHome,
        setLevel:setLevelHome,
        loading:loading,
        posts:posts,
        hasMore:hasMore,
        setPosts:setPosts,
    }
    const [category, setCategory] = useState([]);
  
    useEffect(() => {
      api.get("/postcategory/").then((res) => setCategory(res.data));
    }, [authToken]);
    const [followSuggestion, setFollowSuggestion] = useState({});
    useEffect(() => {
      api.get("/followsuggestion/").then((res) => setFollowSuggestion(res.data));
    }, [authToken]);
    const [categoryPost, setCategoryPost] = useState([]);
    useEffect(() => {
        api.get("/postcategory/").then((res) => setCategoryPost(res.data));
      }, [authToken]);

    const value = {
        homeValue:homeValue,
        category:category,
        followSuggestion:followSuggestion,
        setFollowSuggestion:setFollowSuggestion,
        categoryPost:categoryPost,
    }
    return(
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    )

}