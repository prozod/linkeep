import joinArgs from '@utils/joinArgs';
import { cardStyles } from './card.styles';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

interface ICard {
  url: string;
}

function Card({ url }: ICard) {
  return (
    <div className={joinArgs(cardStyles.container)}>
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
