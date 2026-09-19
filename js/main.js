import { setupNav } from "./ui.js";

setupNav();
document.querySelectorAll("[data-back]").forEach(button => {
  button.addEventListener("click", () => {
    if (history.length > 1) history.back();
    else location.href = "index.html";
  });
});
