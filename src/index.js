import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Home from './containers/Home';
import New from './containers/New';
import Vehicle from './containers/Vehicle';
import Search from './containers/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
