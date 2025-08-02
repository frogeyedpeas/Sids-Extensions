console.log("🛡️ Reddit Confirm loaded on", location.href);
// ==UserScript==
// @name         Reddit→Reddit Confirm (SPA-aware)
// @namespace    https://example.com/
// @match        *://reddit.com/*
// @match        *://www.reddit.com/*
// @match        *://old.reddit.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
  console.log("🛡️ Reddit Confirm loaded on", location.href);

  const warnIfRedditLink = raw => {
    if (!raw) return false;
    // Relative “/r/...” or “r/...”
    const isRel = /^\/?r\/[^\/].*/i.test(raw);
    // Absolute “reddit.com/…”
    let isAbs = false;
    try {
      const u = new URL(raw, location.href);
      isAbs = u.hostname.endsWith("reddit.com");
    } catch {}
    return isRel || isAbs;
  };

  // 1) Click handler (for full <a> navigations)
  document.addEventListener("click", e => {
    let a = e.target;
    while (a && a.tagName !== "A") a = a.parentElement;
    if (!a) return;
    const href = a.getAttribute("href");
    if (warnIfRedditLink(href)) {
      if (!confirm(
        "⚠️ You’re about to follow a Reddit link from Reddit.\n" +
        "That can lead to endless doom-scrolling! Continue?"
      )) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }
  }, { capture: true });

  // 2) SPA navigation via pushState / replaceState
  ["pushState","replaceState"].forEach(fn => {
    const orig = history[fn];
    history[fn] = function(state, title, url) {
      if (warnIfRedditLink(url)) {
        if (!confirm(
          "⚠️ You’re about to navigate within Reddit (client-side)… Continue?"
        )) {
          return;  // bail out, so no navigation
        }
      }
      return orig.apply(this, arguments);
    };
  });

  // 3) Handle browser “back/forward” via popstate
  window.addEventListener("popstate", e => {
    // You could warn here if you really want; usually back/forward is fine.
  });
})();
