import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const RutaPrivada = ({ component: Component, ...rest }) => {
  const cookie = new Cookies();
  return (
    <Route
      {...rest}
      render={(props) =>
        cookie.get('sesion') ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default RutaPrivada;
