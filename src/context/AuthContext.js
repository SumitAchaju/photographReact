import { createContext, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [loginStatus, setloginStatus] = useState(() =>
    localStorage.getItem("token") ? true : false
  );

  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  const [userId, setUserId] = useState(() =>
    authToken ? jwt_decode(authToken.access).user_id : null
  );

  const [userData, setUserData] = useState({});
  const [editId, setEditId] = useState(() => 0);
  const [edited, setEdited] = useState(() => false);
  const [trigger, setTrigger] = useState(() => false);
  const [msg, setMsg] = useState(() => "");

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: `${e.target.username.value}`,
        password: `${e.target.password.value}`,
      });
      let data = await response.data;
      if (response.status === 200) {
        setAuthToken(data);
        setUserId(jwt_decode(data.access).user_id);
        setloginStatus(true);
        localStorage.setItem("token", JSON.stringify(data));
        e.target.username.value = "";
        e.target.password.value = "";
      }
    } catch (error) {
      if (error.response.status === 401) {
        Message("wrong username or password!!");
      } else {
        Message("Something went Wrong!!");
      }
      e.target.username.value = "";
      e.target.password.value = "";
    }
  };

  const LogoutUser = () => {
    setloginStatus(false);
    setAuthToken(null);
    setUserId(null);
    setUserData({});
    localStorage.removeItem("token");
  };
  function Message(msg) {
    document.getElementById("myModal1").style.display = "block";
    setMsg(msg);
    setTrigger(true);
  }

  let contextData = {
    userData: userData,
    userId: userId,
    loginStatus: loginStatus,
    authToken: authToken,
    editId: editId,
    edited: edited,
    msg: msg,
    trigger: trigger,
    setUserId: setUserId,
    setUserData: setUserData,
    setAuthToken: setAuthToken,
    LoginUser: LoginUser,
    LogoutUser: LogoutUser,
    setloginStatus: setloginStatus,
    setEditId: setEditId,
    setEdited: setEdited,
    setMsg: setMsg,
    setTrigger: setTrigger,
    Message: Message,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
