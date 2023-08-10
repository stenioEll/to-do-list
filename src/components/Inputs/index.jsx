import React from 'react';

const InputField = ({ label, id, type, placeholder, register, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className='text-teal-800 text-sm'>{label}:</label>
      <input
        style={{color: '(#38b2ac)'}}
        className={`appearance-none leading-tight focus:outline-none rounded h-10 p-4 text-gray-800 border border-teal-100 shadow-md focus:shadow-sm focus:border-teal-500`}
        id={id}
        type={type}
        name={id}
        placeholder={placeholder}
        {...register(id)}
      />
      <div className="text-gray-600 text-[10px]">
        {errors[id] && <p>{errors[id].message}</p>}
      </div>
    </div>
  );
};

export default InputField;