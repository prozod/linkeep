import { DotsCircleHorizontalIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';
import joinArgs from '@utils/joinArgs';
import { toolbarStyles } from './toolbar.styles';

function Toolbar() {
  return (
    <div className={joinArgs(toolbarStyles.wrapper)}>
      <input
        type='text'
        placeholder='Search...'
        className={joinArgs(toolbarStyles.input)}
      />
      <div className={joinArgs(toolbarStyles.tools)}>
        <p className={joinArgs(toolbarStyles.iconWrapper)}>
          <PlusIcon
            width={24}
            height={24}
            className={joinArgs(toolbarStyles.icon)}
          />
          Add bookmark
        </p>
        <p className={joinArgs(toolbarStyles.iconWrapper)}>
          <DotsCircleHorizontalIcon
            width={24}
            height={24}
            className={joinArgs(toolbarStyles.icon)}
          />
          Sorting
        </p>
      </div>
    </div>
  );
}

export default Toolbar;
