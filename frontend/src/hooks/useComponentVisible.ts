import React, { useEffect } from 'react';

const useComponentVisible = (
  ref: React.RefObject<HTMLElement>,
  setState: (state: React.SetStateAction<boolean>) => void
) => {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // take into account what the current ref is and if the thing we clicked on is not that ref, close the modal.
      if (ref.current && !ref.current.contains(e.target as Node)) {
        console.log(ref.current.contains(e.target as Node));
        setState(false);
      }
    }

    document.addEventListener(
      'keydown',
      (e) => e.key == 'Escape' && setState(false),
      true
    );
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener(
        'keydown',
        (e) => e.key == 'Escape' && setState(false),
        true
      );
    };
  }, [ref]);
};

export default useComponentVisible;
