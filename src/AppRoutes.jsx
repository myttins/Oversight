import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet, Route, Routes } from 'react-router';
import Dashboard from './pages/dashboard/Dashboard';
import { AllVehicles } from './pages/vehicle/AllVehicles';
import Search from './pages/vehicle/Search';
import AddInsurer from './pages/vehicle/insurer/AddInsurer';
import VehicleContainer from './pages/vehicle/VehicleContainer';
import Login from './pages/login/LoginPage';
import Error from './util/error/Error';
import Navbar from './util/navbars/Navbar';
import Sidebar from './util/navbars/Sidebar';
import NewPerson from './pages/person/NewPerson';
import Payments from './pages/payments/Payments';
import Schedules from './pages/payments/Schedules';
import { useLogin } from './contexts/LoginContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useLogin();

  if (!isLoggedIn) {
    // Redirect to the login page if not logged in
    return <Navigate to="/login" replace />;
  }

  return children;
};

const MainLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <ProtectedRoute>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar isVisible={sidebarVisible} />
          <main
            className={`flex justify-center relative overflow-auto transition-all duration-300 p-4 w-full ${
              sidebarVisible ? 'ml-64' : 'ml-0'
            }`}
          >
            <div className="w-full border max-w-[900px] min-w-[500px] overflow-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </ProtectedRoute>
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="vehicle" element={<AllVehicles />} />
        <Route path="vehicle/search" element={<Search />} />
        <Route path="vehicle/new-insurer" element={<AddInsurer />} />
        <Route path="vehicle/:id" element={<VehicleContainer />} />
        <Route path="payments/all" element={<Payments />} />
        <Route path="payments/schedules" element={<Schedules />} />
        <Route path="*" element={<Error status={404} />} />
      </Route>

      {/* <Route path="people" element={<NewPerson />}>
        <Route path=":id" element={<></>} />
      </Route> */}
    </Routes>
  );
};

export default AppRoutes;
