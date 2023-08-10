import React from 'react';

function AddButton({ mobileView }) {
  return (
    <button
      type="submit"
      className={`flex justify-center ${mobileView ? 'text-sm ml-4' : 'ml-4'} items-center text-2xl text-gray-400 w-10 h-10 rounded-full shadow-sm border-2 border-gray-300 p-4 hover:bg-green-500 hover:text-white hover:border-none bg-gray-100 cursor-pointer`}
    >
      +
    </button>
  );
}

export default AddButton;