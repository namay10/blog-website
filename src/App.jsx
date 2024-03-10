import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
//import './App.css'
import authservice from './appwrite/auth';
import { login,logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';



function App() {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();
  useEffect(() => {
    authservice.getuser()
    .then((user)=>{
      if(user){
        dispatch(login({user}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <div className='absolute bottom-0 left-0 right-0'>
        <Footer />
        </div>
        
      </div>
    </div>
  ) : null
}

export default App
