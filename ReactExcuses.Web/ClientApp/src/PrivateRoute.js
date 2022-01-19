import React from 'react';
import {useAuthDataContext} from './AuthContext.js';
import LoginPage from './pages/Login';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component, ...options }) => {
    const { user } = useAuthDataContext();
    const finalComponent = user ? component : LoginPage;
  
    return <Route {...options} component={finalComponent} />;
  };

  export default PrivateRoute;