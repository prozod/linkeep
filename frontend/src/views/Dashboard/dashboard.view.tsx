import { Navigation } from '@components/Navigation';
import { Sidebar } from '@components/Sidebar';
import { useVerifyAuthToken } from '@hooks/useVerifyAuthToken';
import joinArgs from '@utils/joinArgs';
import { dashboardStyles } from './dashboard.styles';

const Dashboard = () => {
  const { isSuccess, isLoading, isError, data } = useVerifyAuthToken();

  return (
    <>
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
    </>
  );
};

export default Dashboard;
