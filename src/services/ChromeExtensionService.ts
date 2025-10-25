type ChromeMessage = {
  type: string;
  data?: unknown;
};

type ChromeResponse = {
  success: boolean;
  data?: unknown;
  error?: string;
};

export class ChromeExtensionService {
  private isAvailable(): boolean {
    return typeof chrome !== 'undefined' && !!chrome.runtime;
  }

  async sendMessage(message: ChromeMessage): Promise<ChromeResponse> {
    if (!this.isAvailable()) {
      throw new Error('Chrome extension API not available');
    }

    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response as ChromeResponse);
        }
      });
    });
  }

  async sendMessageToBackground(message: any): Promise<any> {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, (response) => {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError.message);
          }
          resolve(response);
        });
      });
    } else {
      console.warn('Chrome runtime not available. Cannot send message to background.');
      return Promise.resolve(null);
    }
  }

  async sendMessageToActiveTab(message: any): Promise<any> {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.id) {
        return new Promise((resolve, reject) => {
          chrome.tabs.sendMessage(tab.id!, message, (response) => {
            if (chrome.runtime.lastError) {
              return reject(chrome.runtime.lastError.message);
            }
            resolve(response);
          });
        });
      }
    }
    console.warn('Chrome tabs API not available or no active tab. Cannot send message to active tab.');
    return Promise.resolve(null);
  }
}