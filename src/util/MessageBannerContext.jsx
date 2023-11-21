// MessageBannerContext.js
import React, { createContext, useState } from 'react';

export const MessageBannerContext = createContext();

export const MessageBannerProvider = ({ children }) => {
  const [bannerMessage, setBannerMessage] = useState('');
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const showMessage = (message, duration = 3000) => {
    setBannerMessage(message);
    setIsBannerVisible(true);
    if (message !== 'Loading') {
      setTimeout(() => setIsBannerVisible(false), duration);
    }
  };

  const hideMessage = () => {
    setIsBannerVisible(false);
  };

  return (
    <MessageBannerContext.Provider
      value={{ bannerMessage, isBannerVisible, showMessage, hideMessage }}
    >
      {children}
    </MessageBannerContext.Provider>
  );
};
