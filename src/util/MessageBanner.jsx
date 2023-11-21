// MessageBanner.js
import React, { useContext } from 'react';
import { MessageBannerContext } from './MessageBannerContext';

const MessageBanner = () => {
  const { bannerMessage, isBannerVisible, hideMessage } =
    useContext(MessageBannerContext);

  if (!isBannerVisible) return null;

  return (
    <div
      className={`fixed top-0 inset-x-0 bg-blue-500 text-white p-4 text-center 
                    transition-transform duration-300 ease-out
                    ${isBannerVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {bannerMessage}
      <button
        className="absolute top-2 right-4 text-lg text-white"
        onClick={hideMessage}
      >
        &times;
      </button>
    </div>
  );
};

export default MessageBanner;
