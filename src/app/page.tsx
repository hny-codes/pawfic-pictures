import Image from 'next/image';
import Link from 'next/link';
import DogPic from 'public/images/dog.jpg';

export default function Home() {
  return (
    <main>
      <div className='sm:grid sm:grid-cols-2'>
        <Image
          src={DogPic}
          alt='dog picture'
          className='animate-dogHero max-h-[65vh] sm:max-h-max sm:order-1 sm:h-screen object-cover '
        />
        <div className='text-[--clr-text] text-center mt-8 px-8 sm:place-self-center sm:text-left'>
          <h1 className='italic text-3xl sm:text-6xl'>Love Dogs?</h1>
          <h2 className='text-sm sm:text-lg mt-4'>We do too! Get your dog dosage here</h2>
          <Link href={'/login'}>
            <button className='mt-8 bg-[--clr-primary-01] px-4 py-2 rounded-lg hover:opacity-80 transition'>
              Join us!
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
