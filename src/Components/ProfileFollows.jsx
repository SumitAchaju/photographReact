import React from 'react'
import { useOutletContext } from 'react-router-dom'
import ProfileFollow from '../Components/ProfileFollow';

export default function ProfileFollows() {
    let {follow,setFollow} = useOutletContext();
  return (
    <>
    <ProfileFollow follow={follow} />
    </>
  )
}
