import toast from "react-hot-toast";
import { baseUrl } from "../../utils/ApiUrl";
import { Link } from "react-router-dom";

export const newMsgToast = (msg) =>
  toast(
    <Link to={`/chats/${msg.send_user.id}`} >
    <div className="msg-notification-toast">
      <div className="msg-notification-toast-profile">
        <img src={baseUrl + msg.send_user.profile_image} alt="profile" />
        <span>{msg.send_user.first_name + " " + msg.send_user.last_name}</span>
      </div>
      <div className="msg-notification-toast-message">
        <p>{msg.message_text}</p>
      </div>
    </div>
    </Link>,
    {
      position: "bottom-right",
      style: {
        backgroundColor:"rgb(39, 39, 39)",
      },
      duration: 8000,
    }
  );
