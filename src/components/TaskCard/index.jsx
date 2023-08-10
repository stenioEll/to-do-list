import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

function TaskCard({ task, index, isHovered, handleDelete, handleTaskCompletion, mobileView }) {
  return (
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
        mt-4
        ${mobileView ? ' p-2 min-w-[80vw] justify-center ' : 'min-w-[40vw] mr-16'} 
        `
      }
      key={task.id}
    >
      <div className="flex justify-between items-center gap-8 mb-4">
        <p className={`text-teal-800 ${task.completed ? 'line-through text-teal-300' : 'text-teal-900'}`}>{task.task}</p>
        <div className="flex">
            <button
              type="button"
              title="delete"
              onClick={() => handleDelete(task.id)}
              className="relative flex justify-center items-center text-lg text-gray-400 w-8 h-8 rounded-full shadow-xl border-2 border-gray-300 p-4 hover:bg-red-500 hover:text-white hover:border-red-400 mr-2 bg-gray-100 cursor-pointer animate-fade-left"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
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
  );
}

export default TaskCard;
