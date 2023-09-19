import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { baseUrl, socketBaseUrl } from "../../utils/ApiUrl";
import DataContext from "../../context/DataContext";
import AuthContext from "../../context/AuthContext";
import { Tooltip } from "react-tooltip";

export default function ChatBox() {
  const [friend, setFriend] = useState();
  const [message, setMessage] = useState([]);
  const [socket, setSocket] = useState();
  const { recievedMessage, setLatestMessage, seenMsg } =
    useContext(DataContext);
  const { userId } = useContext(AuthContext);
  const api = useAxios();
  const { id } = useParams();
  const messageBox = useRef();

  useEffect(() => {
    if (!message) {
      return;
    }
    const msg = message.map((item) => {
      if (item.id === seenMsg.msgId) {
        item.msg_status = "seen";
      }
      return item;
    });
    setMessage(msg);
  }, [seenMsg]);

  useEffect(() => {
    let totalmsg = [];
    recievedMessage.map((msg) => {
      if (msg.send_user.id === Number(id) && msg.msg_status !== "seen" && socket) {
        socket.send(
          JSON.stringify({
            senderId: userId,
            msgId: msg.id,
            seen: true,
          })
        );
        msg.msg_status = "seen";
        totalmsg.push(msg);
      }
    });
    if (totalmsg.length !== 0) {
      setMessage((prev) => [...prev, ...totalmsg]);
    }
  }, [recievedMessage]);

  useEffect(() => {
    api.get(`userfollowfollowing/${id}`).then((res) => setFriend(res.data));
    api.get(`chatmessage/${id}/`).then((res) => setMessage(res.data));
    const socket_url = `${socketBaseUrl}/ws/chat/${id}/?token=${
      JSON.parse(localStorage.getItem("token")).access
    }`;
    const socket = new WebSocket(socket_url);
    setSocket(socket);
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.msgId) {
        return;
      }
      setMessage((prev) => [...prev, data]);
      setLatestMessage(data);
    };
    return () => {
      socket.close();
    };
  }, [id]);

  useEffect(() => {
    messageBox.current.scrollTo({
      top: messageBox.current.scrollHeight,
      behavior: "smooth",
    });
  }, [message, messageBox]);

  function handleMessageSubmit(e) {
    e.preventDefault();
    const message = e.target.message.value;
    if (message === "") {
      return;
    }
    socket.send(
      JSON.stringify({
        senderId: userId,
        message: message,
      })
    );
    e.target.message.value = "";
  }

  function manageMsgStatus(item, index) {
    let profile = false;
    let seen = false;
    let sent = false;
    let delivered = false;
    if (item.send_user.id === userId) {
      profile = false;
    } else if (index < message.length && message[index + 1] !== undefined) {
      if (message[index + 1].send_user.id === userId) {
        profile = true;
      }
    } else if (message[message.length - 1].send_user.id !== userId) {
      profile = true;
    }
    if (message[index + 1] !== undefined) {
      if (
        message[index + 1].msg_status !== "seen" &&
        item.msg_status === "seen"
      ) {
        seen = true;
      }
    } else if (index + 1 === message.length && item.msg_status === "seen") {
      seen = true;
    }
    if (
      !seen &&
      item.msg_status === "delivered" &&
      item.send_user.id === userId
    ) {
      delivered = true;
    } else if (
      !seen &&
      !delivered &&
      item.msg_status === "sent" &&
      item.send_user.id === userId
    ) {
      sent = true;
    }
    return { profile, seen, delivered, sent };
  }
  return (
    <div className="chatbox">
      <div className="chatbox_head">
        <div className="chatbox_head_profile">
          <figure
            className={
              friend?.userfriend.user.active_status ? "active-user-green" : ""
            }
          >
            <img
              className="profile_image"
              src={baseUrl + friend?.userfriend.user.profile_image}
              alt="profile_image"
            />
          </figure>
          <Link to={`/profile/${friend?.userfriend.user.id}`}>
            <span className="profile_name">
              {friend?.userfriend.user.first_name +
                " " +
                friend?.userfriend.user.last_name}
            </span>
          </Link>
        </div>
        <div className="chat_control_dot">
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
      <div className="chatbox-body" ref={messageBox}>
        {
          <div className="chatbox-body-profile">
            <div className="d-flex align-center justify-center">
              <div className="chatbox-body-profile-content">
                <img
                  src={baseUrl + friend?.userfriend.user.profile_image}
                  alt="profile image"
                />
                <span className="chatbox-body-profile-name">
                  {friend?.userfriend.user.first_name +
                    " " +
                    friend?.userfriend.user.last_name}
                </span>
                <span className="chatbox-body-profile-followfollowing">
                  {friend?.userfriend.followers.length +
                    friend?.userfriend.mutual.length}{" "}
                  Followers |{" "}
                  {friend?.userfriend.following.length +
                    friend?.userfriend.mutual.length}{" "}
                  Following
                </span>
              </div>
            </div>
          </div>
        }
        <div className="chatbox-message">
          {message.map((item, index) => {
            let { profile, seen, delivered, sent } = manageMsgStatus(
              item,
              index
            );
            let msgStatusSymbol;
            if (seen) {
              msgStatusSymbol = (
                <img
                  className="seen-msg-status"
                  src={baseUrl + friend?.userfriend.user.profile_image}
                  alt="profile"
                />
              );
            } else if (delivered) {
              msgStatusSymbol = <i className="bi bi bi-check-circle-fill"></i>;
            } else if (sent) {
              msgStatusSymbol = <i className="bi bi bi-check-circle"></i>;
            } else {
              msgStatusSymbol = <div className="empty-msg-status"></div>;
            }
            return (
              <div
                key={item.id}
                className={`message ${
                  item.send_user.id === userId
                    ? "sender-message"
                    : "reciever-message"
                }`}
              >
                <div className="d-flex align-center" style={{ gap: "10px" }}>
                  {profile ? (
                    <img
                      className="sender-profile"
                      src={baseUrl + friend?.userfriend.user.profile_image}
                      alt="profile"
                    />
                  ) : (
                    <div style={{ width: "25px", height: "25px" }}></div>
                  )}
                  <p
                    className="message-text"
                    data-tooltip-id="date-tooltip"
                    data-tooltip-delay-show={1000}
                    data-tooltip-content={item.formated_date}
                  >
                    {item.message_text}
                  </p>
                </div>
                {msgStatusSymbol}
              </div>
            );
          })}
          <Tooltip id="date-tooltip" />
        </div>
      </div>
      <div className="chatbox-message-input">
        <form
          autoComplete="off"
          spellCheck={false}
          onSubmit={handleMessageSubmit}
        >
          <input type="text" name="message" placeholder="Type a message..." />
          <button type="submit">
            <i className="bi bi-send"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
