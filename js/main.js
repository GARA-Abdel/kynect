import { setupNav } from "./ui.js";

export function goBack() {
  if (window.history.length > 1) window.history.back();
  else window.location.href = "index.html";
}

window.goBack = goBack;
setupNav();
