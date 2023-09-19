import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./Gui/scss/style.scss";
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
import Post from "./Pages/Posts/Post";
import SavedPost from "./Pages/Saved/SavedPost";
import More from "./Pages/More/More";
import NotFound from "./Pages/404NotFound";
import Loading from "./Pages/Loading";
import ChatPlaceHolder from "./Pages/ChatPlaceHolder";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Main />} exact={true}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="follow" element={<Follow />} />
          <Route path="explore/:id" element={<ExploreInner />} />
          {/* <Route path="chats" element={<Chat />}>
            <Route path=":id" element={<ChatBox />} />
          </Route> */}
          <Route path="chats" element ={<ChatPlaceHolder/>} />
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
          <Route path="loading" element={<Loading />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
