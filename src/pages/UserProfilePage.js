import React from 'react'
import Navbar from '../features/navbar/Navbar'
import Profile from "../features/user/components/Profile"

function UserProfilePage() {
  return (
    <div>
      <Navbar></Navbar>
      <Profile></Profile>
    </div>
  )
}

export default UserProfilePage