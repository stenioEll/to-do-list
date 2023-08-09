import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/checked.png"; // Certifique-se de importar o logo corretamente

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const cardTaskSchema = z.object({
  task: z.string().nonempty('Task Name is required'),

});


function Tasks() {
  const [isHovered, setIsHovered] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  
  const [tasks, setTasks] = useState([]);
  

  const {
    register,
    handleSubmit,
    formState : {errors, ...formState}} 
    = useForm({
    resolver: zodResolver(cardTaskSchema),
  });

  const storedInputs = JSON.parse(localStorage.getItem('formInputs') || '{}');

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 636);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const onSubmit = (data) => {
    const newTask = { id: Date.now(), task: data.task, completed: false };
    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className={`h-screen bg-gradient-to-r font-poppins from-cyan-100 to-teal-200  animate-fade-up{${mobileView ? ' flex flex-col ' : 'flex flex-col'}`}>
      <div className='flex  flex-col justify-center items-center  p-4 rounded-xl gap-4 animate-fade animate-delay-300'>
        <div className="flex gap-2 text-xl mb-2 animate-fade-up">
          <img className="w-10 h-10" src={logo} alt="Logo" />
          <h1 className='text-teal-500'>To-do List</h1>
        </div>
        <div className="flex flex-col">
          <label className='text-teal-800 text-sm text-center font-regular mb-4'>Hi <span className="text-teal-400">{storedInputs.name}</span>, Add your new task to the <span className='text-teal-400'> {storedInputs.name_list} List</span></label>
        </div>
        <div className="flex flex-col h-10 mb-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mt-2">
                <label className='text-teal-800 text-sm font-regular mb-2'>Task:</label>
                  <div className='flex'>
                    <input
                      style={{color: '(#38b2ac)'}}
                      className={`appearance-none text-teal-800 leading-tight focus:outline-none rounded h-10 p-4 ${mobileView ? ' text-sm ml-0 min-w-[65vw]' : 'min-w-[40vw]'} border-2 border-gray-200 shadow-md focus:shadow-sm focus:border-teal-500`}
                      type="text"
                      name="task"
                      placeholder="New Task"
                      {...register('task')}
                    />
                     
                    <button
                      type="submit"
                      className={`flex justify-center ${mobileView ? 'text-sm ml-4' : 'ml-4'} items-center text-2xl text-gray-400 w-10 h-10 rounded-full shadow-sm border-2 border-gray-300 p-4 hover:bg-green-500 hover:text-white hover:border-none bg-gray-100 cursor-pointer`}
                    >
                      +
                    </button>
                  </div>
                  {errors.task && <p className="text-red-600 text-[10px] mt-2">{errors.task.message}</p>}
                </div>
                
            </form>
          </div>
          {tasks.map((task, index) => (
          <div>

            <div
              className={
                `p-4 
                break-words
                bg-white 
                rounded-xl 
                shadow-md border 
                border-gray-300 
                flex
                flex-col
                animate-fade 
                animate-delay-300 
                mt-8
                ${mobileView ? ' p-2 min-w-[80vw] justify-center ' : 'min-w-[40vw] mr-16'} 
                `
              }
              key={task.id}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="flex justify-between items-center gap-8 mb-4">
                <p className={`text-teal-800 ${task.completed ? 'line-through text-teal-300' : 'text-teal-900'}`}>{task.task}</p>
                <div className="flex">
                  {isHovered === index && (
                    <button
                      type="button"
                      title="delete"
                      onClick={() => handleDelete(task.id)}
                      className="relative flex justify-center items-center text-lg text-gray-400 w-8 h-8 rounded-full shadow-xl border-2 border-gray-300 p-4 hover:bg-red-500 hover:text-white hover:border-red-400 mr-2 bg-gray-100 cursor-pointer animate-fade-left"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                  <button
                    type="button"
                    name="completed"
                    id="completed"
                    onClick={() => handleTaskCompletion(task.id)}
                    className={`flex justify-center items-center text-lg ${task.completed ? ' bg-green-500 text-white border-green-400' : 'text-gray-400'} w-8 h-8 rounded-full shadow-xl border-2 border-gray-300 p-4 hover:bg-green-500 hover:text-white hover:border-green-400 bg-gray-100 cursor-pointer`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
                </div>
                
              </div>
          </div>
          ))}
      </div>
    </div>
  );
}

export default Tasks;
