import { Outlet,Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


const  PrivateRoutes = ()=>{
    let {loginStatus} = useContext(AuthContext)
    return (
        loginStatus ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;