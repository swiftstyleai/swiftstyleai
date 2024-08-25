import Debug from 'debug';
import { useUser } from '@/contexts/auth/AuthProvider';
import React from 'react';
import { Navigate } from 'react-router-dom';

const debug = Debug('popup:components:auth:RequireAuth');

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const RequireAuth = ({
  children,
  redirectTo = '/signin',
}: PrivateRouteProps) => {
  // add your own authentication logic here
  const { user } = useUser();

  debug(user);

  const isAuthenticated = !!user;

  return isAuthenticated ? (
    (children as React.ReactElement)
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RequireAuth;
