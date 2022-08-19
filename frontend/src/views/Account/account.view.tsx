import { Button, buttonAnimations, buttonStyles } from '@components/Button';
import { Navigation } from '@components/Navigation';
import { useCollectionQuery } from '@hooks/useCollection';
import useCookieAccessData from '@hooks/useCookieAccessData';
import joinArgs from '@utils/joinArgs';
import { authServices } from '@views/Auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountStyles } from './account.styles';

function Account() {
  const collections = useCollectionQuery('get');
  const navigate = useNavigate();
  const data = useCookieAccessData({ cookie: 'access', idx: 1 });

  console.log('[Account View]: useCookieAccessData: ', data);

  const logout = () => {
    authServices.logoutUser();
    localStorage.removeItem('access');
    navigate('/');
    location.reload();
  };

  useEffect(() => {
    localStorage.getItem('isAuthenticated') === null ||
      (localStorage.getItem('isAuthenticated') === 'undefined' &&
        navigate('/'));
  }, []);

  return (
    <main className={joinArgs(accountStyles.wrapper)}>
      <Navigation />
      <section className={joinArgs(accountStyles.body)}>
        <div className={joinArgs(accountStyles.container)}>
          <div>
            <p className='font-bold border-b-2 border-indigo-500 border-solid mb-2'>
              Acccount overview
            </p>
            <p className='text-slate-400 text-sm'>
              Email:
              <span className='text-white'>
                {data !== null && data.email}
              </span>{' '}
            </p>
          </div>
          <div>
            <p className='text-slate-400 text-sm'>
              Collections:{' '}
              <span className='text-white'>
                {collections?.data !== undefined &&
                collections?.data?.length > 0
                  ? collections?.data?.length
                  : 0}
              </span>
            </p>
          </div>
          <div className={joinArgs(accountStyles.buttonContainer)}>
            <Button
              className={joinArgs([
                buttonStyles.accountContainer,
                buttonAnimations.accountContainer,
              ])}
              onClick={() => {
                navigate('/dashboard');
              }}
            >
              Dashboard
            </Button>
            <Button
              className={joinArgs([
                buttonStyles.accountContainer,
                buttonAnimations.accountContainer,
              ])}
              onClick={logout}
            >
              Log out
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Account;
