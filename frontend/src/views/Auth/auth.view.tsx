import { Navigation } from '@components/Navigation';
import joinArgs from '@utils/joinArgs';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authStyles } from './auth.styles';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated')) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className={joinArgs(authStyles.wrapper)}>
      <Navigation />
      <div className={joinArgs(authStyles.body)}>
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

        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
