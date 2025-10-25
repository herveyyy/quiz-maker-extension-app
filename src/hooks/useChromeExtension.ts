import { useState, useEffect } from 'react';
import { ChromeExtensionService } from '../services/ChromeExtensionService';

export const useChromeExtension = () => {
  const [isExtensionLoaded, setIsExtensionLoaded] = useState(false);
  const chromeService = new ChromeExtensionService();

  useEffect(() => {
    // Check if chrome.runtime is available (i.e., running as an extension)
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
      setIsExtensionLoaded(true);
    } else {
      setIsExtensionLoaded(false);
    }
  }, []);

  const sendMessageToBackground = async (message: any) => {
    if (!isExtensionLoaded) {
      console.warn('Not running as a Chrome extension. Cannot send message to background.');
      return;
    }
    return chromeService.sendMessageToBackground(message);
  };

  const sendMessageToActiveTab = async (message: any) => {
    if (!isExtensionLoaded) {
      console.warn('Not running as a Chrome extension. Cannot send message to active tab.');
      return;
    }
    return chromeService.sendMessageToActiveTab(message);
  };

  return {
    isExtensionLoaded,
    sendMessageToBackground,
    sendMessageToActiveTab,
  };
};