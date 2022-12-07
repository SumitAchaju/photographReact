import React, { useContext, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import * as fun from "../Gui/js/function";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Main() {
  let { LogoutUser, setUserData, userId, userData } = useContext(AuthContext);
  const [searchName, setSearchName] = useState("");
  const api = useAxios();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      api.get(`/user/${userId}`).then((response) => {
        setUserData(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [setUserData, userId]);

  const Search = (e) => {
    e.preventDefault();
    const value = e.target.searchbox.value;
    if (value) {
      setSearchName(value);
      navigate("/friendsearch");
    }
  };
  return (
    <>
      <header>
        <div className="logo">
          <Link to="/">
            <h2>PHOTOGRAPH</h2>
          </Link>
        </div>
        <div className="search-box">
          <form onSubmit={Search}>
            <input
              type="text"
              name="searchbox"
              placeholder="Search..."
              required
            />
            <button>
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
        <div className="notification">
          <div className="message-notification">
            <i className="bi bi-messenger"></i>
          </div>
          <div className="all-notification">
            <i className="bi bi-bell-fill"></i>
          </div>
        </div>
        <div onClick={fun.profile_dropdown} className="header-profile">
          <img src={userData.profile_image} alt="profile" />
          <p>
            {userData.first_name} {userData.last_name}
          </p>
          <i className="bi bi-caret-down-fill"></i>
          <div className="header-profile-dropdown">
            <ul>
              <li>
                <Link to={`/profile/${userId}`}>
                  <div>
                    <i className="bi bi-person-circle"></i>
                    <p>Profile</p>
                  </div>
                </Link>
              </li>
              <li onClick={LogoutUser}>
                <Link to="">
                  <div>
                    <i className="bi bi-person-circle"></i>
                    <p>Logout</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="">
                  <div>
                    <i className="bi bi-gear-fill"></i>
                    <p>Setting</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <aside>
        <div className="side-profile">
          <div className="side-profile-image">
            <img src={userData.profile_image} alt="" />
          </div>
          <h4>
            {userData.first_name} {userData.last_name}
          </h4>
        </div>
        <nav>
          <ul>
            <li id="h">
              <NavLink activeclassname={"active"} to="/">
                <i className="fa-solid fa-house-chimney"></i> Home
              </NavLink>
            </li>
            <li id="e">
              <NavLink to="explore/">
                <i className="fa-solid fa-earth-americas"></i> Explore
              </NavLink>
            </li>
            <li id="f">
              <NavLink to="follow/">
                <i className="fa-solid fa-circle-user"></i> Follow
              </NavLink>
            </li>
            <li id="c" className="not-show-in-mobile">
              <NavLink to="chats/">
                <i className="bi bi-chat-left-text-fill"></i> Chats
              </NavLink>
            </li>
            <li id="g">
              <NavLink to="groups/">
                <i class="bi bi-file-earmark-arrow-up-fill"></i> Posts
              </NavLink>
            </li>
            <li id="m">
              <NavLink to="more/">
                <i className="bi bi-three-dots"></i> More
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <Outlet context={{ searchName: searchName }} />
    </>
  );
}
