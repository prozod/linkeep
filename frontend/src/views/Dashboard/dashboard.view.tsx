import { Navigation } from '@components/Navigation';
import { Sidebar } from '@components/Sidebar';
import { useVerifyAuthToken } from '@hooks/useVerifyAuthToken';
import joinArgs from '@utils/joinArgs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardStyles } from './dashboard.styles';

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
              <p>Welcome to your dashboard, {data?.user.email}!</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
