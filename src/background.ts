// Background script for the Silid Quiz Maker extension
// Handles communication with content scripts and extension lifecycle

console.log("Background script loaded");

// Handle extension installation
chrome.runtime.onInstalled.addListener((details: chrome.runtime.InstalledDetails) => {
  console.log("Extension installed:", details);
  
  // Set up side panel
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((message: any, _sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
  console.log("Background received message:", message);
  
  switch (message.type) {
    case 'GET_EXTENSION_INFO':
      sendResponse({
        success: true,
        data: {
          name: 'Silid Quiz Maker',
          version: '1.0',
          description: 'Chrome extension for generating quizzes from documents using AI',
        },
      });
      break;
      
    case 'GET_TAB_INFO':
      getTabInfo().then((tabInfo) => {
        sendResponse({ success: true, data: tabInfo });
      });
      return true; // Keep message channel open for async response
      
    default:
      console.log("Unknown message type:", message.type);
      sendResponse({ success: false, error: 'Unknown message type' });
  }
});

async function getTabInfo() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return {
      id: tab?.id,
      url: tab?.url,
      title: tab?.title,
    };
  } catch (error) {
    console.error('Error getting tab info:', error);
    return null;
  }
}