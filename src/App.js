import React from "react";
import "./Gui/scss/style.scss";
import { Routes,Route } from "react-router-dom";
import  PrivateRoutes  from "./utils/PrivateRouter";
import { AuthProvider } from "./context/AuthContext";

import Main from "./Components/Main";
import Login from "./Pages/Authentication/login";
import Register from "./Pages/Authentication/Register"
import Home from './Pages/Home';
import Explore from './Pages/Explore/Explore';
import ExploreInner from "./Pages/Explore/ExploreInner";
import Follow from "./Pages/Follow/Follow";
import PostSingle from "./Pages/SinglePost/PostSingle";
import Likes from "./Pages/SinglePost/Likes";
import Comment from "./Pages/SinglePost/Comment";
import Profile from "./Pages/Profile/Profile";
import ProfileFollowings from "./Pages/Profile/ProfileFollowings";
import ProfileFollows from "./Pages/Profile/ProfileFollows";


function App() {

  return (
    <>
    <AuthProvider>
    <Routes>
      <Route path="/" element={<PrivateRoutes/>}>
        <Route path="/" element={<Main/>} exact={true}>
          <Route index element={<Home/>} />
          <Route path='/explore' element={<Explore/>} />
          <Route path='/follow' element={<Follow/>} />
          <Route path='/explore/:id' element={<ExploreInner/>} />
          <Route path="/profile/:uid" element={<Profile/>} >
            <Route index element={<ProfileFollows/>} />
            <Route path="/profile/:uid/following" element={<ProfileFollowings/>} />
          </Route>
          <Route path='/singlepost/:pid' element={<PostSingle/>} >
            <Route index element={<Likes/>} />
            <Route path="/singlepost/:pid/comment" element={<Comment/>} />
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
