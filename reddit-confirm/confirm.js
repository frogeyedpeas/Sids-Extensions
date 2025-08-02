console.log("🛡️ Reddit Confirm loaded on", location.href);

(function() {
  document.addEventListener('click', function(e) {
    // 1) Find the nearest <a>
    let el = e.target;
    while (el && el.tagName !== 'A') el = el.parentElement;
    if (!el) return;
    
    // 2) Read the raw href (may be relative)
    const raw = el.getAttribute('href');
    if (!raw) return;
    
    // 3) Is it a “reddit link”?
    //    a) Relative-to-root “/r/...”, or “r/...” (no leading slash)
    const relativeReddit = /^\/?r\/[^\/].*/i.test(raw);
    //    b) Absolute reddit.com URL
    let absolute;
    try {
      absolute = new URL(raw, location.href);
    } catch (_) {
      absolute = null;
    }
    const absoluteReddit = absolute && absolute.hostname.endsWith('reddit.com');
    
    if (relativeReddit || absoluteReddit) {
      // 4) Warn & confirm
      const ok = confirm(
        "⚠️ You’re about to follow a Reddit link from Reddit.\n" +
        "That can lead to endless doom-scrolling! Continue?"
      );
      if (!ok) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }
  }, { capture: true });
})();
