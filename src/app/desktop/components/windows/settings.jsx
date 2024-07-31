"use client"

import React, {useState} from 'react';
import settings from "@/app/assets/settingsIcon.png"
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { activeWindow } from '../../slice/currentWindow';
import { motion, AnimatePresence } from 'framer-motion';
import wallpaperIcon from "@/app/assets/wallpaperIcon.png";
import folderTheme from "@/app/assets/folderTheme.png";
import bg1 from "@/app/assets/bg1.jpg"
import bg2 from "@/app/assets/bg2.jpg"
import bg3 from "@/app/assets/bg3.jpg"
import bg4 from "@/app/assets/bg4.jpg"
import bg5 from "@/app/assets/bg5.jpg"
import { currentWallpaper } from '../../slice/wallpaperSlice';

const Settings = () => {

  const dispatch = useDispatch();
  const currWindow = useSelector((state) => state.activeWindow.value);
  const [section, setSection] = useState("wallpaper");

  //TODO: Call api to change the user settings in database to update the wallpaper number

  const changeWallpaper = (num) => {
    dispatch(currentWallpaper(num));
  }


  return (
    <AnimatePresence>
      <motion.div key={currWindow} className='absolute top-5 bottom-5 right-5 left-5 bg-indigo-200/60 z-10 backdrop-blur-sm rounded-2xl'
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.15 } }}
      >
        <div className='flex justify-between items-center m-4 border-b-[1px] border-gray-400'>
          <h1 className='flex items-center text-2xl font-bold text-gray-600'><Image src={settings} className='mx-2 ' />Settings</h1>
          <div>
            <button className='mr-4 bg-yellow-400/80 w-[20px] h-[20px] rounded-full font-extrabold hover:bg-yellow-400 hover:shadow-lg duration-200 mb-4'
            onClick={()=>dispatch(activeWindow("none"))}
            ></button>
            <button className='mr-4 bg-green-400/75 w-[20px] h-[20px] rounded-full font-extrabold hover:bg-green-500 hover:shadow-lg duration-200 mb-4'
            onClick={()=>dispatch(activeWindow("none"))}
            ></button>
            <button className='mr-4 bg-red-400/75 w-[20px] h-[20px] rounded-full font-extrabold hover:bg-red-600 hover:shadow-lg duration-200 mb-4'
            onClick={()=>dispatch(activeWindow("none"))}
            ></button>
          </div>
        </div>
        <div className='h-[85%] mx-8 flex'>
          <div className='sideBar bg-white/20 min-w-[20%] h-full rounded-xl p-4'>
            <div className={`flex items-center text-xl my-2 ${section === "wallpaper" ? "bg-white/50" : ""} rounded-lg cursor-pointer hover:scale-105 duration-150`}
              onClick={()=>setSection("wallpaper")}
            >
              <Image src={wallpaperIcon} className='my-4 mx-6'/>
              Change Wallpaper
            </div>
            <div className={`flex items-center text-xl my-2 ${section === "folder" ? "bg-white/50" : ""} rounded-lg cursor-pointer hover:scale-105 duration-150`}
              onClick={()=>setSection("folder")}
            >
              <Image src={folderTheme} className='my-4 mx-6'/>
              Change Folder Icon
            </div>
          </div>
          <AnimatePresence mode='wait'>
            {section === "wallpaper" && <motion.div key={section} className='h-full flex flex-wrap items-center justify-center w-full'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.15 } }}
              exit={{ opacity: 0, transform: { duration: 0.15 } }}
            >
              <Image src={bg1} className='w-96 h-64 m-4 hover:scale-110 duration-100 cursor-pointer rounded-xl' 
                onClick={()=>changeWallpaper(1)}
              />
              <Image src={bg2} className='w-96 h-64 m-4 hover:scale-110 duration-100 cursor-pointer rounded-xl' 
                onClick={()=>changeWallpaper(2)}
              />
              <Image src={bg3} className='w-96 h-64 m-4 hover:scale-110 duration-100 cursor-pointer rounded-xl' 
                onClick={()=>changeWallpaper(3)}
              />
              <Image src={bg4} className='w-96 h-64 m-4 hover:scale-110 duration-100 cursor-pointer rounded-xl' 
                onClick={()=>changeWallpaper(4)}
              />
              <Image src={bg5} className='w-96 h-64 m-4 hover:scale-110 duration-100 cursor-pointer rounded-xl' 
                onClick={()=>changeWallpaper(5)}
              />
            </motion.div>}
            </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Settings;
