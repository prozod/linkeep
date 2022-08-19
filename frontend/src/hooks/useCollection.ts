import { queryClient } from 'main';
import { useMutation, useQuery } from 'react-query';
import { ICollection, ICollectionDataResponse } from 'types/dataTypes';

const url =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_URL
    : import.meta.env.VITE_DEV_URL;

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
    case 'delete':
      return useMutation(
        async (
          data: Pick<ICollection, 'id'>
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
        },
        {
          onMutate: async (data: ICollection) => {
            console.log('delete collection data:', data);
            await queryClient.cancelQueries('getCollections');
            const prevUrlCollection =
              queryClient.getQueryData<ICollection>('getCollections');

            if (prevUrlCollection) {
              queryClient.setQueryData('getCollections', {
                prevUrlCollection,
              });
            }

            return { prevUrlCollection };
          },
          onError: (_err, _variables, context) => {
            if (context?.prevUrlCollection) {
              queryClient.setQueryData<ICollection>(
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
    case 'create':
      return useMutation(
        async (
          data: Pick<ICollection, 'title'>
        ): Promise<MutationActionType[typeof action]> => {
          try {
            const res = await fetch(`${url}/collection`, {
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
              'An error occured when creating a new collection',
              e as ErrorOptions
            );
          }
        },
        {
          onMutate: async (data: ICollection) => {
            await queryClient.cancelQueries('getCollections');
            const prevUrlCollection =
              queryClient.getQueryData<ICollection>('getCollections');

            if (prevUrlCollection) {
              queryClient.setQueryData<ICollection>('getCollections', {
                ...prevUrlCollection,
                ...data,
              });
            }

            return { prevUrlCollection };
          },
          onError: (_err, _variables, context) => {
            if (context?.prevUrlCollection) {
              queryClient.setQueryData<ICollection>(
                'getCollections',
                context?.prevUrlCollection
              );
            }
          },
          onSettled: () => {
            queryClient.invalidateQueries<ICollection>('getCollections');
          },
        }
      );
  }
};
export { useCollectionQuery, useCollectionMutation };
