import React, { createContext, useState } from 'react';

// Creating context with a default value
export const MessageBannerContext = createContext();

export const MessageBannerProvider = ({ children }) => {
  const [bannerContent, setBannerContent] = useState({
    style: 'neutral',
  });
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const showBanner = (bannerContent, duration = 7000) => {
    setBannerContent(bannerContent);
    setIsBannerVisible(true);
    if (bannerContent.message !== 'Loading') {
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

export const MessageBanner = () => {
  const { bannerContent, isBannerVisible, hideBanner } =
    useContext(MessageBannerContext);

  const color = {
    error: 'bg-red-500',
    loading: 'bg-yellow-500',
    success: 'bg-green-500',
    neutral: 'bg-blue-500',
  };

  const defaultMessage = {
    error: 'Error',
    loading: 'Loading...',
    success: 'Success!',
    neutral: 'Message',
  };

  return (
    <div
      className={`absolute top-0 inset-x-0 ${
        color[bannerContent.style]
      } text-white p-2
      transition-transform duration-300 ease-in-out 
      ${isBannerVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {bannerContent.message || defaultMessage[bannerContent.style]}
      {bannerContent.style !== 'loading' && (
        <button
          className={`absolute top-1 right-4 text-lg text-white transition-transform duration-300 ease-in-out 
          ${isBannerVisible ? 'translate-y-0' : '-translate-y-full'}`}
          onClick={hideBanner}
        >
          &times;
        </button>
      )}
    </div>
  );
};
