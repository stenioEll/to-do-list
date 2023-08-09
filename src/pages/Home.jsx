import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react"
import logo from "../assets/checked.png"
import TodoList from '../assets/todolist.json'
import { useNavigate } from "react-router-dom";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const cardSchema = z.object({
  name: z.string()
  .min(2, 'At least 2 characters')
  .nonempty('Name is required'),
  name_list: z.string()
  .nonempty('To-do List Name is required')
});


function Home() {
  
  const navigate = useNavigate()
  const [mobileView, setMobileView] = useState(false);
  const [inputs, setInputs] = useState({})
  const {
    register,
    handleSubmit,
    formState : {errors, ...formState}} 
    = useForm({
    resolver: zodResolver(cardSchema),
  });

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial call to set mobile view
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (data) => {
    localStorage.setItem('formInputs', JSON.stringify(data));
    navigate('/Tasks');
  };
 
    


  return (
    <div className={`grid ${mobileView ? 'grid-cols-1' : 'grid-cols-2'} w-full h-screen font-poppins animate-fade`}>
      {!mobileView && (
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
      )}
      <div className="bg-gradient-to-r from-cyan-200 to-cyan-400 flex flex-col justify-center items-center gap-8 animate-fade-up">
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className='w-84 h- p-8 bg-white rounded-xl shadow-md flex flex-col gap-4 animate-fade animate-delay-300'>
            <div className="flex justify-center items-center gap-2 text-xl mb-84animate-fade-up">
              <img className="w-10 h-10" src={logo} alt="Logo" />
              <h1 className='text-teal-500'>To-do List</h1>
            </div>
            <div className="flex flex-col gap-2">
              <label className='text-teal-800 text-sm'>Name:</label>
              <input className={` appearance-none leading-tight focus:outline-none rounded h-10 p-4 text-gray-800  ${mobileView ? ' text-sm ml-0 min-w-[30vw]' : 'max-w-[15vw] min-w-[15vw]'} border border-teal-100 shadow-md focus:shadow-sm focus:border-teal-500`} 
                id="name" 
                type="text" 
                name="name" 
                placeholder="Name" 
                {...register('name')}
              />
              {errors.name && <p className="text-red-600 text-[10px]">{errors.name.message}</p>}
              <label className='text-teal-800 text-sm mt-2'>To-do List Name:</label>
              <input className={` appearance-none leading-tight focus:outline-none rounded h-10 p-4 text-gray-800 ${mobileView ? ' text-sm ml-0 min-w-[30vw]' : 'max-w-[15vw] min-w-[15vw]'} border border-teal-100 shadow-md focus:shadow-sm focus:border-teal-500`}
                id="name_list" 
                type="text" 
                name="name_list" 
                placeholder="To-do List Name" 
                {...register('name_list')}
                />
                {errors.name_list && <p className="text-red-600 text-[10px]">{errors.name_list.message}</p>}
              <button type="submit" className="mt-4 focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
