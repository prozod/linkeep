import joinArgs from '@utils/joinArgs';
import ReactDOM from 'react-dom';
import { modalStyles } from '@components/Modal';
import { forwardRef } from 'react';

interface IModal {
  open: boolean;
  elementId?: string;
  children: JSX.Element | React.ReactNode;
}

const createWrapperAndAppendToBody = (elementId: string) => {
  const newElement = document.createElement('div');
  newElement.setAttribute('id', elementId);
  document.body.appendChild(newElement);
  return newElement;
};

const Modal = forwardRef(
  (
    { open, elementId = 'modal-portal', children }: IModal,
    ref: React.ForwardedRef<HTMLDivElement | null>
  ) => {
    if (!open) return null;

    const element = document.getElementById(elementId);
    if (!element) {
      createWrapperAndAppendToBody(elementId);
    }

    return ReactDOM.createPortal(
      <div
        className={joinArgs(modalStyles.background)}
        data-id='modal-background'
      >
        <div className={joinArgs(modalStyles.modal)} data-id='modal' ref={ref}>
          {children}
        </div>
      </div>,
      document.getElementById(elementId) as HTMLElement // we know this will always be an HTMLElement so we type assert it as one, since getElementById can return null || HTMLElement.
    );
  }
);

Modal.displayName = 'Modal';
export default Modal;
