document.getElementById('addButton').addEventListener('click', function() {
    const site = document.getElementById('blacklist').value.trim();
    if (site) {
        chrome.storage.sync.get({blacklist: []}, function(data) {
            const blacklist = data.blacklist;
            if (!blacklist.includes(site)) {
                blacklist.push(site);
                chrome.storage.sync.set({blacklist: blacklist}, function() {
                    updateBlacklistUI(blacklist);
                    document.getElementById('blacklist').value = '';
                });
            }
        });
    }
});

function updateBlacklistUI(blacklist) {
    const listElement = document.getElementById('blacklistItems');
    listElement.innerHTML = '';
    blacklist.forEach(function(site) {
        const listItem = document.createElement('li');
        listItem.textContent = site;
        listElement.appendChild(listItem);
    });
}

chrome.storage.sync.get({blacklist: []}, function(data) {
    updateBlacklistUI(data.blacklist);
});
    