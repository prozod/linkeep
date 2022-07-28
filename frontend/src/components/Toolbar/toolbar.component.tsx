import { Form, formStyles } from '@components/Form';
import { Modal } from '@components/Modal';
import { DotsCircleHorizontalIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';
import useComponentVisible from '@hooks/useComponentVisible';
import joinArgs from '@utils/joinArgs';
import { createRef, useState } from 'react';
import { ICollectionDataResponse } from 'types/dataTypes';
import { toolbarStyles } from './toolbar.styles';

const Toolbar = ({ collection }: { collection: ICollectionDataResponse }) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = createRef<HTMLDivElement>();
  useComponentVisible(modalRef, setShowModal);
  console.log(collection);

  function handleAdd() {
    setShowModal(true);
  }

  return (
    <div className={joinArgs(toolbarStyles.wrapper)}>
      <input
        type='text'
        placeholder='Search...'
        className={joinArgs(toolbarStyles.input)}
      />
      <div className={joinArgs(toolbarStyles.tools)}>
        <button
          className={joinArgs(toolbarStyles.iconWrapper)}
          onClick={handleAdd}
        >
          <PlusIcon
            width={24}
            height={24}
            className={joinArgs(toolbarStyles.icon)}
          />
          Add bookmark
        </button>
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
      {modalRef && (
        <Modal open={showModal} ref={modalRef}>
          {/*ugly, style it*/}
          <p className='mb-8'>Create a new entry into {collection?.title} </p>
          <Form>
            <div className={joinArgs(formStyles.labelandInputWrapper)}>
              <Form.Input type='text' placeholder=' ' name='url' />
              <Form.Label htmlFor='url'>URL</Form.Label>
            </div>
            <Form.Button>Add</Form.Button>
          </Form>
        </Modal>
      )}
    </div>
  );
};

// <Form>
// <Form.Input />
// <Form.Label>URL</Form.Label>
// </Form>
export default Toolbar;
