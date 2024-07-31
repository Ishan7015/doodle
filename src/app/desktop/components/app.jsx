"use client"

import React from 'react';
import Footer from './footer';
import bg1 from "@/app/assets/bg1.jpg"
import bg2 from "@/app/assets/bg2.jpg"
import bg3 from "@/app/assets/bg3.jpg"
import bg4 from "@/app/assets/bg4.jpg"
import bg5 from "@/app/assets/bg5.jpg"
import { useSelector } from 'react-redux';
import Settings from './windows/settings';
import { AnimatePresence } from 'framer-motion';
import Cmd from './windows/cmd';


const App = () => {

  //TODO: Add an useEffect to fetch the current wallpaper of the user from the database


  const currentWallpaper = useSelector((state) => state.wallpaper.value);
  const currentWindow = useSelector((state) => state.activeWindow.value);
  const bg = [bg1.src, bg2.src, bg3.src, bg4.src, bg5.src];
  const openWindow = () => {
    switch (currentWindow) {
      case "settings":
        return <Settings />
      case "cmd":
        return <Cmd />
    }
  }

  return (
    <AnimatePresence mode='wait'>
      <div>
        { openWindow()}
        <div className={`w-screen h-screen overflow-hidden bg-cover`} style={{ backgroundImage: `url(${bg[currentWallpaper-1]})` }}>
          <Footer/>
        </div> 
      </div>
    </AnimatePresence>
  );
}

export default App;
