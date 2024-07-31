"use client"

import React, { useState } from 'react';
import LoginCSS from './Login.module.css';
import logo from '../assets/logo.png';
import eye from '../assets/eyecon.png';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';

const Login = () => {

  const [toggle, setToggle] = useState([LoginCSS.toggleOff, 'password']);       //state for CSS change for eye icon

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  
  const toggleShowPassword=()=>{                                  //function to handle toggle show and hide password
    if(toggle[0]===LoginCSS.toggleOff)
      return setToggle([LoginCSS.toggleOn, 'text']);
    setToggle([LoginCSS.toggleOff, 'password']);
  }
  
  const router = useRouter();

  //conneting with server on login to verify user
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!credentials.email || !credentials.password) {
        toast.error("Email and password is required")
      }
      else {
        const res = await axios.post('/api/login', { email: "email" });
        console.log(res);
        if (res.data.success) router.push('/');
      }
    } catch (error) {
      toast.error("Email and Password does not match");
      console.log(error);
    }
  }
  
  //tailwind styles collection
  const style = {
    inputStyle: `${LoginCSS.input} px-4 py-2 text-sm m-2 w-80 bg-blue-50 border-2 rounded border-gray-300`,
    showPasswordStyle: `${toggle[1] === 'password' ? "opacity-20" : "opacity-100"} cursor-pointer w-8 relative p-0 m-0 bottom-14 mr-[-17rem]`
  }

  return (
    <div className={LoginCSS.background}>
      <div className={LoginCSS.blue}>
        <div className={LoginCSS.decorCircle1}></div>
        <div className={LoginCSS.decorCircle2}></div>
        <div className={LoginCSS.decorCircle3}></div>
        <div className={LoginCSS.decorCircle4}></div>
      </div>
      <form id='login-form'>
      <div className={`${LoginCSS.loginForm} flex flex-col z-[2] rounded-md p-5 shadow-2xl bg`}>
        <Image src={logo} className=' w-16 cursor-pointer'/>
        <h1 className=' text-2xl font-bold py-4'>Login</h1>
        <input id='email' className={style.inputStyle} type='email' placeholder='Email'
          onChange={(e)=>setCredentials({...credentials, email: e.target.value})}
        />
        <input id='password' className={style.inputStyle} type={toggle[1]} placeholder='Password' 
          onChange={(e)=>setCredentials({...credentials, password: e.target.value})}
        />
        <Image src={eye} className={style.showPasswordStyle} 
          onClick={toggleShowPassword}
        />
        <button className={`${LoginCSS.button} text-white bg-[#05A4EF] rounded cursor-pointer`}
          type='submit'
          onClick={handleLogin}

        >
          Log in
        </button>
        <h5 className=' text-[12px] py-4 text-gray-500 hover:underline cursor-pointer' >Forgot password?</h5>
          <h4 className=' text-sm'>
            Need an account?
            <span className=' font-bold underline cursor-pointer' onClick={() => router.push('/signup')} >SIGN UP</span>
          </h4>
      </div>
      </form>
      <Toaster/>
    </div>
  );
}

export default Login;
