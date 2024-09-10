let gptConvoConfig = [];

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveConfig") {
    gptConvoConfig = request.config;
    chrome.storage.local.set({ gptConvoConfig }, () => {
      sendResponse({ success: true });
    });
    return true; // Indicates that the response is sent asynchronously
  } else if (request.action === "getConfig") {
    sendResponse({ config: gptConvoConfig });
  }
});

// Load initial config
chrome.storage.local.get('gptConvoConfig', (result) => {
  if (result.gptConvoConfig) {
    gptConvoConfig = result.gptConvoConfig;
  }
});
