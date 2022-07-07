import { Sidebar } from '@components/Sidebar';
import { useVerifyAuthToken } from '@hooks/useVerifyAuthToken';
import joinArgs from '@utils/joinArgs';
import { styles } from './dashboard.styles';

const Dashboard = () => {
  const { isLoading, isError, data } = useVerifyAuthToken();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>There was an error.</span>;
  }

  return (
    <div className={joinArgs(styles.body)}>
      <Sidebar />
      <div className={joinArgs(styles.content)}>
        <p>Welcome to your dashboard, {data?.user.email}!</p>
      </div>
    </div>
  );
};

export default Dashboard;
