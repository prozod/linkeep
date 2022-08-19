import { queryClient } from 'main';
import { useMutation } from 'react-query';
import { ICollectionDataResponse, ICollectionItem } from 'types/dataTypes';

const url =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_URL
    : import.meta.env.VITE_DEV_URL;

interface MutationActionType {
  update: ICollectionDataResponse;
  delete: null;
  create: null;
}

export const useItemMutation = <T extends keyof MutationActionType>(
  action: T
) => {
  switch (action) {
    case 'update':
      return useMutation(
        async (
          data: Pick<ICollectionItem, 'collectionId' | 'url'>
        ): Promise<MutationActionType[typeof action]> => {
          try {
            const res = await fetch(`${url}/collection/item`, {
              method: 'POST',
              // credentials: 'same-origin',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            const resData = res.json();
            return resData;
          } catch (e: unknown) {
            throw new Error(
              'An error occured when updating the collection',
              e as ErrorOptions
            );
          }
        },

        {
          onMutate: async (data: ICollectionItem) => {
            await queryClient.cancelQueries([
              'getCollectionById',
              `${data.collectionId}`,
            ]);
            const prevUrlCollection =
              queryClient.getQueryData<ICollectionDataResponse>([
                'getCollectionById',
                `${data.collectionId}`,
              ]);

            if (prevUrlCollection) {
              queryClient.setQueryData<ICollectionDataResponse>(
                ['getCollectionById', `${data.collectionId}`],
                {
                  ...prevUrlCollection,
                  items: [...(<[]>prevUrlCollection.items), data],
                }
              );
            }

            return { prevUrlCollection };
          },
          onError: (_err, _variables, context) => {
            if (context?.prevUrlCollection) {
              queryClient.setQueryData<ICollectionDataResponse>(
                ['getCollectionById', `${context.prevUrlCollection.id}`],
                context?.prevUrlCollection
              );
            }
          },
          onSettled: (data) => {
            queryClient.invalidateQueries<ICollectionDataResponse>([
              'getCollectionById',
              `${data?.id}`,
            ]);
          },
        }
      );
    case 'delete':
      return useMutation(
        async (
          data: Pick<ICollectionItem, 'id'>
        ): Promise<MutationActionType[typeof action]> => {
          try {
            const res = await fetch(`${url}/collection/item`, {
              method: 'DELETE',
              // credentials: 'same-origin',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            const resData = res.json();
            return resData;
          } catch (e: unknown) {
            throw new Error(
              'An error occured when updating the collection',
              e as ErrorOptions
            );
          }
        },
        {
          onMutate: async (data: ICollectionItem) => {
            console.log(data);
            await queryClient.cancelQueries([
              'getCollectionById',
              `${data.collectionId}`,
            ]);
            const prevUrlCollection =
              queryClient.getQueryData<ICollectionDataResponse>([
                'getCollectionById',
                `${data.collectionId}`,
              ]);

            if (prevUrlCollection) {
              queryClient.setQueryData<ICollectionDataResponse>(
                ['getCollectionById', `${data.collectionId}`],
                {
                  ...prevUrlCollection,
                  items: prevUrlCollection?.items?.filter(
                    (item) => item.id !== data.id
                  ),
                }
              );
            }

            return { prevUrlCollection };
          },
          onError: (_err, _variables, context) => {
            if (context?.prevUrlCollection) {
              queryClient.setQueryData<ICollectionDataResponse>(
                ['getCollectionById', `${context.prevUrlCollection.id}`],
                context?.prevUrlCollection
              );
            }
          },
          onSettled: (data) => {
            queryClient.invalidateQueries<ICollectionDataResponse>([
              'getCollectionById',
              `${data?.id}`,
            ]);
          },
        }
      );
  }
};
