//state and fetching
import useCookieAccessData from '@hooks/useCookieAccessData';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Outlet } from 'react-router-dom';

export function isUserAuthenticated() {
  const localStorageAuthItem = localStorage.getItem('isAuthenticated');
  return localStorageAuthItem === undefined || localStorageAuthItem === null
    ? false
    : true;
}

function App() {
  useCookieAccessData({ cookie: 'access', idx: 1 });
  return (
    <>
      <Outlet />
      {
        //<ReactQueryDevtools initialIsOpen />
      }
    </>
  );
}

export default App;
