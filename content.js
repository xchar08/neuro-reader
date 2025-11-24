// 1. Helper to Bold Words
function boldLetters(word) {
  if (word.length > 3) {
    let firstPart = word.slice(0, 2);
    let lastPart = word.slice(-2);
    let middlePart = word.slice(2, -2);
    return `<b>${firstPart}</b>${middlePart}<b>${lastPart}</b>`;
  } else if (word.length > 1) {
    return `<b>${word}</b>`;
  } else {
    return word;
  }
}

// 2. Process Text Nodes
function processTextNodes(node) {
  // Split by word boundaries but keep the delimiters
  let words = node.textContent.split(/(\s+)/); 
  
  let modifiedWords = words.map(word => {
    if (/\w+/.test(word)) {
      return boldLetters(word);
    }
    return word;
  });

  let newHTML = modifiedWords.join("");
  let span = document.createElement("span");
  span.innerHTML = newHTML;
  
  // Replace text node with the new span
  if (node.parentNode) {
    node.parentNode.replaceChild(span, node);
  }
}

// 3. Recursive DOM Walker
function walkDOM(node) {
  var child, next;
  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        // Skip script, style, and existing spans to avoid re-bolding or breaking site
        if (child.nodeName !== 'SCRIPT' && 
            child.nodeName !== 'STYLE' && 
            child.nodeName !== 'NOSCRIPT' &&
            child.nodeName !== 'TEXTAREA' &&
            child.nodeName !== 'INPUT') {
          walkDOM(child);
        }
        child = next;
      }
      break;
    case 3: // Text node
      if (node.nodeValue.trim().length > 0) {
        processTextNodes(node);
      }
      break;
  }
}

// 4. Helper to check blacklist
function isBlacklisted(blacklist, hostname) {
  if (!blacklist || !hostname) return false;
  return blacklist.some(site => hostname.includes(site));
}

// --- MAIN EXECUTION ---
chrome.storage.sync.get({ blacklist: [], extensionEnabled: true }, function (data) {
  // Check 1: Master Switch
  if (!data.extensionEnabled) {
    return; 
  }

  // Check 2: Blacklist
  const currentHostname = window.location.hostname;
  if (isBlacklisted(data.blacklist, currentHostname)) {
    console.log("NeuroReader: Site is blacklisted.");
    return;
  }

  // If checks pass, run the bolding
  walkDOM(document.body);
});
