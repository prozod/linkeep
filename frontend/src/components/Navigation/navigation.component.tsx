import joinArgs from '@utils/joinArgs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { accountServices } from '@views/Account';
import LogoLinkeep from '../../../assets/logo.svg';

//icons + styling + motion
import { animation, styles } from './navigation.styles';
import { useEffect, useState } from 'react';
import { useVerifyAuthToken } from '@hooks/useVerifyAuthToken';
import { CogIcon, HomeIcon, LogoutIcon } from '@heroicons/react/solid';

const { Wrapper, Items, Logo } = styles;

function Navigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);

  const token = useVerifyAuthToken();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (token.isSuccess && token?.data !== 'undefined') {
      localStorage.setItem('access', token?.data?.access);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('access');
      setIsAuthenticated(false);
    }
  }, [token]);

  const logout = () => {
    accountServices.logoutUser();
    localStorage.removeItem('access');
    navigate('/');
    location.reload();
  };
  return (
    <div>
      <nav className={joinArgs(Wrapper)}>
        <div className={joinArgs(Logo)}>
          <img src={LogoLinkeep} width={32} height={32} className='mr-2' />
          <button onClick={() => navigate('/')}>Linkeep</button>
          <span className='bg-gradient-to-r from-blue-700 to-indigo-800 shadow-sm text-white text-[0.5em] w-[fit-content] uppercase rounded-md ml-2 px-2 font-bold'>
            ALPHA VERSION
          </span>
        </div>
        {pathname !== '/dashboard' ? (
          <>
            <div className={joinArgs(Items)}>
              {isAuthenticated && (
                <Link
                  to='dashboard'
                  className={joinArgs([animation.Item, styles.Item])}
                >
                  Dashboard
                </Link>
              )}
              <Link
                to='/extensions'
                className={joinArgs([animation.Item, styles.Item])}
              >
                Extensions
              </Link>
              <Link
                to='/faq'
                className={joinArgs([animation.Item, styles.Item])}
              >
                Frequently Asked Questions
              </Link>
            </div>
            <div className={joinArgs(Items)}>
              {!isAuthenticated && (
                <Link
                  to='auth'
                  className={joinArgs([
                    'bg-transparent  border-[1px] border-white  rounded-full py-2 px-4 hover:scale-95 transition-all hover:bg-white hover:text-slate-900',
                  ])}
                >
                  Create account
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  to=''
                  onClick={logout}
                  className={joinArgs([
                    'bg-transparent  border-[1px] border-white  rounded-full py-2 px-4 hover:scale-95 transition-all hover:bg-white hover:text-slate-900',
                  ])}
                >
                  Log out
                </Link>
              )}
            </div>
          </>
        ) : (
          <div className={joinArgs(styles.dashboardNavIcons)}>
            <Link to='/' className={joinArgs([styles.Logo, animation.Logo])}>
              <HomeIcon width={20} height={20} />
            </Link>
            <Link
              to='/account'
              className={joinArgs([animation.Logo, styles.Logo])}
            >
              <CogIcon width={20} height={20} />
            </Link>
            <Link
              to=''
              onClick={logout}
              className={joinArgs([animation.Logo, styles.Logo])}
            >
              <LogoutIcon width={20} height={20} />
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navigation;
