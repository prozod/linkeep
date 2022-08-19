import joinArgs from "@utils/joinArgs";
import { cardStyles } from "./card.styles";
import { XCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { ICollectionItem, ScrapeAPIRes } from "types/dataTypes";
import { useItemMutation } from "@hooks/useItem";
import { useQuery } from "react-query";
function Card(item: ICollectionItem) {
  const [isHovering, setIsHovering] = useState(false);
  const mutation = useItemMutation("delete");

  const url = import.meta.env.MODE === "production" ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_DEV_URL;

  const query = useQuery([`scrapeUrl, ${item.url}`], async (): Promise<ScrapeAPIRes> => {
    const res = await fetch(`${url}/scrape?url=${item.url}`);
    const data = await res.json();
    return data;
  });

  return (
    <>
      {query.isLoading && (
        <div className={joinArgs(cardStyles.skeleton_wrapper)}>
          <div className={joinArgs(cardStyles.skeleton_image)}></div>
          <div className={joinArgs(cardStyles.skeleton_info)}>
            <div className={joinArgs(cardStyles.skeleton_title)}></div>
            <div className={joinArgs(cardStyles.skeleton_text)}></div>
            <div className={joinArgs(cardStyles.skeleton_text)}></div>
          </div>
        </div>
      )}
      {query.isSuccess && (
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
          <div
            className={joinArgs(cardStyles.link_wrapper)}
            onClick={() => window.open(`${query?.data?.og.url}`, "_blank")}
          >
            <div className={joinArgs(cardStyles.link_image_container)}>
              <img
                className={joinArgs(cardStyles.link_image)}
                src={query?.data?.og?.image?.url}
                alt={query?.data?.og.title}
              />
            </div>
            <div className={joinArgs(cardStyles.link_info)}>
              <h1 className={joinArgs(cardStyles.link_title)}>{query?.data?.og.title}</h1>
              <p className={joinArgs(cardStyles.link_description)}>{query?.data?.og.description}</p>
              <p className={joinArgs(cardStyles.link_url)}>{query?.data?.og.url}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;

Card.Wrapper = function CardWrapper({ children }: { children: JSX.Element | React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2 lg:gap-4 transition-all">{children}</div>;
};
