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
    const res = await fetch(`${url}/users/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resData = res.json();
    return resData;
  },

  registerUser: async function <T>(data: T) {
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

  checkAuthToken: async function () {
    const res = await fetch(`${url}/token`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resData = res.json();
    return resData;
  },
};

export default authServices;
