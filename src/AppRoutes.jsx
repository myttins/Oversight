import React, { lazy, Suspense, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet, Route, Routes } from 'react-router';
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
import { AllVehicles } from './pages/vehicle/AllVehicles';
const Search = lazy(() => import('./pages/vehicle/Search'));
import AddInsurer from './pages/vehicle/vehicleInfo/AddInsurer';
import Login from './pages/login/LoginPage';
import Error from './util/error/Error';
import Navbar from './util/navbars/Navbar';
import Sidebar from './util/navbars/Sidebar';
import NewPerson from './pages/person/NewPerson';
import AllPayments from './pages/payments/AllPayments';
import Schedules from './pages/payments/schedules/Schedules';
import { useLogin } from './contexts/LoginContext';
import Vehicle from './pages/vehicle/Vehicle';
import VehicleInfo from './pages/vehicle/vehicleInfo/VehicleInfo';
import VehiclePayments from './pages/vehicle/vehiclePayments/VehiclePayments';
import { MessageBanner, MessageBannerProvider } from './contexts/MessageBannerContext';
import NewPayment from './pages/vehicle/vehiclePayments/NewVehiclePayment';
import NewVehiclePayment from './pages/vehicle/vehiclePayments/NewVehiclePayment';
const NewSchedule = lazy(() => import('./pages/payments/schedules/NewSchedule'));




const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useLogin();

  if (!isLoggedIn) {
    // Redirect to the login page if not logged in
    return <Navigate to='/login' replace />;
  }

  return children;
};

const MainLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <ProtectedRoute>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className='flex flex-1'>
        <Sidebar isVisible={sidebarVisible} />
        <MessageBannerProvider>
          <main
            className={`flex justify-center relative overflow-auto transition-all duration-300 p-4 w-full ${
              sidebarVisible ? 'ml-64' : 'ml-0'
            }`}
          >
            <div className='w-full max-w-[900px] min-w-[500px] overflow-auto'>
              <MessageBanner />
              <Outlet />
            </div>
          </main>
        </MessageBannerProvider>
      </div>
    </ProtectedRoute>
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='vehicle' element={<Vehicle />}>
            <Route path='vehicle/info' element={<AllVehicles />} />
            <Route path='vehicle/payments' element={<AllVehicles />} />
          </Route>
          <Route path='vehicle/all' element={<AllVehicles />} />
          <Route path='vehicle/search' element={<Search />} />
          <Route path='vehicle/new-insurer' element={<AddInsurer />} />
          <Route path='/vehicle/:id' element={<Vehicle />}>
            <Route index element={<Navigate replace to='info' />} />
            <Route path='info' element={<VehicleInfo />} />
            <Route path='payments' element={<VehiclePayments />} />
            <Route path='payments/new' element={<NewVehiclePayment />} />
          </Route>
          <Route path='people/new' element={<NewPerson />} />
          <Route path='payments/all' element={<AllPayments />} />
          <Route path='payments/schedules' element={<Schedules />} />
          <Route path='payments/schedules/new' element={<NewSchedule />} />
          <Route path='*' element={<Error status={404} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
