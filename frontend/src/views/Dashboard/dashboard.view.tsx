import { Card } from '@components/Card';
import { Navigation } from '@components/Navigation';
import { Sidebar } from '@components/Sidebar';
import joinArgs from '@utils/joinArgs';
import { dashboardStyles } from './dashboard.styles';
import { Toolbar } from '@components/Toolbar';
import useCollection from '@hooks/useCollection';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Board } from '@components/Board';

const Dashboard = () => {
  const queryParamsId = useLocation().pathname.split('/')[3]?.trim();
  //TODO: this useCollection hook gets called even when you access /dashboard, even though it should only be implemented to fire when theres a queryParam
  // doesnt break the code, but it throws an error in server console + clientside console + unneccessary network requests
  const collection = useCollection('getById', queryParamsId);
  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem('access');

  useEffect(() => {
    localStorageToken === null && navigate('/');
  }, [localStorageToken]);

  return (
    <div className={joinArgs(dashboardStyles.wrapper)}>
      <Navigation />
      <div className={joinArgs(dashboardStyles.body)}>
        <Sidebar />
        <div className={joinArgs(dashboardStyles.content)}>
          {collection?.isSuccess ? (
            <Board key={collection?.data.id}>
              <Toolbar collection={collection?.data} />
              <Board.Title>
                <p>{collection?.data?.title}</p>
              </Board.Title>
              <Card.Wrapper>
                {collection?.data.items.map((item) => {
                  return <Card key={item} url={item} />;
                })}
              </Card.Wrapper>
            </Board>
          ) : (
            <Board.Empty />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
