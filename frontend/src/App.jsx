import React, { useState } from 'react'
import { IoChatbubbles } from "react-icons/io5";
import ChatWidget from './components/ChatWidget';
import { useEffect } from 'react';

const App = () => {
  const [isOpen, setIsOpen] = useState('');
  const toggleChatWidget = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <section className='bg-white w-full min-h-screen relative'>
        <div className='w-[20rem] md:w-[30rem] h-[30rem]  absolute right-1.5 bottom-2'>
          <div className={` w-full h-full flex items-center justify-center absolute   duration-150 ${isOpen ? "scale-[1]" : "scale-0"} `}>
            <ChatWidget toggleChatWidget={toggleChatWidget} />
          </div>
          <button onClick={toggleChatWidget} className='cursor-pointer absolute right-1.5 bottom-0'>
            <IoChatbubbles className='text-6xl text-blue-500' />
          </button>
        </div>
      </section>
    </>
  )
}

export default App
