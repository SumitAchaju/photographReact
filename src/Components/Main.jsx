import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";
import PopUpModel from "./PopUpModel";
import PopUpMsg from "./PopUpMsg";
import { ScrollRestoration } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CustomNavLink from "./CustomNavlink";

export default function Main() {
  let { LogoutUser, setUserData, userId, userData, authToken } =
    useContext(AuthContext);
  // const { unSeenMsg } = useContext(DataContext);
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
  }, [setUserData, userId, authToken]);

  const Search = (e) => {
    e.preventDefault();
    const value = e.target.searchbox.value;
    if (value) {
      navigate(`friendsearch/${value}`);
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
          <div
            className="message-notification"
            // data-msg-number={unSeenMsg?.length}
            data-msg-number='0'
          >
            <i className="bi bi-messenger"></i>
            {/* {unSeenMsg && unSeenMsg.length !== 0 && (
              <div className="message-notification-dropdown">
                {unSeenMsg &&
                  unSeenMsg.map((item) => (
                    <Link key={item.id} to={`/chats/${item.send_user.id}`}>
                      <div className="unseen-message">
                        <figure>
                          <img
                            src={baseUrl + item.send_user.profile_image}
                            alt="profile"
                          />
                        </figure>
                        <div>
                          <span className="profile-name">
                            {item.send_user.first_name +
                              " " +
                              item.send_user.last_name}
                          </span>
                          <span className="unseen-msg">
                            {item.message_text}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            )} */}
          </div>
          <div className="all-notification">
            <i className="bi bi-bell-fill"></i>
          </div>
        </div>
        <div className="header-profile">
          <img src={userData.profile_image} alt="profile" />
          <p>
            {userData.first_name} {userData.last_name}
          </p>
          <i className="bi bi-caret-down-fill"></i>
          <div id="profile_menu" className="header-profile-dropdown">
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
                <Link to="/savedpost">
                  <div>
                    <i className="bi bi-bookmark-fill"></i>
                    <p>Saved</p>
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
            <Link to={`/profile/${userId}`}>
              <img src={userData.profile_image} alt="" />
            </Link>
          </div>
          <Link to={`/profile/${userId}`}>
            <h4>
              {userData.first_name} {userData.last_name}
            </h4>
          </Link>
        </div>
        <nav>
          <ul>
            <li id="h">
              <CustomNavLink to="/">
                <i className="fa-solid fa-house-chimney"></i> Home
              </CustomNavLink>
            </li>
            <li id="e">
              <CustomNavLink  to="explore/">
                <i className="fa-solid fa-earth-americas"></i> Explore
              </CustomNavLink>
            </li>
            <li id="f">
              <CustomNavLink  to="follow/">
                <i className="fa-solid fa-circle-user"></i> Follow
              </CustomNavLink>
            </li>
            <li id="c" className="not-show-in-mobile">
              <CustomNavLink  to="chats/">
                <i className="bi bi-chat-left-text-fill"></i> Chats
              </CustomNavLink>
            </li>
            <li id="g">
              <CustomNavLink  to="posts/">
                <i className="bi bi-file-earmark-arrow-up-fill"></i> Posts
              </CustomNavLink>
            </li>
            <li id="m">
              <CustomNavLink   to="more/">
                <i className="bi bi-three-dots"></i> More
              </CustomNavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div id="home">
        <div className="container-mine flex">
          <PopUpModel />
          <PopUpMsg />
        </div>
      </div>
      <Outlet />
      <ScrollRestoration
        getKey={(location, matches) => {
          return location.pathname;
        }}
      />
      <Toaster />
    </>
  );
}
