import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const baseURL = 'http://127.0.0.1:8000'


const useAxios = () => {
    const {authToken, setUserId, setAuthToken} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers:{Authorization: `Bearer ${authToken?.access}`}
    });


    axiosInstance.interceptors.request.use(async req => {
    
        const user = jwt_decode(authToken.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
        if(!isExpired) return req
    
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: authToken.refresh
          });
        console.log("hi")
    
        localStorage.setItem('token', JSON.stringify(response.data))
        
        setAuthToken(response.data)
        setUserId(jwt_decode(response.data.access).user_id)
        
        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })
    
    return axiosInstance
}

export default useAxios;