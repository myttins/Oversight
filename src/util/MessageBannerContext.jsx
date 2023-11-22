// MessageBannerContext.js
import React, { createContext, useState } from 'react';

export const MessageBannerContext = createContext();

export const MessageBannerProvider = ({ children }) => {
  const [bannerContent, setBannerContent] = useState({});
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const showBanner = (content, duration = 10000) => {
    setBannerContent(content);
    setIsBannerVisible(true);
    if (content.message !== 'Loading') {
      setTimeout(() => setIsBannerVisible(false), duration);
    }
  };

  const hideBanner = () => {
    setIsBannerVisible(false);
  };

  return (
    <MessageBannerContext.Provider
      value={{ bannerContent, isBannerVisible, showBanner, hideBanner }}
    >
      {children}
    </MessageBannerContext.Provider>
  );
};
