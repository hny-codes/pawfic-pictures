'use client';

import { redirect, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/utils/AuthContext';
import { account } from '@/appwriteConfig';
import { useRandomDog } from '@/utils/getRandomDog';

export default function Home() {
  const router = useRouter();
  const { user, setUser }: any = useAuth();
  const { data, isLoading, mutate } = useRandomDog();

  // Remove all active sessions
  const removeSession = async () => {
    router.push('/');
    const session = await account.deleteSessions();
    setUser(null);
    console.log('Removed all sessions!: ', session);
  };

  const handleNewDog = () => {
    mutate();
  };

  return (
    <>
      {user ? (
        <main>
          <div className='text-white flex flex-col sm:grid sm:grid-cols-[1fr_1.5fr]'>
            <div className='px-8 py-4 sm:order-1 sm:px-2 sm:mr-2'>
              <div className='relative border-4 border-[--clr-primary-01] rounded-lg h-[60vh] sm:h-[80vh]'>
                {data && (
                  <Image
                    src={`${data?.message}`}
                    alt='dog image'
                    fill={true}
                    sizes='80vh'
                    className='object-cover'
                  />
                )}
                {isLoading && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    viewBox='0 0 24 24'
                    className='absolute left-1/2 top-1/2'
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
                )}
              </div>
            </div>
            <div className='text-center sm:mt-4 sm:flex sm:flex-col sm:justify-center'>
              <div className='bg-[--clr-primary-02] rounded-lg py-4 w-[90%] mx-auto'>
                <h1 className='font-bold text-2xl mb-4'>
                  Welcome, {user.name}!
                </h1>
                <h2>
                  User since:{' '}
                  {`${new Date(user.$createdAt).toLocaleDateString()}`}
                </h2>
                <small>{user.email}</small>
              </div>
              <div className='p-8 flex gap-4'>
                <button
                  className='button bg-[--clr-accent]'
                  onClick={handleNewDog}
                >
                  New Doggo!
                </button>
                <button className='button' onClick={removeSession}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </main>
      ) : (
        redirect('/login')
      )}
    </>
  );
}
