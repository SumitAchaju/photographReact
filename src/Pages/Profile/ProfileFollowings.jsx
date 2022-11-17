import React from 'react'
import { useOutletContext } from 'react-router-dom'
import ProfileFollow from '../../Components/ProfileFollow';

export default function ProfileFollowings() {
    let {following,setFollow} = useOutletContext();
  return (
    <>
    <ProfileFollow follow={following} />
    </>
  )
}
