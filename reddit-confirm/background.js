// background.js

// Our one rule ID
const RULE_ID = 1;

// Define the single DNR rule that only fires when the *initiator* is reddit.com
const redditRedirectRule = {
  id: RULE_ID,
  priority: 1,
  action: {
    type: 'redirect',
    redirect: { extensionPath: '/warning.html' }
  },
  condition: {
    // match any top-level navigation whose URL contains "/r/"
    urlFilter: 'reddit.com/r/',
    resourceTypes: ['main_frame'],
    // only if the click came from a reddit.com page
    initiatorDomains: ['reddit.com', 'www.reddit.com', 'old.reddit.com']
  }
};

function registerRule() {
  chrome.declarativeNetRequest.updateDynamicRules({
    // remove any old version of our rule, then add the new one
    removeRuleIds: [RULE_ID],
    addRules: [redditRedirectRule]
  }, () => {
    if (chrome.runtime.lastError)
      console.error('🛡️ Failed to register Reddit Guard rule:', chrome.runtime.lastError);
    else
      console.log('🛡️ Reddit Guard rule registered (MV3 dynamic)');
  });
}

// Register on install and on every startup (service‐worker may restart)
chrome.runtime.onInstalled.addListener(registerRule);
chrome.runtime.onStartup.addListener(registerRule);
