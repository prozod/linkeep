import { Card } from '@components/Card';
import { Navigation } from '@components/Navigation';
import { Sidebar } from '@components/Sidebar';
import { useVerifyAuthToken } from '@hooks/useVerifyAuthToken';
import joinArgs from '@utils/joinArgs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardStyles } from './dashboard.styles';
import collectionDat from '../../components/Card/data.json';
import { Toolbar } from '@components/Toolbar';

const Dashboard = () => {
  const { isSuccess, isLoading, isError, data } = useVerifyAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    console.log('checking for auth token');
    if (!token) {
      console.log('NOT ALLOWED');
      navigate('/');
    }
  }, [data]);

  return (
    <div className={joinArgs(dashboardStyles.wrapper)}>
      <Navigation />
      <div className={joinArgs(dashboardStyles.body)}>
        {isLoading && <span>Loading...</span>}

        {isError && <span>There was an error.</span>}
        {isSuccess && (
          <>
            <Sidebar />
            <div className={joinArgs(dashboardStyles.content)}>
              <Toolbar />
              {collectionDat && (
                <h1 className='pt-2 pb-4 text-lg'>
                  Viewing items from the&nbsp;
                  <span className='font-bold'>
                    {collectionDat.collection}
                  </span>{' '}
                  collection
                </h1>
              )}
              <div className='flex flex-wrap items-center gap-2 lg:gap-4 transition-all'>
                {collectionDat
                  ? collectionDat.items.map((data) => {
                      return <Card key={data} url={data} />;
                    })
                  : null}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
