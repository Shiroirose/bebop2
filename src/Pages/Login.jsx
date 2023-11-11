import React, { useState } from 'react'
import LoginComponent from '../components/LoginComponent'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from '../firebaseConfig'
import Loader from '../components/common/Loader/Loader'

const Login = () => {
  const [loading,setLoading]=useState(true);

  let navigate=useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if(res?.accessToken){
        navigate("/home");
      }
      else{
        setLoading(false);
      }
    })
  },[]);



  return (
    loading ?
    <Loader /> :
    <LoginComponent />
  )
}

export default Login