import { CollectionItem } from '@components/CollectionItem';
import { PlusIcon } from '@heroicons/react/outline';
import joinArgs from '@utils/joinArgs';
import { styles } from './sidebar.styles';

const { defaults, title, line, items } = styles;

export default function Sidebar() {
  return (
    <div className={joinArgs(defaults)}>
      <div className={joinArgs(title)}>
        Collections
        <button>
          <PlusIcon width={20} height={20} />
        </button>
      </div>
      <div className={joinArgs(line)}></div>
      <div className={joinArgs(items)}>
        <CollectionItem name='Online courses' />
      </div>
    </div>
  );
}
