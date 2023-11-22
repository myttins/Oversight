// MessageBanner.js
import React, { useContext } from 'react';
import { MessageBannerContext } from './MessageBannerContext';

const MessageBanner = () => {
  const { bannerContent, isBannerVisible, hideBanner } =
    useContext(MessageBannerContext);



  const color = {
    error: 'bg-red-500',
    loading: 'bg-yellow-500',
    success: 'bg-green-500'
  }

  if (bannerContent.style === 'loading') {
    return (
      <div
        className={`absolute top-0 inset-x-0 ${color[bannerContent.style]} text-white p-4 text-center 
        transition-transform duration-300 ease-in-out 
        ${isBannerVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {bannerContent.message}
      </div>
    );
  } 

  return (
    <div
      className={`absolute top-0 inset-x-0 ${color[bannerContent.style]} text-white p-4 text-center 
      transition-transform duration-300 ease-in-out 
      ${isBannerVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {bannerContent.message}
      <button
        className="absolute top-2 right-4 text-lg text-white"
        onClick={hideBanner}
      >
        &times;
      </button>
    </div>
  );
};

export default MessageBanner;
