import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/checked.png'

import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

const cardTaskSchema = z.object({
  task: z.string()
  .nonempty('Task Name is required')
  .max(50, 'Task is too long')
  .refine(value => !value.trim().match(/^[!@#$%^&*()_+{}\]:;<>,.?~\\/\\-]/), {
    message: 'Task cannot start with with a special character'
  }),
});


function Tasks() {
  const [isHovered, setIsHovered] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit = (data) => {
    const newTask = { id: Date.now(), task: data.task, completed: false };
    setTasks([...tasks, newTask]);
    setTaskInput('');
    reset();
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

  const handleSort = () => {
    const sortedTasks = [...tasks].reverse();
    setTasks(sortedTasks);
  };

  const markAllCompleted = () => {
    const updatedTasks = tasks.map(task => ({ ...task, completed: true }));
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className={`flex flex-col  ${mobileView ? 'min-h-[100vh] overflow-x-hidden overflow-y-auto' : 'min-h-[100vh]'} bg-gradient-to-r font-poppins from-cyan-100 to-teal-200  animate-fade-up`}>
      <div className='flex  flex-col items-center  p-4 rounded-xl gap-4 animate-fade animate-delay-300'>
        <div className="flex gap-2 text-xl mb-2 animate-fade-up">
            <img className="w-10 h-10" src={logo} alt="Logo" />
            <h1 className='text-teal-500'>To-do List</h1>
        </div>
        <div className="flex flex-col">
          <label className='text-teal-800 text-sm text-center font-regular mb-4'>Hi <span className="text-teal-400">{storedInputs.name}</span>, Add your new task to the <span className='text-teal-400'> {storedInputs.name_list} List</span></label>
        </div>
        <TaskForm
          onSubmit={handleSubmit(onSubmit)}
          mobileView={mobileView}
          errors={errors}
          register={register}
        />
        {tasks.map((task, index) => (
          <TaskCard
            task={task}
            index={index}
            isHovered={setIsHovered}
            handleDelete={handleDelete}
            handleTaskCompletion={handleTaskCompletion}
            mobileView={mobileView}
            key={task.id}
            tasks={tasks} 
            setTasks={setTasks}
          />
        ))}
      <div className={`flex justify-center items-center  mb-8 ${mobileView ? 'flex flex-col' : ''} `}>
      { tasks.length >= 2 && (
        <div className='flex justify-center'>
            <button
              type="button"
              className={`mt-4 w-36 h-8 flex justify-center items-center border-gray-300 text-teal-700 p-4 hover:bg-green-500 hover:text-white hover:border-none bg-gray-100 cursor-pointer font-medium rounded-lg text-sm`}
              onClick={handleSort}
            >
              <FontAwesomeIcon icon={faClock} className='mr-2'/>
              Reorder
            </button>
        </div>
          )} { tasks.length > 0 && (
            <div className={`flex  ${mobileView? 'flex flex-col gap-0 ml-0' : 'gap-8 ml-8'}`}>
                <button
                  type="button"
                  className={`mt-4 border-gray-300 w-36 h-8 flex justify-center items-center text-teal-700 p-4 hover:bg-red-500 hover:text-white hover:border-none bg-gray-100 cursor-pointer font-medium rounded-lg text-sm`}
                  onClick={deleteAllTasks}
                >
                  <FontAwesomeIcon icon={faTrash} className='mr-2'/>
                  Delete all
                </button>
                <button
                type="button"
                className={`mt-4 border-gray-300 w-36 h-8 flex justify-center items-center text-teal-700 p-4 hover:bg-green-500 hover:text-white hover:border-none bg-gray-100 cursor-pointer font-medium rounded-lg text-sm`}
                onClick={markAllCompleted}
              >
                <FontAwesomeIcon icon={faCheck} className='mr-2'/>
                Complete all
              </button>
            </div>
          )}
      </div>
      </div>
    </div>
  );
}

export default Tasks;
