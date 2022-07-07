import { styles } from '@components/CollectionItem';
import { FolderIcon } from '@heroicons/react/solid';
import joinArgs from '@utils/joinArgs';

interface IColItem {
  name: string;
}

const CollectionItem = ({ name }: IColItem) => {
  return (
    <div className={joinArgs(styles.wrapper)}>
      <span>
        <FolderIcon width={18} height={18} style={{ color: '#6366f2' }} />
      </span>
      <p>{name}</p>
    </div>
  );
};

export default CollectionItem;
