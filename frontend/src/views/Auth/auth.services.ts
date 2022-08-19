import { SuccessfulAuthResponse } from '@hooks/useAuth';

const url =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PROD_URL
    : import.meta.env.VITE_DEV_URL;

console.log('AUTH URL: ', url);
console.log('MODE: ', import.meta.env.MODE);

const authServices = {
  loginUser: async function <T>(data: T): Promise<T | SuccessfulAuthResponse> {
    const res = await fetch(`${url}/users/login`, {
      method: 'POST',
      // credentials: 'same-origin',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  logoutUser: async function () {
    await fetch(`${url}/users/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  registerUser: async function <T>(
    data: T
  ): Promise<T | SuccessfulAuthResponse> {
    const res = await fetch(`${url}/users/register`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  checkAuthToken: async function () {
    try {
      const res = await fetch(`${url}/token`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resData = await res.json();
      if (resData.issues) {
        localStorage.removeItem('isAuthenticated');
        throw new Error('Something went wrong when refreshing the auth token.');
      }
      return resData;
    } catch (e: unknown) {
      console.error(e);
    }
  },
};

export default authServices;
