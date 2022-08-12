import { Form, formStyles } from '@components/Form';
import { Modal } from '@components/Modal';
import { Spinner } from '@components/Spinner';
import { PlusIcon } from '@heroicons/react/outline';
import { FolderIcon } from '@heroicons/react/solid';
import {
  useCollectionMutation,
  useCollectionQuery,
} from '@hooks/useCollection';
import useComponentVisible from '@hooks/useComponentVisible';
import joinArgs from '@utils/joinArgs';
import { createRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sidebarAnimation, sidebarStyles } from './sidebar.styles';

interface ISidebarItem {
  name: string;
  id: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Sidebar() {
  const collections = useCollectionQuery('get');
  const mutation = useCollectionMutation('create');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const modalRef = createRef<HTMLDivElement>();
  const [newCollectionName, setNewCollectionName] = useState('');
  useComponentVisible(modalRef, setShowModal);

  const navigateToCollection = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id;
    navigate(`collection/${id}`);
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    // creat mutation
    e.preventDefault();
    mutation?.mutate({ title: newCollectionName });
    setNewCollectionName('');
    setShowModal(false);
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
          onClick={() => setShowModal(true)}
        >
          <PlusIcon width={20} height={20} />
        </button>
      </div>
      <div className={joinArgs(sidebarStyles.line)}></div>
      <section>
        {collections?.isLoading && (
          <div className={joinArgs(sidebarStyles.spinnerContainer)}>
            <Spinner.ThreeDots />
          </div>
        )}
        {collections?.data !== undefined && collections?.data?.length > 0 ? (
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
          <div className='text-center py-4 text-slate-600 text-sm'>
            <p>No collections available</p>
          </div>
        )}
      </section>
      {
        <Modal open={showModal} ref={modalRef}>
          <Form onSubmit={onSubmit} className='flex-row'>
            <div className={joinArgs([formStyles.labelandInputWrapper])}>
              <Form.Input
                type='text'
                placeholder=' '
                name='collectionname'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewCollectionName(e.currentTarget.value)
                }
              />
              <Form.Label htmlFor='collectionname'>Collection name</Form.Label>
            </div>
            <Form.Button>Create</Form.Button>
          </Form>
        </Modal>
      }
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
