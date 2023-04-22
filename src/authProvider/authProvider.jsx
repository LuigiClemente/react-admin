// in src/authProvider.ts
export const authProvider = {
  // called when the user attempts to log in
  login: ({ login, password }) => {
    const request = new Request(`${process.env.REACT_APP_URL}api/user/login`, {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "include",
    });

    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(async ({data}) => {  
        localStorage.setItem("token", data.accessToken);
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },

  logout: async() => {
    localStorage.removeItem("token");

    const request = new Request(`${process.env.REACT_APP_URL}api/user/logout`, {
      method: "POST",
      body: null,
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "include",
    });

    return fetch(request)
    .then(async (response) => {
      return response.status >= 200 && response.status < 300 ? Promise.resolve() : Promise.reject();
    }).catch(() => {
      throw new Error("Network error");
    });
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  getIdentity: () =>
  Promise.resolve(null),

  getPermissions: () => {
    return Promise.resolve("Admin");
  },
};
