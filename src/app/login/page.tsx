'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import Link from 'next/link';
import DogPic from 'public/images/dog.jpg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { account } from '@/appwriteConfig';
import { useAuth } from '@/utils/AuthContext';

interface FormInput {
  email: string;
  password: string;
}

const ErrorMissing = ({ element }: { element: string }) => (
  <p className='text-[--clr-primary-01] font-bold'>Woof! Missing {element}!</p>
);

export default function Login() {
  const router = useRouter();
  const { user, setUser }: any = useAuth();
  const [loading, setLoading] = useState(false);
  const [pwError, setPwError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    setLoading(true);
    createEmailSession(data.email, data.password);
  };

  // Create login session with email
  const createEmailSession = async (email: string, password: string) => {
    try {
      let sessionResponse = await account.createEmailSession(email, password);

      if (sessionResponse) {
        setUser(sessionResponse);
        redirect('/home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      {!user ? (
        <div className='sm:grid sm:grid-cols-2 mb-8 sm:mb-0'>
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
                <label>Email</label>
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
                    Bark Bark! Missing an email!
                  </p>
                )}
              </div>
              <div className='py-2'>
                <label>Password</label>
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
                    Arf! Password too short!
                  </p>
                )}
              </div>
              <div className='flex items-center my-8 relative'>
                <button
                  type='submit'
                  className='bg-[--clr-primary-01] px-4 py-2 w-1/2 mx-auto sm:ml-0 rounded-lg hover:opacity-80 transition'
                >
                  Login!
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
            </div>
            <Link href={'/'}>
              <p className='hover:text-[--clr-primary-01] transition'>
                Return to home ⇨{' '}
              </p>
            </Link>
          </form>
        </div>
      ) : (
        redirect('/home')
      )}
    </main>
  );
}
