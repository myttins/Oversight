import React from 'react';
import { createRoot } from 'react-dom/client';
import MainContainer from './MainContainer';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Vehicle from './Components/Vehicle';
import Root from './RootContainer';

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: 'home',
                element: <MainContainer />
            },
            {
                path: 'vehicle',
                element: <Vehicle />
            }
        ]
    }
])

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
