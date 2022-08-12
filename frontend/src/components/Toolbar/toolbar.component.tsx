import { Form, formStyles } from '@components/Form';
import { Modal } from '@components/Modal';
import { DotsCircleHorizontalIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';
import useComponentVisible from '@hooks/useComponentVisible';
import { useItemMutation } from '@hooks/useItem';
import joinArgs from '@utils/joinArgs';
import { createRef, useState } from 'react';
import { ICollectionDataResponse } from 'types/dataTypes';
import { toolbarStyles } from './toolbar.styles';

const Toolbar = ({ collection }: { collection: ICollectionDataResponse }) => {
  const mutation = useItemMutation('update');
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState<string>('');
  const modalRef = createRef<HTMLDivElement>();

  useComponentVisible(modalRef, setShowModal);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation?.mutate({ url: url, collectionId: collection?.id });
    setUrl('');
    setShowModal(false);
  };

  return (
    <div className={joinArgs(toolbarStyles.wrapper)}>
      <input
        type='text'
        placeholder='Search...'
        className={joinArgs(toolbarStyles.input)}
      />
      <div className={joinArgs(toolbarStyles.tools)}>
        <>
          <button
            className={joinArgs(toolbarStyles.iconWrapper)}
            onClick={() => setShowModal(true)}
          >
            <PlusIcon
              width={24}
              height={24}
              className={joinArgs(toolbarStyles.icon)}
            />
            Add bookmark
          </button>
          {modalRef && (
            <Modal open={showModal} ref={modalRef}>
              <Form onSubmit={onSubmit} className='flex-row'>
                <div className={joinArgs([formStyles.labelandInputWrapper])}>
                  <Form.Input
                    type='text'
                    placeholder=' '
                    name='url'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUrl(e.currentTarget.value)
                    }
                  />
                  <Form.Label htmlFor='url'>URL</Form.Label>
                </div>
                <Form.Button>Add</Form.Button>
              </Form>
            </Modal>
          )}
        </>
        <button
          className={joinArgs(toolbarStyles.iconWrapper)}
          onClick={() => alert('Feature not implemented yet, coming soon.')}
        >
          <DotsCircleHorizontalIcon
            width={24}
            height={24}
            className={joinArgs(toolbarStyles.icon)}
          />
          Sorting
        </button>
      </div>
    </div>
  );
};

// <Form>
// <Form.Input />
// <Form.Label>URL</Form.Label>
// </Form>
export default Toolbar;
