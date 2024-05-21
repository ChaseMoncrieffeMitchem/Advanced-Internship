import { signOutUser } from '@/redux/userSlice'
import React from 'react'
import { useSelector, useDispatch } from "react-redux";

export default function Logout() {
    const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(signOutUser())}></button>
  )
}
