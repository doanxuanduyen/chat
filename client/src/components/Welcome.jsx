import React from 'react';
import Robot from '../assets/robot.gif'
function Welcome({currentUser}) {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <img src={Robot} alt="robot" />
      <h1 className='text-white text-[2rem]'>Welcome, <span className='text-icon-green'>{currentUser?.username ?? 'Guest'}</span> !</h1>
      <h3 className='text-white'>Please select a chat to start</h3>
    </div>
  );
}

export default Welcome;