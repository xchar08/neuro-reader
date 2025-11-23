// Function to add a site to the blacklist
function addToBlacklist(site) {
    if (!site) return;

    chrome.storage.sync.get({blacklist: []}, function(data) {
        let blacklist = data.blacklist;

        // Avoid duplicates
        if (!blacklist.includes(site)) {
            blacklist.push(site);
            chrome.storage.sync.set({blacklist: blacklist}, function() {
                updateBlacklistUI(blacklist);
                console.log("Added to blacklist:", site);
            });
        } else {
            alert(`${site} is already blacklisted!`);
        }
    });
}

// Update the UI list
function updateBlacklistUI(blacklist) {
    const listElement = document.getElementById('blacklistItems');
    listElement.innerHTML = '';
    blacklist.forEach(function(site) {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = site;
        
        // Optional: Add a remove button for each item
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '10px';
        removeBtn.style.fontSize = '12px';
        removeBtn.onclick = function() {
            const updated = blacklist.filter(s => s !== site);
            chrome.storage.sync.set({blacklist: updated}, () => updateBlacklistUI(updated));
        };

        li.appendChild(span);
        li.appendChild(removeBtn);
        listElement.appendChild(li);
    });
}

// === Button 1: Manual entry ===
document.getElementById('addButton').addEventListener('click', function() {
    const site = document.getElementById('blacklistInput').value.trim();
    if (site) {
        addToBlacklist(site);
        document.getElementById('blacklistInput').value = '';
    }
});

// === Button 2: Blacklist current site (the magic one!) ===
document.getElementById('blacklistCurrentBtn').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (!tabs || tabs.length === 0) return;

        const url = tabs[0].url;
        if (!url || url.startsWith('chrome://') || url.startsWith('about:')) {
            alert("Cannot blacklist this page (chrome:// or internal page)");
            return;
        }

        try {
            const hostname = new URL(url).hostname;        // e.g., youtube.com
            const fullDomain = hostname.replace(/^www\./, ''); // remove www.

            // You can choose what to block:
            // Option A: just the domain (recommended)
            addToBlacklist(fullDomain);

            // Option B: block exact URL (uncomment if you prefer)
            // addToBlacklist(url);

        } catch (e) {
            console.error("Invalid URL:", url);
            alert("Could not parse the current URL.");
        }
    });
});

// Load existing blacklist on popup open
chrome.storage.sync.get({blacklist: []}, function(data) {
    updateBlacklistUI(data.blacklist);
});
