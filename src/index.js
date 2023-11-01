import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Home from './containers/Home';
import Vehicle from './vehicles/Vehicle'
import Search from './containers/Search';
import Error from './error/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error status={404}/>,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'vehicle/:id',
        element: <Vehicle />,
      },
      // {
      //   path: 'new',
      //   element: <New id='new'/>,
      // },
      {
        path: 'search',
        element: <Search />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
