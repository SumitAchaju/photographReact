import React from "react";
import "./Gui/scss/style.scss";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRouter";
import { AuthProvider } from "./context/AuthContext";
import Main from "./Components/Main";
import Login from "./Pages/Authentication/login";
import Register from "./Pages/Authentication/Register";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore/Explore";
import ExploreInner from "./Pages/Explore/ExploreInner";
import Follow from "./Pages/Follow/Follow";
import PostSingle from "./Pages/SinglePost/PostSingle";
import Likes from "./Pages/SinglePost/Likes";
import Comment from "./Pages/SinglePost/Comment";
import Profile from "./Pages/Profile/Profile";
import ProfileFollowings from "./Pages/Profile/ProfileFollowings";
import ProfileFollows from "./Pages/Profile/ProfileFollows";
import FriendSearch from "./Pages/Search/FriendSearch";
import ProfileEdits from "./Pages/Profile/ProfileEdits";
import Chat from "./Pages/Chats/Chat";
import Post from "./Pages/Posts/Post";
import SavedPost from "./Pages/Saved/SavedPost";
import More from "./Pages/More/More";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<Main />} exact={true}>
              <Route index element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="follow" element={<Follow />} />
              <Route path="explore/:id" element={<ExploreInner />} />
              <Route path="chats" element={<Chat />} />
              <Route path="posts" element={<Post />} />
              <Route path="profile/:uid" element={<Profile />}>
                <Route index element={<ProfileFollows />} />
                <Route path="following" element={<ProfileFollowings />} />
              </Route>
              <Route path="profile/edits" element={<ProfileEdits />} />
              <Route path="singlepost/:pid" element={<PostSingle />}>
                <Route index element={<Likes />} />
                <Route path="comment" element={<Comment />} />
              </Route>
              <Route path="friendsearch/:searchName" element={<FriendSearch />} />
              <Route path="savedpost" element={<SavedPost />} />
              <Route path="more" element={<More />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
