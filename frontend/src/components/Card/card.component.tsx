import joinArgs from '@utils/joinArgs';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { cardStyles } from './card.styles';
import { XCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';

interface ICard {
  url: string;
}

function Card({ url }: ICard) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={joinArgs(cardStyles.container)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <XCircleIcon
          width={36}
          height={36}
          className='absolute shadow-lg z-10 right-[-10px] bottom-[-10px] text-indigo-500 animate-pulse transition-all hover:animate-none'
          onClick={() => console.log('X GOT CLICKED!')}
        />
      )}
      <LinkPreview
        url={url}
        width={300}
        height={250}
        imageHeight={150}
        primaryTextColor='#ffffff'
        secondaryTextColor='#64748b'
        descriptionLength={75}
        showPlaceholderIfNoImage
        openInNewTab
        backgroundColor='#1e293b'
        borderColor='#334155'
      />
    </div>
  );
}

export default Card;
