import { fetchResources } from "./ressources.js";
import { $, escapeHTML } from "./ui.js";
import "./main.js";

const type = location.pathname.includes("formations") ? "formation_certifiante" : "cv";
let resources = [];

function resourceCard(resource) {
  const isFree = resource.prix === "gratuit";
  return `<article class="resource-card">
    <span class="tag">${type === "cv" ? "Création de CV" : "Formation certifiante"}</span>
    <h3>${escapeHTML(resource.titre)}</h3>
    <p class="muted">${escapeHTML(resource.description || "")}</p>
    ${type !== "cv" ? `<p><span class="tag ${isFree ? "tag-success" : "tag-warning"}">${isFree ? "Gratuit" : "Payant"}</span></p>` : ""}
    <a class="btn btn-secondary" href="${escapeHTML(resource.url)}" target="_blank" rel="noopener">Accéder</a>
  </article>`;
}

function renderResources(filter = "all") {
  const visible = filter === "all" ? resources : resources.filter(resource => resource.prix === filter);
  $("#resources").innerHTML = visible.length
    ? visible.map(resourceCard).join("")
    : "<div class=empty>Aucune ressource disponible pour le moment.</div>";
}

async function init() {
  resources = await fetchResources(type);
  $("#resource-filter")?.addEventListener("change", event => renderResources(event.target.value));
  renderResources();
}

init().catch(() => {
  $("#resources").innerHTML = "<div class=empty>Impossible de charger les ressources pour le moment.</div>";
});
