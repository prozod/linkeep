const url = 'http://localhost:5000';

const authServices = {
  loginUser: async function <T>(data: T) {
    const res = await fetch(`${url}/users/login`, {
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

  logoutUser: async function () {
    await fetch(`${url}/users/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  registerUser: async function <T>(data: T) {
    await fetch(`${url}/users/register`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
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
        throw new Error('Something went wrong when refreshing the auth token.');
      }
      return resData;
    } catch (e: unknown) {
      localStorage.removeItem('isAuthenticated');
      console.error(e);
    }
  },
};

export default authServices;
