import React from 'react';
import Lottie from "lottie-react"
import logo from "../../assets/checked.png"
import TodoList from '../../assets/todolist.json';

function WelcomeSection({ mobileView }) {
    return (
      <div className={`bg-gradient-to-r from-teal-500 to-teal-600 bg-teal-500 flex flex-col justify-center gap-8 ${mobileView ? 'w-full' : ''}`}>
        <div className="flex justify-center items-center gap-4 text-3xl animate-fade-up">
          <img className="w-20 h-20" src={logo} alt="Logo" />
          <h1 className='text-gray-100'>To-do List</h1>
        </div>
        <div className='text-md flex justify-center items-center gap-2 ml-24'>
          <Lottie className="h-12 w-12" animationData={TodoList} />
          <div>
            <h1 className='text-teal-100 animate-fade animate-delay-800 animate-once'>Hi, Welcome!</h1>
            <h1 className='text-teal-100 animate-fade animate-delay-500'>Stay Organized, Achieve Goals.</h1>
          </div>
        </div>
      </div>
    );
  }
  
  export default WelcomeSection;