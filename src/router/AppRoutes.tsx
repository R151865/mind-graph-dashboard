import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import Login from '../components/Login/Login';
import DashboardLayout from '../components/Layout/DashboardLayout';
import UserData from '../components/UserData/UserData';
import UserList from '../components/UserList/UserList';
import CardsList from '../components/CardsList/CardsList';
import NotFound from '../components/Reusable/NotFound/NotFound';
import Header from '../components/Header/Header';

import { getToken } from '../utils/cookies';

// Ensure getToken function has proper typing, returning string | null
const token = getToken();

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />

        {token ? (
          <>
            <Route
              path="/"
              element={
                <DashboardLayout>
                  <CardsList />
                </DashboardLayout>
              }
            />

            <Route
              path="users"
              element={
                <DashboardLayout>
                  <UserList />
                </DashboardLayout>
              }
            />

            <Route
              path="users/:id"
              element={
                <DashboardLayout>
                  <UserData />
                </DashboardLayout>
              }
            />

            <Route
              path="*"
              element={
                <div>
                  <Header />
                  <NotFound />
                </div>
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
