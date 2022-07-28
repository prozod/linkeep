import { useMutation, useQuery } from 'react-query';
import { ICollectionDataResponse } from 'types/dataTypes';
const url = 'http://localhost:5000';

interface Action {
  update: null;
  delete: null;
  create: null;
  get: ICollectionDataResponse[];
  getById: ICollectionDataResponse;
}

const collectionServices = {
  updateCollection: async function <T>(data: T) {
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
  },

  createCollection: async function <T>(data: T) {
    const res = await fetch(`${url}/users/register`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const resData = res.json();
    return resData;
  },
};

const useCollection = <T extends keyof Action>(action: T, id?: string) => {
  switch (action) {
    case 'get':
      return useQuery(
        'getCollections',
        async (): Promise<Action[typeof action]> => {
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
        async (): Promise<Action[typeof action]> => {
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
export default useCollection;
