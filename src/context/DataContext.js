import React, { createContext, useState, useEffect, useContext } from "react";
import useInfiniteScroll from "../Components/InfiniteScroll";
import useAxios from "../utils/useAxios";
import AuthContext from "./AuthContext";

const DataContext = createContext();
export default DataContext;

export function DataProvider({ children }) {
  const api = useAxios();
  let { authToken } = useContext(AuthContext);
  const [levelHome, setLevelHome] = useState(() => 10);
  // const [mainSocket, setMainSocket] = useState(() => {
  //   if(!JSON.parse(localStorage.getItem("token"))?.access){
  //     return 
  //   }
  //   const url =
  //     socketBaseUrl +
  //     "/ws/chat/" +
  //     userId +
  //     "/?token=" +
  //     JSON.parse(localStorage.getItem("token"))?.access;
  //   return new WebSocket(url);
  // });
  // const [recievedMessage, setRecievedMessage] = useState([]);
  // const [latestMessage, setLatestMessage] = useState({});
  // const [seenMsg, setSeenMsg] = useState();
  // const [unSeenMsg, setUnSeenMsg] = useState(fetchUnSeenMsg);
  let { loading, posts, hasMore, setPosts } = useInfiniteScroll(
    "/friendposts/",
    levelHome
  );
  const homeValue = {
    level: levelHome,
    setLevel: setLevelHome,
    loading: loading,
    posts: posts,
    hasMore: hasMore,
    setPosts: setPosts,
  };
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

  // useEffect(() => {
  //   if(!mainSocket){
  //     return
  //   }
  //   mainSocket.onmessage = (e) => {
  //     const data = JSON.parse(e.data);
  //     if (data.msgId) {
  //       setSeenMsg(data);
  //       return;
  //     }
  //     setRecievedMessage((prev) => [...prev, data]);
  //     setLatestMessage(data);
  //     setUnSeenMsg((prev) => {
  //       let newmsg = true;
  //       let msg = prev.map((element) => {
  //         if (element.send_user.id === data.send_user.id) {
  //           newmsg = false;
  //           return data;
  //         }
  //         return element;
  //       });
  //       if (newmsg) {
  //         return [data, ...prev];
  //       } else {
  //         return [...msg];
  //       }
  //     });
  //     newMsgToast(data);
  //     const msgSound = new Audio(message_notification);
  //     msgSound.play();
  //   };
  // }, []);
  // useEffect(() => {
  //   if (!unSeenMsg) {
  //     return;
  //   }
  //   let msg = unSeenMsg.filter((item) => item.id !== seenMsg.msgId);
  //   setUnSeenMsg(msg);
  // }, [seenMsg]);

  // function fetchUnSeenMsg() {
  //   api.get("unseen_msg/").then((res) => setUnSeenMsg(res.data));
  // }
  const value = {
    homeValue: homeValue,
    category: category,
    followSuggestion: followSuggestion,
    setFollowSuggestion: setFollowSuggestion,
    categoryPost: categoryPost,
    // mainSocket: mainSocket,
    // setMainSocket: setMainSocket,
    // recievedMessage: recievedMessage,
    // setRecievedMessage: setRecievedMessage,
    // latestMessage: latestMessage,
    // setLatestMessage: setLatestMessage,
    // seenMsg: seenMsg,
    // unSeenMsg: unSeenMsg,
    // setUnSeenMsg: setUnSeenMsg,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
