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
const NewPerson = lazy(() => import('./pages/vehicle/vehicleInfo/NewPerson.jsx'));
import AllPayments from './pages/payments/AllPayments';
import Schedules from './pages/payments/schedules/Schedules';
import { useLogin } from './contexts/LoginContext';
import Vehicle from './pages/vehicle/Vehicle';
import VehicleInfo from './pages/vehicle/vehicleInfo/VehicleInfo';
import { MessageBanner, MessageBannerProvider } from './contexts/MessageBannerContext';
import NewVehiclePayment from './pages/vehicle/vehiclePayments/VehiclePaymentsNew';
import VehiclePaymentsContainer from './pages/vehicle/vehiclePayments/VehiclePaymentsContainer';
import NewVehicle from './pages/vehicle/NewVehicle';
import Loading from './util/Loading';
import VehicleInsuranceContainer from './pages/vehicle/vehicleInsurance/VehicleInsuranceContainer';
import PersonInfo from './pages/person/PersonInfo';
const VehicleScheduleManage = lazy(() => import('./pages/vehicle/vehiclePayments/VehicleScheduleManage'));
const NewSchedule = lazy(() => import('./pages/payments/schedules/NewSchedule'));
const Person = lazy(() => import('./pages/person/Person'));

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
      <MessageBannerProvider>
        <Navbar toggleSidebar={toggleSidebar} />
        {/* <MessageBanner /> */}
        <div className='flex flex-1'>
          <Sidebar isVisible={sidebarVisible} toggleVisible={setSidebarVisible} />

          {/* To make the main layout resize dynamically, add ${sidebarVisible ? 'ml-64' : 'ml-0'} to main */}
          <main className={`flex justify-center relative overflow-scroll transition-all duration-300 w-full`}>
            {sidebarVisible ? (
              <div
                className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-1'
                onClick={toggleSidebar}
              ></div>
            ) : null}
            <div className='w-full max-w-[1280px] min-w-[480px] overflow-scroll'>
              <Outlet />
            </div>
          </main>
        </div>
      </MessageBannerProvider>
    </ProtectedRoute>
  );
};

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className='box-white'>
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='vehicle/all' element={<AllVehicles />} />
          <Route path='vehicle/search' element={<Search />} />
          <Route path='vehicle/new' element={<NewVehicle />} />
          <Route path='vehicle/new-insurer' element={<AddInsurer />} />
          <Route path='/vehicle/:id' element={<Vehicle />}>
            <Route index element={<Navigate replace to='info' />} />
            <Route path='info' element={<VehicleInfo />} />
            <Route path='new-person' element={<NewPerson />} />
            <Route path='insurance' element={<VehicleInsuranceContainer />} />

            {/* TODO change route name to manage instead of new-schedule */}
            <Route path='new-schedule' element={<VehicleScheduleManage />} />
            <Route path='payments' element={<VehiclePaymentsContainer />} />
            <Route path='payments/new' element={<NewVehiclePayment />} />
          </Route>
          <Route path='person/:id' element={<Person />}>
            <Route index element={<PersonInfo />} />
          </Route>
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
