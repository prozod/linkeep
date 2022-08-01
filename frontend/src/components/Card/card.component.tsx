import joinArgs from "@utils/joinArgs";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { cardStyles } from "./card.styles";
import { XCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useCollectionMutation } from "@hooks/useCollection";
import { ICollectionItem } from "types/dataTypes";

function Card(item: ICollectionItem) {
  const [isHovering, setIsHovering] = useState(false);
  const mutation = useCollectionMutation("delete");

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
          className="absolute shadow-lg z-10 right-[-10px] bottom-[-10px] text-indigo-500 animate-pulse transition-all hover:animate-none"
          onClick={() => {
            console.log(item?.id);
            mutation?.mutate({
              id: item?.id,
              collectionId: item?.collectionId,
              url: item?.url,
            });
          }}
        />
      )}
      <LinkPreview
        url={item.url}
        width={300}
        height={250}
        imageHeight={150}
        primaryTextColor="#ffffff"
        secondaryTextColor="#64748b"
        descriptionLength={75}
        showPlaceholderIfNoImage
        openInNewTab
        backgroundColor="#1e293b"
        borderColor="#334155"
      />
    </div>
  );
}

export default Card;

Card.Wrapper = function CardWrapper({ children }: { children: JSX.Element | React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2 lg:gap-4 transition-all">{children}</div>;
};
