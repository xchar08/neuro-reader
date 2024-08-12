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
  
  function processTextNodes(node) {
    let words = node.textContent.split(/\b/);
    let modifiedWords = words.map(word => {
      if (/\w+/.test(word)) {
        return boldLetters(word);
      }
      return word;
    });
    let newHTML = modifiedWords.join("");
    let span = document.createElement("span");
    span.innerHTML = newHTML;
    node.parentNode.replaceChild(span, node);
  }
  
  function walkDOM(node) {
    let child, next;
    switch (node.nodeType) {
      case 1:  // Element
      case 9:  // Document
      case 11: // Document fragment
        child = node.firstChild;
        while (child) {
          next = child.nextSibling;
          walkDOM(child);
          child = next;
        }
        break;
      case 3: // Text node
        processTextNodes(node);
        break;
    }
  }
  
  function getHostname(url) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      return null;
    }
  }
  
  function isBlacklisted(blacklist, hostname) {
    console.log(`Current hostname: ${hostname}`);
    console.log(`Blacklist: ${blacklist.join(', ')}`);
  
    return blacklist.some(site => {
      let blacklistedHost = getHostname(site);
      console.log(`Checking if ${hostname} matches ${blacklistedHost}`);
      return blacklistedHost === hostname;
    });
  }
  
  // Check if the current site is blacklisted
  chrome.storage.sync.get({ blacklist: [] }, function (data) {
    const blacklist = data.blacklist;
    const currentHostname = window.location.hostname;
  
    if (!isBlacklisted(blacklist, currentHostname)) {
      console.log(`Bolding applied to non-blacklisted site: ${currentHostname}`);
      applyBoldToDocument();
    } else {
      console.log(`Site is blacklisted, bolding not applied: ${currentHostname}`);
    }
  });
  
  function applyBoldToDocument() {
    // Get the main document
    walkDOM(document.body);
  
    // Note: Skipping iframes due to cross-origin restrictions
  }
  