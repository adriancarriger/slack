// Inject into page - http://stackoverflow.com/a/9310273/5357459s
(() => {
  const s = document.createElement('script');
  s.src = chrome.extension.getURL('index.js');
  (document.head || document.documentElement).appendChild(s);
  s.onload = () => s.parentNode.removeChild(s);
})();