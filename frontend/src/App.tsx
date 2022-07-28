//state and fetching
import useVerifyAuthToken from '@hooks/useVerifyAuthToken';
import { useEffect } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Outlet } from 'react-router-dom';

function App() {
  const token = useVerifyAuthToken();

  useEffect(() => {
    if (token.isSuccess && token?.data !== 'undefined') {
      localStorage.setItem('access', token?.data?.access);
    } else {
      localStorage.removeItem('access');
    }
  }, [token]);

  return (
    <>
      <Outlet />
      {
        // <ReactQueryDevtools initialIsOpen />
      }
    </>
  );
}

export default App;
