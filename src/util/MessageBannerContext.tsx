import React, { createContext, useState, ReactNode } from 'react';

interface BannerContent {
  style: string;
  message?: string;
}

interface MessageBannerContextType {
  bannerContent: BannerContent;
  isBannerVisible: boolean;
  showBanner: (content: BannerContent, duration?: number) => void;
  hideBanner: () => void;
}

// Creating context with a default value
export const MessageBannerContext = createContext<MessageBannerContextType>({
  bannerContent: { style: 'neutral' },
  isBannerVisible: false,
  showBanner: () => {},
  hideBanner: () => {},
});

interface MessageBannerProviderProps {
  children: ReactNode;
}

export const MessageBannerProvider: React.FC<MessageBannerProviderProps> = ({
  children,
}) => {
  const [bannerContent, setBannerContent] = useState<BannerContent>({
    style: 'neutral',
  });
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const showBanner = (bannerContent: BannerContent, duration = 7000) => {
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
