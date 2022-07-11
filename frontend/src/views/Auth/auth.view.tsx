import { Navigation } from '@components/Navigation';
import { Spinner } from '@components/Spinner';
import { useVerifyAuthToken } from '@hooks/useVerifyAuthToken';
import joinArgs from '@utils/joinArgs';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authStyles } from './auth.styles';

const Auth = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { isLoading } = useVerifyAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access')) {
      setIsLogged(true);
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className={joinArgs(authStyles.wrapper)}>
      <Navigation />
      <div className={joinArgs(authStyles.body)}>
        {isLogged ? (
          <Spinner text="Hold on, we're getting your data..." />
        ) : (
          <div className={joinArgs(authStyles.greetingmodal_wrapper)}>
            <h1 className={joinArgs(authStyles.greetingmodal_wrapper_title)}>
              Welcome to Linkeep
            </h1>
            <p>It looks like you are not logged in!</p>
            <div className={joinArgs(authStyles.greetingmodal_wrapper_buttons)}>
              <button
                className={joinArgs(authStyles.greetingmodal_wrapper_button)}
                onClick={() => navigate('/auth/login')}
              >
                Log In
              </button>
              <button
                className={joinArgs(authStyles.greetingmodal_wrapper_button)}
                onClick={() => navigate('/auth/register')}
              >
                Register
              </button>
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
