import React from 'react';
import { z } from 'zod';
import InputField from '../Inputs';
import logo from "../../assets/checked.png"

export const cardSchema = z.object({
  name: z.string()
    .min(2, 'At least 2 characters')
    .max(100, 'Task is too long')
    .nonempty('Name is required')
    .refine(value => !value.trim().match(/^[!@#$%^&*()_+{}\]:;<>,.?~\\/\\-]/), {
      message: 'Name cannot start with with a special character'
    }),
  name_list: z.string()
    .nonempty('To-do List Name is required')
    .refine(value => !value.trim().match(/^[!@#$%^&*()_+{}\]:;<>,.?~\\/\\-]/), {
      message: 'Name List cannot start with with a special character'
    }),
});

function HomeForm({ onSubmit, mobileView, errors, register }) {
  
  return (
    <div className="bg-gradient-to-r from-cyan-200 to-cyan-400 flex flex-col justify-center items-center gap-8 animate-fade-up">
      <form onSubmit={onSubmit}>
          <div className='w-84 h- p-8 bg-white rounded-xl shadow-md flex flex-col gap-4 animate-fade animate-delay-300'>
            <div className="flex justify-center items-center gap-2 text-xl mb-84animate-fade-up">
              <img className="w-10 h-10" src={logo} alt="Logo" />
              <h1 className='text-teal-500'>To-do List</h1>
            </div>
            <div className="flex flex-col gap-2">
              <InputField
                label="Name"
                id="name"
                type="text"
                placeholder="Name"
                register={register}
                errors={errors}
              />
              <InputField
                label="To-do List Name"
                id="name_list"
                type="text"
                placeholder="To-do List Name"
                register={register}
                errors={errors}
              />
              <button type="submit" className="mt-4 focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                Register
              </button>
            </div>
          </div>
        </form>
    </div>
  );
}

export default HomeForm;