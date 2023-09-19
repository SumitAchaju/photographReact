import React, { useContext, useEffect, useState } from "react";
import FriendListProfile from "./FriendListProfile";
import useAxios from "../../utils/useAxios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import DataContext from "../../context/DataContext";
import { baseUrl } from "../../utils/ApiUrl";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function FriendList() {
  const { userId } = useContext(AuthContext);
  const { latestMessage, seenMsg } = useContext(DataContext);
  const [latestMsg, setLatestMsg] = useState();
  const [friend, setFriend] = useState();
  const [filterMsg, setFilterMsg] = useState();
  const [filterFriend, setFilterFriend] = useState();
  const [activeFriend, setActiveFriend] = useState();
  const api = useAxios();

  useEffect(() => {
    setFilterFriend(friend);
    setFilterMsg(latestMsg);
  }, [latestMsg, friend]);

  useEffect(() => {
    if (!latestMsg) {
      return;
    }
    const msg = latestMsg.map((item) => {
      if (item.id === seenMsg.msgId) {
        item.msg_status = "seen";
      }
      return item;
    });
    setLatestMsg(msg);
  }, [seenMsg]);

  useEffect(() => {
    api.get(`userfollowfollowing/${userId}`).then((res) => {
      const follow = res.data.userfriend.following;
      const mutual = res.data.userfriend.mutual;
      setActiveFriend([...mutual, ...follow]);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      api.get("latest_message/").then((res) => {
        setLatestMsg(res.data.latest_message);
        setFriend(res.data.friend);
      });
    }
  }, [userId]);
  useEffect(() => {
    if (latestMessage.id && latestMsg && friend) {
      const compareUserId =
        latestMessage.send_user.id === userId
          ? latestMessage.receive_user.id
          : latestMessage.send_user.id;
      let message = latestMsg
        .filter((item) => item.send_user.id !== compareUserId)
        .filter((item) => item.receive_user.id !== compareUserId);
      setLatestMsg([latestMessage, ...message]);
      let friend_list = friend.filter((item) => item.id !== compareUserId);
      setFriend([...friend_list]);
    }
  }, [latestMessage]);

  function handleFriendSearch(e) {
    const name = e.target.value.toLowerCase();
    let msg = latestMsg.filter((item) => {
      let user =
        item.send_user.id === userId ? item.receive_user : item.send_user;
      let user_name = (user.first_name + " " + user.last_name).toLowerCase();
      return user_name.includes(name);
    });
    setFilterMsg(msg);
    let friend_msg = friend.filter((item) => {
      let user_name = (item.first_name + " " + item.last_name).toLowerCase();
      return user_name.includes(name);
    });
    setFilterFriend(friend_msg);
  }
  return (
    <div className="chat-friend-list">
      <h2 className="chat-friend-list-title">Search Friends</h2>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="chat-friend-search-input">
          <input
            onChange={handleFriendSearch}
            type="text"
            name="chatFriendSearch"
            placeholder="Search..."
          />
          <button type="submit">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </form>
      <div className="chat-friend-profile">
        <div className="active-user-slide">
          <Swiper
            // install Swiper modules
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={3}
            navigation
          >
            {activeFriend &&
              activeFriend.map((item) => {
                if (item.active_status) {
                  return (
                    <SwiperSlide key={item.id}>
                      <Link to={`/chats/${item.id}`}>
                        <div className="active-user-slide">
                          <figure className="active-user-green-slide">
                            <img
                              src={baseUrl + item.profile_image}
                              alt="profile"
                            />
                          </figure>
                          <span>{item.first_name + " " + item.last_name}</span>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                } else return "";
              })}
          </Swiper>
        </div>
        {filterMsg &&
          filterMsg.map((item) => {
            const user =
              item.send_user.id === userId ? item.receive_user : item.send_user;
            return (
              <Link key={item.id} to={`/chats/${user.id}`}>
                <FriendListProfile
                  profile_image={user.profile_image}
                  first_name={user.first_name}
                  last_name={user.last_name}
                  latestMsg={item.message_text}
                  msgStatus={item.msg_status}
                  userId={item.send_user.id}
                  activeStatus={user.active_status}
                  date={item.formated_date}
                />
              </Link>
            );
          })}
        {filterFriend &&
          filterFriend.map((item) => (
            <Link key={item.id} to={`/chats/${item.id}`}>
              <FriendListProfile
                profile_image={item.profile_image}
                first_name={item.first_name}
                last_name={item.last_name}
                latestMsg={"Start Chat"}
                msgStatus={""}
                date={""}
                userId={item.id}
                activeStatus={item.active_status}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
