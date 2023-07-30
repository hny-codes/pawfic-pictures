'use client';

import Image from 'next/image';
import Link from 'next/link';
import DogPic from 'public/images/dog.jpg';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormInput {
  email: string;
  username: string;
  password: string;
  favorite: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <main>
      <div className='sm:grid sm:grid-cols-2'>
        <Image
          src={DogPic}
          alt='dog picture'
          className='max-h-[65vh] sm:max-h-max sm:order-1 sm:h-screen object-cover '
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='text-[--clr-text] text-center mt-8 px-8 sm:place-self-center sm:text-left'
        >
          <h1 className='text-3xl'>Login</h1>
          <div className='flex flex-col mt-8 max-w-[15rem] sm:w-full mx-auto'>
            <label>Email*</label>
            <input {...register('email')} className='text-black' />
            <label>Username*</label>
            <input {...register('username')} className='text-black' />
            <label>Password*</label>
            <input {...register('password')} className='text-black' />
            <label>Favorite Dog Breed</label>
            <input {...register('favorite')} className='text-black' />
            <button
              type='submit'
              className='mt-8 bg-[--clr-primary-01] px-4 py-2 rounded-lg hover:opacity-80 transition'
            >
              Create!
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
