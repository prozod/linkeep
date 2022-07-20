import joinArgs from '@utils/joinArgs';
import { modalStyles } from '@components/Modal';
import { useState } from 'react';

interface IModal {
  isOpen: boolean;
}

function Modal({ isOpen }: IModal) {
  const [openState, setOpenState] = useState(isOpen);
  function handleClickOutside(e: any) {
    if (e.currentTarget.dataset.name === 'background') {
      setOpenState(false);
    }
  }

  return (
    <>
      {isOpen ? (
        <div
          className={joinArgs(modalStyles.background)}
          data-name='background'
          onClick={handleClickOutside}
        >
          <div className={joinArgs(modalStyles.modal)}>
            <p>Modal here</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
