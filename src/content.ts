// Content script for tab interaction
console.log("Content script loaded");

// Listen for messages from the extension popup/side panel
chrome.runtime.onMessage.addListener((message: any, _sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
  console.log("Content script received message:", message);
  
  switch (message.type) {
    case 'GET_TAB_INFO':
      handleGetTabInfo(sendResponse);
      return true;
      
    default:
      console.log("Unknown message type:", message.type);
      sendResponse({ success: false, error: 'Unknown message type' });
  }
});

function handleGetTabInfo(sendResponse: (response: any) => void): void {
  try {
    const tabInfo = {
      url: window.location.href,
      title: document.title,
      domain: window.location.hostname,
      protocol: window.location.protocol,
      timestamp: Date.now()
    };
    
    sendResponse({ success: true, tabInfo });
  } catch (error) {
    console.error("Failed to get tab info:", error);
    sendResponse({ 
      success: false, 
      error: `Failed to get tab info: ${error instanceof Error ? error.message : 'Unknown error'}` 
    });
  }
}