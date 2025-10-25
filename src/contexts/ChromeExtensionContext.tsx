import React, { createContext, useContext, type ReactNode } from 'react';
import { useChromeExtension } from '../hooks';

type ChromeExtensionContextType = ReturnType<typeof useChromeExtension>;

const ChromeExtensionContext = createContext<ChromeExtensionContextType | null>(null);

type ChromeExtensionProviderProps = {
  children: ReactNode;
};

export const ChromeExtensionProvider: React.FC<ChromeExtensionProviderProps> = ({ children }) => {
  const chromeExtension = useChromeExtension();
  
  return (
    <ChromeExtensionContext.Provider value={chromeExtension}>
      {children}
    </ChromeExtensionContext.Provider>
  );
};

export const useChromeExtensionContext = () => {
  const context = useContext(ChromeExtensionContext);
  if (!context) {
    throw new Error('useChromeExtensionContext must be used within a ChromeExtensionProvider');
  }
  return context;
};