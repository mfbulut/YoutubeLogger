chrome.runtime.onInstalled.addListener(async () => {

    //Default values
    const defaultUsername = 'Default Name';
    const defaultWebhook = "Webhook URL";

    //Set default values
    chrome.storage.sync.set({ username: defaultUsername, webhook: defaultWebhook });

    //Get random username from web API
    fetch("https://random-data-api.com/api/name/random_name")
        .then(res => res.json())
        .then(data => {
            chrome.storage.sync.set({ username: data.name });
            console.log('Default username set to ' + data.name);
        })
});

//Listen for messages from content-script.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'get-data') {
        chrome.storage.sync.get(['username', 'webhook'], function (data) {
            sendResponse({ "username": data.username, "webhook": data.webhook });
        });
    }

    //Change username
    if (message.hasOwnProperty('username')) {
        chrome.storage.sync.set({ username: message.username });
        console.log('Username set to ' + message.username);
    }

    //Change webhook
    if (message.hasOwnProperty('webhook')) {
        chrome.storage.sync.set({ webhook: message.webhook });
        console.log('Webhook set to ' + message.webhook);
    }

    //Most important part is below
    return true;
});

