import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <></>,
      },
      {
        path: 'vehicle/:id',
        element: <></>,
      },
      {
        path: 'new',
        element: <></>,
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
