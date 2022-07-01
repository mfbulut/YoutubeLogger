// Get username and webhook from storage
chrome.runtime.sendMessage('get-data', (response) => {
    document.getElementById('currentName').innerText = 'Current username is: ' + response.username;
    document.getElementById('currentWebhook').innerText = 'Current webhook is: ' + response.webhook.substring(32);
});

// Change username
document.getElementById('changeName').addEventListener('click', () => {
    username = document.getElementById('newName').value;

    // Check if username is empty
    if (username == '') {
        return;
    }

    document.getElementById('currentName').innerText = 'Current username is: ' + username;
    chrome.runtime.sendMessage({ username: username });
});

// Change webhook
document.getElementById('changeWebhook').addEventListener('click', () => {
    webhook = document.getElementById('newWebhook').value;

    // Check if webhook is valid
    if (!webhook.includes("discord.com/api/webhooks/")) {
        return;
    }

    document.getElementById('currentWebhook').innerText = 'Current webhook is: ' + webhook.substring(32);
    chrome.runtime.sendMessage({ webhook: webhook });
});
