import { Navigation } from '@components/Navigation';
import { Spinner } from '@components/Spinner';
import { useVerifyAuthToken } from '@hooks/useVerifyAuthToken';
import joinArgs from '@utils/joinArgs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountStyles } from './account.styles';

function Account() {
  const { isSuccess, isLoading, isError, data } = useVerifyAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    console.log('checking for auth token /account');
    if (!token) {
      console.log('NOT ALLOWED');
      navigate('/');
    }
  }, [data]);
  return (
    <>
      <Navigation />
      <section className={joinArgs(accountStyles.wrapper)}>
        {isLoading && <Spinner />}
        {isSuccess && (
          <div className={joinArgs(accountStyles.container)}>
            <h1>
              Logged in as <span>{data.user.email}</span>
            </h1>
          </div>
        )}
      </section>
    </>
  );
}

export default Account;
