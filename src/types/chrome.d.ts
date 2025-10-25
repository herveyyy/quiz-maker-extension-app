// Chrome Extension API type definitions
declare namespace chrome {
  namespace runtime {
    type MessageSender = {
      tab?: chrome.tabs.Tab;
      frameId?: number;
      id?: string;
      url?: string;
      tlsChannelId?: string;
    };

    type InstalledDetails = {
      reason: 'install' | 'update' | 'chrome_update' | 'shared_module_update';
      previousVersion?: string;
    };

    const onInstalled: {
      addListener(callback: (details: InstalledDetails) => void): void;
    };

    const onMessage: {
      addListener(callback: (message: any, sender: MessageSender, sendResponse: (response?: any) => void) => void | boolean): void;
    };

    function sendMessage(message: any, callback?: (response: any) => void): void;
    function getURL(path: string): string;
    const lastError: { message: string } | undefined;
    const id: string;
  }

  namespace sidePanel {
    function setPanelBehavior(options: { openPanelOnActionClick: boolean }): void;
  }

  namespace tabs {
    type Tab = {
      id?: number;
      url?: string;
      title?: string;
      active?: boolean;
      windowId?: number;
    };

    function query(queryInfo: { active?: boolean; currentWindow?: boolean }): Promise<Tab[]>;
    function sendMessage(tabId: number, message: any, callback?: (response: any) => void): void;
  }
}
