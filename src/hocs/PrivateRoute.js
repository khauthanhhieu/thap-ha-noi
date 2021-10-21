import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { pending, isSignedIn } = useAuth()
  
  if(pending) {
    return null
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        isSignedIn
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  )
}

export default PrivateRoute
