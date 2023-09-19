import React, { useContext } from 'react'
import FriendList from './Components/FriendList'
import NotFound from "../Pages/404NotFound";
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Outlet } from 'react-router-dom';

export default function Chat() {
  const {userId} = useContext(AuthContext)
  const {id} = useParams()
  if(Number(id) === userId){
    return <NotFound />
  }
  return (
    <div>
      <div style={{marginTop: "25px"}} className="container-mine flex">
        <Outlet/>
        <FriendList />
      </div>
    </div>
  )
}
