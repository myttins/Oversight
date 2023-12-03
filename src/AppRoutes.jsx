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
// import NewPerson from './pages/person/NewPerson';
import AllPayments from './pages/payments/AllPayments';
import Schedules from './pages/payments/schedules/Schedules';
import { useLogin } from './contexts/LoginContext';
import Vehicle from './pages/vehicle/Vehicle';
import VehicleInfo from './pages/vehicle/vehicleInfo/VehicleInfo';
import { MessageBanner, MessageBannerProvider } from './contexts/MessageBannerContext';
import NewVehiclePayment from './pages/vehicle/vehiclePayments/VehiclePaymentsNew';
import VehiclePaymentsContainer from './pages/vehicle/vehiclePayments/VehiclePaymentsContainer';
import NewVehicle from './pages/vehicle/vehicleInfo/NewVehicle';
import Loading from './util/Loading';
const NewVehicleSchedule = lazy(() => import('./pages/vehicle/vehiclePayments/VehicleScheduleManage'));
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
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <ProtectedRoute>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className='flex flex-1'>
        <Sidebar isVisible={sidebarVisible} toggleVisible={setSidebarVisible} />

        <MessageBannerProvider>
          {/* To make the main layout resize dynamically, add ${sidebarVisible ? 'ml-64' : 'ml-0'} to main */}
          <main className={`flex justify-center relative overflow-auto transition-all duration-300 p-4 w-full`}>
            {sidebarVisible ? (
              <div
                className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-1'
                onClick={toggleSidebar}
              ></div>
            ) : null}
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
    <Suspense
      fallback={
        <div className='p-4 bg-white m-4'>
          <Loading />
        </div>
      }
    >
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
          <Route path='vehicle/new' element={<NewVehicle />} />
          <Route path='vehicle/new-insurer' element={<AddInsurer />} />
          <Route path='/vehicle/:id' element={<Vehicle />}>
            <Route index element={<Navigate replace to='info' />} />
            <Route path='info' element={<VehicleInfo />} />
            <Route path='new-schedule' element={<NewVehicleSchedule />} />
            <Route path='payments' element={<VehiclePaymentsContainer />} />
            <Route path='payments/new' element={<NewVehiclePayment />} />
          </Route>
          {/* <Route path='people/new' element={<NewPerson />} /> */}
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
