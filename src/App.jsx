import React from 'react';
import AppRoutes from './AppRoutes';
import { LanguageProvider } from './contexts/LanguageContext';
import { LoginProvider } from './contexts/LoginContext';

const App = () => {
  return (
    <div className="flex flex-col bg-zinc-100">
      <LoginProvider>
        <LanguageProvider>
          <AppRoutes />
        </LanguageProvider>
      </LoginProvider>
    </div>
  );
};

export default App;
