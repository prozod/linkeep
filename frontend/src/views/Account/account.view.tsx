import { Button, buttonAnimations, buttonStyles } from '@components/Button';
import { Navigation } from '@components/Navigation';
import useCollection from '@hooks/useCollection';
import joinArgs from '@utils/joinArgs';
import { decodeB64 } from '@utils/parseUnix';
import { authServices } from '@views/Auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAccessTokenData } from 'types/dataTypes';
import { accountStyles } from './account.styles';

function Account() {
  const collections = useCollection('get');
  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem('access');

  console.log(collections?.data?.length);
  function getCurrentUser() {
    try {
      if (localStorageToken !== null) {
        return JSON.parse(
          decodeB64(localStorageToken?.split('.')[1])
        ) as IAccessTokenData;
      }
    } catch (e) {
      console.log('Account view Error:', e);
      localStorage.removeItem('access');
      navigate('/');
    }
  }

  const logout = () => {
    authServices.logoutUser();
    localStorage.removeItem('access');
    navigate('/');
    location.reload();
  };

  useEffect(() => {
    localStorageToken === null && navigate('/');
  }, [localStorageToken]);

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
              Email:{' '}
              <span className='text-white'>{getCurrentUser()?.email}</span>{' '}
            </p>
          </div>
          <div>
            <p className='text-slate-400 text-sm'>
              Collections:{' '}
              <span className='text-white'>
                {collections?.data?.length > 0 ? collections?.data?.length : 0}
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
