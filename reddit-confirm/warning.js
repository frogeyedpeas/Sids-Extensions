// Read the destination from the URL
const params = new URLSearchParams(location.search);
const dest = params.get("dest");

document.getElementById("go").addEventListener("click", () => {
  // Un-encode and navigate
  window.location.href = decodeURIComponent(dest);
});

document.getElementById("stop").addEventListener("click", () => {
  // Just go back
  window.history.back();
});
