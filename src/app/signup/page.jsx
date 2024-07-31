"use client"

import React, { useState } from 'react';
import LoginCSS from './Signup.module.css';
import logo from '../assets/logo.png';
import eye from '../assets/eyecon.png';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import toast, {Toaster} from 'react-hot-toast';
import axios from 'axios';
import { validateEmail, validatePassword } from '../helpers/formValidation';

const Signup = () => {

  const [toggle, setToggle] = useState([LoginCSS.toggleOff, 'password']);       //state for toggle show/hide password
  const [password, setPassword] = useState({ password: "", confirmPassword: "" }); //state to track password and confirm password
  const [newUser, setNewUser] = useState({username: "", email: "", password: ""}); //new user credintials for sign up


  //Function to set the state with new users credintials
  const onUserInput = (e, field) => { 
    const value = e.target.value;
    switch (field) {
      case "username":
        setNewUser({ ...newUser, username: value })
        break;
      case "email":
        setNewUser({ ...newUser, email: value })
        break;
      case "password":
        setNewUser({ ...newUser, password: value })
        break;
    }
  }

    //Function toggles the show/hide password
    const toggleShowPassword=()=>{                                  
        if(toggle[0]===LoginCSS.toggleOff)
            return setToggle([LoginCSS.toggleOn, 'text']);
        setToggle([LoginCSS.toggleOff, 'password']);
    }

  //router for navigating to different pages
  const router = useRouter();


  //function checks if the password and confirm-password are same or not
  const isPasswordMatching = () => {
    if (password.password != password.confirmPassword) {
      toast.error("Password does not match");
      return false;
    }
    return true;

  }


  //function to validate the user input, apply constrains on the password
  //like 8 characters long, alphabet and numerbs included, special character included 
  const isInputValid = () => {
    if (!newUser.username) {
      toast.error("User name is required");
      return false;
    }
    if (!validateEmail(newUser.email)) {
      toast.error("Invalid Email");
      return false;
    } 
    if (!validatePassword(newUser.password)) {
      toast.error("Password must include:\n1. 8 Characters\n2. One Number\n3. One Alphabet\n4. One Special Character (!@#$%^&*)",
        {duration: 8000}
      )
      return false;
    }
    return true;
  }


  //function to handle signup, calls http post request to the backend with the new users credintials
  const onSignUp = async () => {
    if (isInputValid() && isPasswordMatching() ) {
      try {
        const response = await axios.post('/api/signup', newUser);
        console.log(response.data);
        router.push('/login');
      } catch (error) {
        if (error.response.status === 409) {
          if("username" in error.response.data.data.error.keyPattern) toast.error("Username already exist")
          if("email" in error.response.data.data.error.keyPattern) toast.error("Email already exist")
        }
        else {
          toast.error('Somthing went wrong! Please try Again');
          console.log(error);
        }
      }
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
      <div className={`${LoginCSS.loginForm} flex flex-col z-[2] rounded-md p-5 shadow-2xl bg`}>
        <Image alt='logo' src={logo} className=' w-16 cursor-pointer'/>
        <h1 className=' text-2xl font-bold py-4'>Signup</h1>
        <input className={style.inputStyle} type='text' placeholder='Username'
          onChange={(e)=>onUserInput(e, "username")}
        />
        <input className={style.inputStyle} type='email' placeholder='Email'
          onChange={(e)=>onUserInput(e, "email")}
        />
        <input className={style.inputStyle} type={toggle[1]} placeholder='Password'
          onChange={(e) => {
            setPassword({ ...password, password: e.target.value });
            onUserInput(e, "password")
          }}
        />
        <Image src={eye} className={style.showPasswordStyle} 
          onClick={toggleShowPassword}
        />
        <input className={style.inputStyle} type={toggle[1]} placeholder='Confirm Password' 
          onChange={(e)=>setPassword({...password, confirmPassword: e.target.value})}
        />
        <Image alt='show password' src={eye} className={style.showPasswordStyle} 
          onClick={toggleShowPassword}
        />
        <button className={`${LoginCSS.button} text-white bg-[#05A4EF] rounded cursor-pointer`}
          onClick={() => {
            onSignUp();
          }}>
          Sign up
        </button>
        <h4 className=' text-sm my-4'>
          Already have an account?
          <span className=' font-bold underline cursor-pointer' onClick={() => router.push('/login')}>LOG IN</span>
        </h4>
      </div>
      <Toaster/>
    </div>
  );
}

export default Signup;
