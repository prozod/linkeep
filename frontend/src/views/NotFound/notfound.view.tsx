import { Link, useParams } from 'react-router-dom';

function NotFound() {
  const params = useParams();
  return (
    <div className='bg-slate-900 text-white h-screen flex justify-center items-center flex-col'>
      <div>
        <div className='mb-12'>
          <h1 className='text-3xl font-bold mb-2'>
            <span className='text-gray-500'>[404]:</span> There was an error!
          </h1>
          <p className='text-xs rounded-sm w-[fit-content] bg-red-500 py-2 px-4'>
            Woops! It looks like the page{' '}
            <span className='font-bold'>/{params['*']}</span> doesn't exist.
          </p>
        </div>
        <div className='space-x-2 text-sm font-light'>
          <Link
            to='/'
            className='rounded-lg text-sm bg-gradient-to-r from-indigo-700 to-blue-800 text-white px-8 py-4 transition-all shadow-lg border-[1px] border-indigo-500 hover: scale-95'
          >
            Go home
          </Link>
          <Link
            to='/dashboard'
            className='rounded-lg text-sm bg-transparent border-[1px] border-white text-white px-8 py-4 transition-all shadow-lg hover: scale-95'
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
