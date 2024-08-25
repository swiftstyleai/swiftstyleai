/**
 * @note
 * for hook alternative of route element composition:
 * - https://reactrouter.com/docs/en/v6/upgrading/v5#use-useroutes-instead-of-react-router-config
 * - https://reactrouter.com/docs/en/v6/examples/route-objects
 *
 * might need to take notes on:
 * - https://reactrouter.com/docs/en/v6/upgrading/v5#note-on-link-to-values
 */

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import RequireAuth from '@/components/auth/RequireAuth';
import Page404 from '@/pages/404';
import PageSignIn from '@/pages/signin';
import Home from '@/pages/home';

import type { PathRouteProps } from 'react-router-dom';
import LoadingScreen from '@/components/loading';

const routes: Array<PathRouteProps> = [
  {
    path: '/signin',
    element: <PageSignIn />,
  },
];

const privateRoutes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
];

const Routings = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<LoadingScreen />}>
          {routes.map((routeProps) => (
            <Route {...routeProps} key={routeProps.path as string} />
          ))}
          {privateRoutes.map(({ element, ...privateRouteProps }) => (
            <Route
              element={
                <RequireAuth
                  redirectTo={`/signin?redirectTo=${privateRouteProps.path}`}
                >
                  {element}
                </RequireAuth>
              }
              {...privateRouteProps}
              key={`privateRoute-${privateRouteProps.path}`}
            />
          ))}
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routings;
