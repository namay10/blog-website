import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice';
function Logout() {
    const dispatch=useDispatch();
    const logouthandler=()=>{
        authservice.logout().then(()=>{
            dispatch(logout())
        }).catch((error)=>{
            throw(error)
        })
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logouthandler}>Logout</button>
  )
}

export default Logout