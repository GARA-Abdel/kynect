(() => {
  if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
  const button = document.querySelector("#install-app");
  if (!button) return;
  const installed = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  if (installed || !("onbeforeinstallprompt" in window)) return;
  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", event => { event.preventDefault(); deferredPrompt = event; button.classList.remove("hidden"); });
  button.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    button.classList.add("hidden");
  });
  window.addEventListener("appinstalled", () => button.classList.add("hidden"));
})();
