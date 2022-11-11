import React ,{useContext,useEffect} from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import * as fun from "../Gui/js/function";
import useAxios from '../utils/useAxios';


export default function Main() {
    
    let {LogoutUser,setUserData,userId,userData} = useContext(AuthContext)

    const api = useAxios()
    useEffect(()=>{
        try{
            api.get(`/user/${userId}`)
            .then(response=>{
              setUserData(response.data)
            })
        }
        catch(err){
            console.log(err)
        }
    },[setUserData,userId])

    console.log(userData)
    return (
        <>
            <header>
                <div className="logo">
                    <h2>PHOTOGRAPH</h2>
                </div>
                <div className="search-box">
                    <form action="">
                        <input type="text" placeholder="Search..." />
                        <Link to=""><i className="bi bi-search"></i></Link>
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
                    <p>Sumit Achaju</p>
                    <i className="bi bi-caret-down-fill"></i>
                    <div className="header-profile-dropdown">
                        <ul>
                            <li><Link to="">
                                <div>
                                    <i className="bi bi-person-circle"></i>
                                    <p>Profile</p>
                                </div>
                            </Link>
                            </li>
                            <li onClick={LogoutUser}><Link to="">
                                <div>
                                    <i className="bi bi-person-circle"></i>
                                    <p>Logout</p>
                                </div>
                            </Link>
                            </li>
                            <li><Link to="">
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
                    <h4>Sumit Achaju</h4>
                </div>
                <nav>
                    <ul>
                        <li id="h"><NavLink activeclassname={"active"} to="/" ><i className="fa-solid fa-house-chimney"></i> Home</NavLink></li>
                        <li id="e"><NavLink to="explore/"><i className="fa-solid fa-earth-americas"></i> Explore</NavLink></li>
                        <li id="f"><NavLink to="follow/"><i className="fa-solid fa-circle-user"></i> Follow</NavLink></li>
                        <li id="c"><NavLink to="chats/"><i className="bi bi-chat-left-text-fill"></i> Chats</NavLink></li>
                        <li id="g" className="not-show-in-mobile"><NavLink to="groups/"><i className="fa-solid fa-user-group"></i> Groups</NavLink></li>
                        <li id="m"><NavLink to="more/"><i className="bi bi-three-dots"></i> More</NavLink></li>
                    </ul>
                </nav>
            </aside>
            <Outlet />
        </>
    )
}
