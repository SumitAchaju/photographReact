import React, { useContext, useMemo } from "react";
import { baseUrl } from "../../utils/ApiUrl";
import AuthContext from "../../context/AuthContext";

export default function FriendListProfile(props) {
  const url = props.profile_image.split("/media/");
  const profile_image =
    url[0] === "" ? baseUrl + props.profile_image : props.profile_image;
  const { userId } = useContext(AuthContext);
  const msgClr = useMemo(() => {
    if (props.userId === userId) {
      return "seen-msg-color";
    } else if (props.msgStatus !== "seen") {
      return "text-color";
    } else {
      return "seen-msg-color";
    }
  }, [props.msgStatus]);

  let msgStatusSymbol;
  if (props.msgStatus === "sent") {
    msgStatusSymbol = <i className="bi bi bi-check-circle"></i>;
  } else if (props.msgStatus === "delivered") {
    msgStatusSymbol = <i className="bi bi bi-check-circle-fill"></i>;
  }
  else if (props.msgStatus ===''){
    msgStatusSymbol=''
  }
  else {
    msgStatusSymbol = (
      <figure className="seen-profile">
        <img src={profile_image} alt="profile" />{" "}
      </figure>
    );
  }

  return (
    <div className="friend-list-profile">
      <figure className={props.activeStatus ? "active-user-green" : ""}>
        <img src={profile_image} alt="profile_img" />
      </figure>
      <div>
        <h3 className="friend-list-name text-color">
          {props.first_name + " " + props.last_name}
        </h3>
        <div className="d-flex align-center" style={{ gap: "10px" }}>
          <p className={"latest-message " + msgClr}>
            {props.userId === userId
              ? "you: " + props.latestMsg
              : props.latestMsg}
          </p>
          <span className={"friend-list-msg-date " + msgClr}>
            {props.date.split(' ').length===3?props.date.slice(0,3):props.date}
          </span>
          <span className="seen-status text-color">
            {msgStatusSymbol}
          </span>
        </div>
      </div>
    </div>
  );
}
