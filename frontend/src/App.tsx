//state and fetching
import { ReactQueryDevtools } from 'react-query/devtools';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default App;
