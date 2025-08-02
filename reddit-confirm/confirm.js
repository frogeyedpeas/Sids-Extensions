(function() {
  document.addEventListener('click', function(e) {
    let el = e.target;
    while (el && el.tagName !== 'A') el = el.parentElement;
    if (!el || !el.href) return;
    const url = new URL(el.href);
    if (url.hostname.endsWith('reddit.com')) {
      if (!confirm(
        "⚠️ You're about to follow a Reddit link from Reddit.\n" +
        "That can lead to endless doom-scrolling! Continue?"
      )) {
        e.preventDefault();
      }
    }
  }, { capture: true });
})();
