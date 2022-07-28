import { Spinner } from '@components/Spinner';
import { PlusIcon } from '@heroicons/react/outline';
import { FolderIcon } from '@heroicons/react/solid';
import useCollection from '@hooks/useCollection';
import joinArgs from '@utils/joinArgs';
import { useLocation, useNavigate } from 'react-router-dom';
import { sidebarAnimation, sidebarStyles } from './sidebar.styles';

interface ISidebarItem {
  name: string;
  id: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Sidebar() {
  const collections = useCollection('get');
  const navigate = useNavigate();

  const navigateToCollection = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id;
    navigate(`collection/${id}`);
  };

  return (
    <div className={joinArgs(sidebarStyles.defaults)}>
      <div className={joinArgs(sidebarStyles.title)}>
        Collections
        <button
          className={joinArgs([
            sidebarStyles.addIcon,
            sidebarAnimation.addIcon,
          ])}
        >
          <PlusIcon width={20} height={20} />
        </button>
      </div>
      <div className={joinArgs(sidebarStyles.line)}></div>
      <section>
        {collections?.data ? (
          collections?.data.map((item) => {
            return (
              <Sidebar.Item
                key={item.id}
                name={item.title}
                id={item.id}
                onClick={navigateToCollection}
              />
            );
          })
        ) : (
          <div className={joinArgs(sidebarStyles.spinnerContainer)}>
            <Spinner.ThreeDots />
          </div>
        )}
      </section>
    </div>
  );
}

Sidebar.Item = function SidebarItem({ name, id, onClick }: ISidebarItem) {
  const location = useLocation();
  const matchPath = location.pathname.endsWith(id);
  return (
    <button
      className={joinArgs([sidebarStyles.items, sidebarAnimation.items]).concat(
        `${matchPath && joinArgs(sidebarStyles.active)}`
      )}
      data-id={id}
      onClick={onClick}
    >
      <FolderIcon
        width={18}
        height={18}
        style={{ color: '#6366f2', marginRight: '0.25em' }}
      />
      {name}
    </button>
  );
};
