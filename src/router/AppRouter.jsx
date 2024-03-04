import React, { useContext } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import SignInPage from '../modules/auth/SignInPage';
import AuthContext from '../config/context/auth-context';
import AdminLayout from '../components/layout/AdminLayout';

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  const routesFromRole = () => {
    const userRole = user?.roles[0]?.name;

    if (userRole === 'ADMIN_ROLE') {
      return (
        <Route
          path="/admin"
          element={
            <>
              {user.user.person?.name +
                ' ' +
                user.user.person?.surname +
                `${user.user.person?.lastname ?? ''}` +
                ' - ' +
                userRole}
            </>
          }
        />
      );
    } else if (userRole === 'CLIENT_ROLE') {
      return (
        <Route
          path="/client"
          element={
            <>
              {user.user.person?.name +
                ' ' +
                user.user.person?.surname +
                `${user.user.person?.lastname ?? ''}` +
                ' - ' +
                userRole}
            </>
          }
        />
      );
    } else if (userRole === 'USER_ROLE') {
      return (
        <Route
          path="/user"
          element={
            <>
              {user.user.person?.name +
                ' ' +
                user.user.person?.surname +
                `${user.user.person?.lastname ?? ''}` +
                ' - ' +
                userRole}
            </>
          }
        />
      );
    } else {
      
      return null;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {user.signed ? (
          <>
            <Route path="/" element={<AdminLayout />}>
              {routesFromRole()}
              <Route path="dashboard" element={<>Dashboard</>} />
              <Route path="users" element={<>Users</>} />
              <Route path="products" element={<>Products</>} />
            </Route>
          </>
        ) : (
          <Route path="/" element={<SignInPage />} />
        )}
        <Route path="/*" element={<>404 not found</>} />
      </>
    )
  );


  return <RouterProvider router={router} />;
};

export default AppRouter;
