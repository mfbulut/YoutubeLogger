// Get username and webhook from storage
function LogCurrentPage() {
    chrome.runtime.sendMessage('get-data', (response) => {
        console.log('received user data', response);

        // Create a message object
        const params = {
            username: "Youtube Logger",
            avatar_url: "",
            content: response.username + " started watching [this](" + window.location.href + ") at " + new Date().toLocaleString()
        }

        // Send message to webhook
        fetch(response.webhook, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
    });
}

// Log page only when it's a video
if (window.location.href.includes("youtube.com/watch?")) {
    LogCurrentPage();
}

// Track page changes
let currentSite = window.location.href
setInterval(function () {
    if (currentSite != window.location.href) {
        if (window.location.href.includes("youtube.com/watch?")) {
            LogCurrentPage();
        }
        currentSite = window.location.href;
    }
}, 1000);

