"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import start from '@/app/assets/windowIcon.png';
import explorer from '@/app/assets/fileExplorerIcon.png';
import profile from '@/app/assets/profileIcon.png';
import linkedin from '@/app/assets/linkedinLogo.png';
import settings from '@/app/assets/settingsIcon.png';
import cmd from '@/app/assets/cmdIcon.png';
import { useDispatch } from 'react-redux';
import { activeWindow } from '../slice/currentWindow';


const Footer = () => {
  let time  = new Date().toLocaleTimeString()
  const [ctime,setTime] = useState(time)
  const UpdateTime=()=>{
    time =  new Date().toLocaleTimeString()
    setTime(time)
  }
  useEffect(() => {
    setInterval(UpdateTime, 1000)
  }, []);

  const style = {
    img: "w-12 my-2 mx-4 cursor-pointer hover:scale-125 hover:-translate-y-4 transition-all duration-500"
  }

  const dispatch = useDispatch();

  return (
    <div className='flex justify-center items-center absolute w-screen bottom-2 scal'>
      <div className='flex bg-slate-800 rounded-2xl'>
        <div className='flex rounded-l-2xl items-center text-2xl px-4 min-w-[170px] text-center text-white justify-center mr-4 font-bold bg-gradient-to-r from-blue-950 to-gray-900'>
          {ctime}
        </div>
        <Image src={start} className={style.img} />
        <Image src={profile} className={style.img}/>
        <Image src={explorer} className={style.img}/>
        <a href='https://www.linkedin.com/in/ishan017/' target='_blank'><Image src={linkedin} className={style.img}/></a>
        <Image src={cmd} className={style.img} onClick={()=>dispatch(activeWindow("cmd"))} />
        <Image src={settings} className={style.img} onClick={()=>dispatch(activeWindow("settings"))}/>
      </div>
    </div>
  );
}

export default Footer;
