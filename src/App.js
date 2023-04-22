import { React, useEffect } from "react";
import { Admin } from "react-admin";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import { authProvider } from "./authProvider/authProvider";
import { Resource } from "react-admin";
import forms from "./components/forms";
import { dataProvider } from "./dataProvider/dataProvider";

import "./App.css";

const App = () => {

  useEffect(() => {
    const checkToken = async () => {
      try {
        const refreshTokenResponse = await fetch("/api/user/refresh");
        if (refreshTokenResponse.ok) {
          const resultRefreshTokenResponse = await refreshTokenResponse.json();

          if(resultRefreshTokenResponse.data.accessToken !== undefined){
            localStorage.setItem("token", resultRefreshTokenResponse.data.accessToken);
          }
        }
      } catch (error) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    };
    if (localStorage.getItem("token")) {
      checkToken();
    }
  }, []);

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={Login}
    >
      {(permissions) => (
        <>
          {permissions === "Admin" ? (
            <>
              <Resource name="form" {...forms} />
            </>
          ) : null}
        </>
      )}
    </Admin>
  );
};

export default App;
