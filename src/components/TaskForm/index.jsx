import React from 'react';
import AddButton from '../Buttons/AddButton';

function TaskForm({ onSubmit, mobileView, errors, register }) {
  return (
    <form onSubmit={onSubmit}>
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
          <AddButton/>
        </div>
        {errors.task && <p className="text-gray-600 text-[10px] mt-2">{errors.task.message}</p>}
      </div>
    </form>
  );
}

export default TaskForm;