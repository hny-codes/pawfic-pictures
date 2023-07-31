'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DogPic from 'public/images/dog.jpg';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  database,
  account,
  USERS_DATABASE,
  USERS_COLLECTION,
} from '@/appwriteConfig';
import { ID } from 'appwrite';

interface FormInput {
  email: string;
  username: string;
  password: string;
  favorite: string;
}

const ErrorMissing = ({ element }: { element: string }) => (
  <p className='text-[--clr-primary-01] font-bold'>Woof! Missing {element}!</p>
);

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [accError, setAccError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    setLoading(true);
    createUser(data.email, data.username, data.password, data.favorite);
  };

  const createUser = async (
    email: string,
    username: string,
    password: string,
    breed: string
  ) => {
    const userId = ID.unique();

    try {
      // Auth user creation
      let userResponse = await account.create(
        userId,
        email,
        password,
        username
      );

      // Document creation
      let payload = {
        email,
        userId: userResponse.$id,
        username,
        password,
        fav_breed: breed,
      };

      let documentResponse = await database.createDocument(
        USERS_DATABASE,
        USERS_COLLECTION,
        ID.unique(),
        payload
      );

      console.log('USER');
      console.log(userResponse);

      console.log('DOCUMENT');
      console.log(documentResponse);

      if (userResponse.status === true) {
        // Redirect user to home
        router.push('/home');
      }
    } catch (error: any) {
      if (error.code === 409) {
        setLoading(false);
        setAccError(true);
      }
    }
  };

  return (
    <main>
      <div className='sm:grid sm:grid-cols-2 mb-8'>
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
            <div className='py-2'>
              <label>Email *</label>
              <input
                {...register('email', {
                  required: true,
                  pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                })}
                className='text-black input-field'
                placeholder='jane1@bark.com'
              />
              {/* Validate missing field */}
              {errors.email?.type === 'required' && (
                <ErrorMissing element='email' />
              )}
              {/* Validate email pattern */}
              {errors.email?.type === 'pattern' && (
                <p className='text-[--clr-primary-01] font-bold'>
                  Bark Bark! Not an email!
                </p>
              )}
            </div>
            <div className='py-2'>
              <label>Username *</label>
              <input
                {...register('username', {
                  required: true,
                })}
                className='text-black input-field'
                placeholder='Jane'
              />
              {/* Validate missing field */}
              {errors.username?.type === 'required' && (
                <ErrorMissing element='username' />
              )}
            </div>
            <div className='py-2'>
              <label>Password *</label>
              <input
                type='password'
                {...register('password', {
                  required: true,
                  minLength: 8,
                })}
                className='text-black input-field'
                placeholder='Minimum: 8 characters'
              />
              {/* Validate missing field */}
              {errors.password?.type === 'required' && (
                <ErrorMissing element='password' />
              )}
              {/* Validate short password */}
              {errors.password?.type === 'minLength' && (
                <p className='text-[--clr-primary-01] font-bold'>
                  Arf! Password too short! 6+
                </p>
              )}
            </div>
            <div className='py-2'>
              <label>Favorite Dog Breed</label>
              <input
                {...register('favorite')}
                className='text-black input-field'
                placeholder='Husky'
              />
            </div>
            <div className='flex items-center my-8 relative'>
              <button
                type='submit'
                className='bg-[--clr-primary-01] px-4 py-2 w-1/2 mx-auto sm:ml-0 rounded-lg hover:opacity-80 transition'
              >
                Create!
              </button>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 24 24'
                className={`ml-2 ${
                  loading ? 'block' : 'hidden'
                } absolute right-4 sm:left-1/2 sm:right-1/2`}
              >
                <path
                  fill='currentColor'
                  d='M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z'
                >
                  <animateTransform
                    attributeName='transform'
                    dur='0.75s'
                    repeatCount='indefinite'
                    type='rotate'
                    values='0 12 12;360 12 12'
                  />
                </path>
              </svg>
            </div>
            <div
              className={`${
                accError ? 'flex' : 'hidden'
              } gap-4 items-center bg-[--clr-accent] rounded-lg px-4 py-2 animate-notif`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 100 100'
              >
                <path
                  fill='currentColor'
                  d='m91.17 81.374l.006-.004l-.139-.24c-.068-.128-.134-.257-.216-.375l-37.69-65.283c-.611-1.109-1.776-1.87-3.133-1.87c-1.47 0-2.731.887-3.285 2.153l-.004-.002L9.312 80.529l.036.021a3.553 3.553 0 0 0-.82 2.257a3.59 3.59 0 0 0 3.588 3.59h75.767a3.59 3.59 0 0 0 3.589-3.589c0-.511-.11-.994-.302-1.434zm-41.135-1.757c-2.874 0-5.201-2.257-5.201-5.13c0-2.874 2.326-5.2 5.201-5.2c2.803 0 5.13 2.325 5.13 5.2a5.123 5.123 0 0 1-5.13 5.13zm5.13-45.367v28.299h-.002l.002.016c0 1.173-.95 2.094-2.094 2.094l-.014-.001v.001h-6.093c-1.174 0-2.123-.921-2.123-2.094l.002-.016h-.002V34.326c-.001-.026-.008-.051-.008-.077c0-1.117.865-1.996 1.935-2.078v-.016h6.288v.001c1.149.007 2.074.897 2.103 2.039h.005v.055h.001z'
                />
              </svg>
              <h1>This email is already in use!</h1>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
