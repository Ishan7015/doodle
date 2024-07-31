"use client"

import cmd from '@/app/assets/cmdIcon.png';
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { activeWindow } from '../../slice/currentWindow';
import commands from '@/app/helpers/commands';
import { useState } from 'react';
import { redirect } from 'next/dist/server/api-utils';


const Cmd = () => {

  const inputElement = useRef();
  const prevCmd = ["help"];
  let lastCmdNum = 0;

  const dispatch = useDispatch();

  const cmdText = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "clear") {
        setCmdText(prev => {
          const temp = prev.pop();
          prev = [];
          prev.push(temp);
          return [...prev];
        })
      }
      else {
        const res = commands(e.target.value);
        let data = "";
        if ("msg" in res) {
          console.log(res.msg);
          data = res.msg;
        } else {
          data = res.redirect;
          window.open(res.redirect, "_blank");
        }
        setCmdText(prev => {
          const temp = prev.pop();
          prev.push(<div style={{whiteSpace: "pre-wrap"}}>{`$ desktop > ${e.target.value}`}</div>)
          prev.push(<div style={{whiteSpace: "pre-wrap"}}>{`$ desktop > ${data}`}</div>);
          prev.push(temp);
          return [...prev];
        })
      }
      if (prevCmd.length === 10) {
        prevCmd.shift();
      }
      prevCmd.push(e.target.value);
      lastCmdNum = prevCmd.length-1;
    }
    if (e.key === "ArrowUp") {
      inputElement.current.value = prevCmd[lastCmdNum]
      if (lastCmdNum) lastCmdNum -= 1; 
    }
    if (e.key === "ArrowDown") {
      if (lastCmdNum != prevCmd.length-1) lastCmdNum += 1; 
      inputElement.current.value = prevCmd[lastCmdNum]
    }
  }
  const cmdInput = <div>{"$ desktop >"}<input id="myInput" autoComplete='off' style={{caretShape: "block"}} ref={inputElement} type='text' className='bg-transparent border-0 w-[70%] focus:outline-none px-2' onKeyDown={cmdText} /></div>
  const [cmdHtml, setCmdText] = useState([cmdInput])
  const [num, setNum] = useState(1);


  useEffect(() => inputElement.current.focus());

  return (
    <AnimatePresence>
      <motion.div  className='absolute top-5 bottom-5 right-5 left-5 bg-gray-800/95 z-10 backdrop-blur-sm rounded-2xl'
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.15 } }}
      >
        <div className='flex justify-between items-center m-4 border-b-[1px] border-gray-400'>
          <h1 className='flex items-center text-2xl font-bold text-white'><Image src={cmd} className='mx-2 ' />CMD</h1>
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
        <div className='bg-transparent text-white h-[85%] mx-4 p-4 cmd text-2xl font-extraboldbold overflow-auto' id='scroll'>
          {cmdHtml}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Cmd;
