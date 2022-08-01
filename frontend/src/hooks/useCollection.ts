import { queryClient } from 'main';
import { useMutation, useQuery } from 'react-query';
import { ICollectionDataResponse, ICollectionItem } from 'types/dataTypes';
const url = 'http://localhost:5000';

interface QueryActionType {
  get: ICollectionDataResponse[];
  getById: ICollectionDataResponse;
}

interface MutationActionType {
  update: ICollectionDataResponse;
  delete: null;
  create: null;
}

const useCollectionQuery = <T extends keyof QueryActionType>(
  action: T,
  id?: string
) => {
  switch (action) {
    case 'get':
      return useQuery(
        'getCollections',
        async (): Promise<QueryActionType[typeof action]> => {
          try {
            const res = await fetch(`${url}/collection`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const resData = await res.json();
            return resData;
          } catch (e: unknown) {
            throw new Error(
              'An error occured when fetching collections.',
              e as ErrorOptions
            );
          }
        }
      );

    case 'getById':
      return useQuery(
        ['getCollectionById', id],
        async (): Promise<QueryActionType[typeof action]> => {
          try {
            const res = await fetch(`${url}/collection/${id}`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const resData = await res.json();
            return resData;
          } catch (e: unknown) {
            throw new Error(
              'An error occured when fetching the collection.',
              e as ErrorOptions
            );
          }
        }
      );
  }
};

const useCollectionMutation = <T extends keyof MutationActionType>(
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
                  items: [...prevUrlCollection.items, data],
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
          data: ICollectionItem
        ): Promise<MutationActionType[typeof action]> => {
          try {
            const res = await fetch(`${url}/collection`, {
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
        }
      );
  }
};
export { useCollectionQuery, useCollectionMutation };
