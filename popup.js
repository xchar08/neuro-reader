// DOM Elements
const elements = {
    input: document.getElementById('blacklistInput'),
    addBtn: document.getElementById('addButton'),
    currentBtn: document.getElementById('blacklistCurrentBtn'),
    list: document.getElementById('blacklistItems'),
    emptyState: document.getElementById('emptyState'),
    masterToggle: document.getElementById('masterToggle'),
    toggleStatus: document.getElementById('toggleStatus'),
    mainContent: document.getElementById('mainContent')
  };
  
  // --- 1. Toggle Logic ---
  
  function updateToggleUI(isEnabled) {
    elements.masterToggle.checked = isEnabled;
    elements.toggleStatus.textContent = isEnabled ? "Enabled" : "Disabled";
    
    if (isEnabled) {
      elements.mainContent.classList.remove('disabled-content');
    } else {
      elements.mainContent.classList.add('disabled-content');
    }
  }
  
  elements.masterToggle.addEventListener('change', (e) => {
    const isEnabled = e.target.checked;
    updateToggleUI(isEnabled);
    
    chrome.storage.sync.set({ extensionEnabled: isEnabled }, () => {
      // Reload the current tab so the change takes effect immediately
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(tabs[0] && tabs[0].id) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  });
  
  // --- 2. Blacklist Logic ---
  
  function addToBlacklist(site) {
    if (!site) return;
    
    // Basic cleanup (remove http/https/www if pasted fully)
    site = site.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
  
    chrome.storage.sync.get({ blacklist: [] }, (data) => {
      const blacklist = data.blacklist;
      if (!blacklist.includes(site)) {
        const updatedList = [...blacklist, site];
        chrome.storage.sync.set({ blacklist: updatedList }, () => {
          renderList(updatedList);
          elements.input.value = ''; // Clear input
        });
      } else {
        // Visual feedback for duplicate
        elements.input.style.borderColor = 'red';
        setTimeout(() => elements.input.style.borderColor = '', 1000);
      }
    });
  }
  
  function removeFromBlacklist(siteToRemove) {
    chrome.storage.sync.get({ blacklist: [] }, (data) => {
      const updatedList = data.blacklist.filter(site => site !== siteToRemove);
      chrome.storage.sync.set({ blacklist: updatedList }, () => {
        renderList(updatedList);
        // Reload page so the bolding comes back if you are on that site
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          if(tabs[0]) chrome.tabs.reload(tabs[0].id);
        });
      });
    });
  }
  
  // --- 3. UI Rendering ---
  
  function renderList(blacklist) {
    elements.list.innerHTML = '';
    
    if (blacklist.length === 0) {
      elements.emptyState.classList.remove('hidden');
      elements.list.style.display = 'none';
    } else {
      elements.emptyState.classList.add('hidden');
      elements.list.style.display = 'block';
      
      blacklist.forEach(site => {
        const li = document.createElement('li');
        
        const text = document.createElement('span');
        text.textContent = site;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '✕'; 
        removeBtn.title = 'Remove';
        removeBtn.onclick = () => removeFromBlacklist(site);
        
        li.appendChild(text);
        li.appendChild(removeBtn);
        elements.list.appendChild(li);
      });
    }
  }
  
  // --- 4. Event Listeners ---
  
  elements.addBtn.addEventListener('click', () => {
    addToBlacklist(elements.input.value.trim());
  });
  
  elements.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addToBlacklist(elements.input.value.trim());
  });
  
  elements.currentBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs.length) return;
      const url = tabs[0].url;
      
      if (!url || url.startsWith('chrome://') || url.startsWith('edge://')) {
        alert("Cannot blacklist browser system pages.");
        return;
      }
  
      try {
        const hostname = new URL(url).hostname;
        addToBlacklist(hostname);
        // Reload to stop bolding immediately
        chrome.tabs.reload(tabs[0].id);
      } catch (e) {
        console.error("Invalid URL");
      }
    });
  });
  
  // --- 5. Initialization ---
  chrome.storage.sync.get({ blacklist: [], extensionEnabled: true }, (data) => {
    renderList(data.blacklist);
    updateToggleUI(data.extensionEnabled);
  });
  