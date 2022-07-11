import { Navigation } from '@components/Navigation';
import { Spinner } from '@components/Spinner';
import { useVerifyAuthToken } from '@hooks/useVerifyAuthToken';
import joinArgs from '@utils/joinArgs';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styles } from './account.styles';

const Account = () => {
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
    <div className={joinArgs(styles.body)}>
      <Navigation />
      {isLogged ? (
        <Spinner text="Hold on, we're getting your data..." />
      ) : (
        <div className={joinArgs(styles.greetingmodal_wrapper)}>
          <h1 className={joinArgs(styles.greetingmodal_wrapper_title)}>
            Welcome to Linkeep
          </h1>
          <p>It looks like you are not logged in!</p>
          <div className={joinArgs(styles.greetingmodal_wrapper_buttons)}>
            <button
              className={joinArgs(styles.greetingmodal_wrapper_button)}
              onClick={() => navigate('/auth/login')}
            >
              Log In
            </button>
            <button className={joinArgs(styles.greetingmodal_wrapper_button)}>
              Register
            </button>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Account;
