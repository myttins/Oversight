import React from 'react';
import { createRoot } from 'react-dom/client';
import MainContainer from './MainContainer';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Vehicle from './Components/Vehicle';
import Root from './RootContainer';
import NewVehicle from './Components/NewVehicle';

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
                path: 'vehicle/:id',
                element: <Vehicle />
            },
            {
                path: 'new',
                element: <NewVehicle />
            }

        ]
    }
])

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
