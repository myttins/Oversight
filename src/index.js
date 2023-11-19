import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Search from './pages/search/Search';
import Error from './error/Error';
import Login from './pages/login/LoginPage';
import VehicleContainer from './pages/vehicle/VehicleContainer';
import AllVehicles from './pages/vehicle/AllVehicles';
import Dashboard from './pages/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error status={404} />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: 'vehicle',
        children: [
          { index: true, element: <AllVehicles /> },
          {
            path: ':id',
            element: <VehicleContainer />,
          },
        ],
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: '*',
        element: <Error status={404} />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error status={404} />,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
