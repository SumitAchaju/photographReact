import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { baseUrl } from "./ApiUrl";

// function useAxios() {
//   const { authToken, setUserId, setAuthToken } = useContext(AuthContext);

//   const axiosInstance = axios.create({
//     baseURL: baseUrl,
//     headers: { Authorization: `Bearer ${authToken?.access}` },
//   });

//   axiosInstance.interceptors.request.use(async (req) => {
//     const user = jwt_decode(authToken.access);
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//     if (!isExpired) return req;

//     const response = await axios.post(`${baseUrl}/api/token/refresh/`, {
//       refresh: authToken.refresh,
//     });

//     localStorage.setItem("token", JSON.stringify(response.data));

//     setAuthToken(response.data);
//     setUserId(jwt_decode(response.data.access).user_id);

//     req.headers.Authorization = `Bearer ${response.data.access}`;
//     return req;
//   },{ synchronous: true });

//   return axiosInstance;
// };

// export default useAxios;

// new implementation
let isTokenRefreshing = false;
let newTokenPromise = null;

export default function useAxios() {
  const { setUserId, setAuthToken, setLoginStatus } = useContext(AuthContext);
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  let token = localStorage.getItem("token");
  token = JSON.parse(token);

  if (token) {
    instance.interceptors.request.use(async (config) => {
      if (checkTokenExpire(token.access) && !isTokenRefreshing) {
        isTokenRefreshing = true;
        newTokenPromise = getRefreshToken(token.refresh)
          .then((newToken) => {
            localStorage.setItem("token", JSON.stringify(newToken.data));
            setAuthToken(JSON.stringify(newToken.data));
            setUserId(jwt_decode(newToken.data.access).user_id);
            isTokenRefreshing = false;
            newTokenPromise = null;
            return newToken;
          })
          .catch((error) => {
            setLoginStatus(false);
            setAuthToken(null);
            setUserId(null);
            isTokenRefreshing = false;
            newTokenPromise = null;
            localStorage.removeItem("token");
            return error;
          });
      }

      // If token is refreshing, wait for the new token
      if (isTokenRefreshing && newTokenPromise !== null) {
        try {
          const newToken = await newTokenPromise;
          token = newToken.data;
        } catch (error) {
          const controller = new AbortController();
          config.signal = controller.signal;
          controller.abort();
        }
      }

      config.headers.Authorization = `Bearer ${token.access}`;
      return config;
    });
  }

  return instance;
}

function checkTokenExpire(token) {
  if (token === null) return false;
  const decodedToken = jwt_decode(token);
  const currentDate = new Date();
  return decodedToken.exp !== undefined
    ? decodedToken.exp * 1000 < currentDate.getTime()
    : false;
}

async function getRefreshToken(refresh) {
  return await axios.post(`${baseUrl}/api/token/refresh/`, {
    refresh,
  });
}
