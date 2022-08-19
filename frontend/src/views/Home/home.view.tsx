import { Button, buttonAnimations, buttonStyles } from '@components/Button';
import { Navigation } from '@components/Navigation';
import joinArgs from '@utils/joinArgs';
import { useNavigate } from 'react-router-dom';
import { homeStyles } from './home.styles';

function Home() {
  const navigate = useNavigate();

  return (
    <div className={joinArgs(homeStyles.hero)}>
      <div className='w-1/2 h-1/2 bg-indigo-600 blur-[200px] rounded-full opacity-20 absolute left-[50%] top-[50%]'></div>
      <div className='w-1/2 h-1/2 bg-blue-600 blur-[200px] rounded-full opacity-20 absolute right-[50%] top-[50%]'></div>
      <div className='w-1/6 h-1/6 bg-violet-800 blur-[150px] rounded-full opacity-30 absolute right-[50%] top-0'></div>
      <Navigation />
      <section className={joinArgs(homeStyles.hero_wrapper)}>
        <div className={joinArgs(homeStyles.hero_content)}>
          <h1 className={joinArgs(homeStyles.hero_text)}>
            Quick and easy way to manage your favorite webpages.
          </h1>
          <p className={joinArgs(homeStyles.hero_phrase)}>
            Combine your bookmarks from different browsers into one storage unit
            that you can organize and explore from anywhere. Made for page
            hoarders and the painfully disorganized people.
          </p>
          <div className='flex flex-col space-x-0 space-y-4 lg:space-y-0 lg:space-x-4 mt-12 lg:flex-row'>
            <Button
              className={joinArgs([
                buttonAnimations.heroCTA,
                buttonStyles.heroCTA,
              ])}
              onClick={() => {
                navigate('/auth/register');
              }}
            >
              Try it out now!
            </Button>
            <Button
              className={joinArgs([
                buttonAnimations.heroCTA,
                buttonStyles.hero,
              ])}
              onClick={() => {
                navigate('/auth/login');
              }}
            >
              Already have an account?
            </Button>
          </div>
        </div>
      </section>
      <footer className='w-full flex justify-center items-center sm:px-4 py-4 lg:px-8 border-t-[1px] border-white border-opacity-20 z-10'>
        <div className='m-auto  flex justify-between px-2 w-full opacity-70 font-thin text-xs'>
          <p>Linkeep © Copyright 2022</p>
          <a
            href='https://github.com/t0ux'
            target='_blank'
            rel='noreferrer noopener'
          >
            Made by TOUX &copy; 2022
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
