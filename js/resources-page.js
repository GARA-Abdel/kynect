import { fetchResources } from "./ressources.js";
import { $, escapeHTML } from "./ui.js";
import "./main.js";

const type = location.pathname.includes("formations") ? "formation_certifiante" : "cv";
let resources = [];

function normalize(resource) {
  const match = type === "formation_certifiante" ? (resource.description || "").match(/^Domaine\s*:\s*([^\n]+)\n\n([\s\S]*)$/) : null;
  return { ...resource, domaine: match?.[1]?.trim() || "Autres formations", descriptionAffichee: match?.[2] || resource.description || "" };
}

function resourceCard(resource) {
  const isFree = resource.prix === "gratuit";
  return `<article class="resource-card"><span class="tag">${type === "cv" ? "Création de CV" : escapeHTML(resource.domaine)}</span><h3>${escapeHTML(resource.titre)}</h3><p class="muted">${escapeHTML(resource.descriptionAffichee)}</p>${type !== "cv" ? `<p><span class="tag ${isFree ? "tag-success" : "tag-warning"}">${isFree ? "Gratuit" : "Payant"}</span></p>` : ""}<a class="btn btn-secondary" href="${escapeHTML(resource.url)}" target="_blank" rel="noopener">Accéder à la formation</a></article>`;
}

function renderResources(filter = "all") {
  const visible = filter === "all" ? resources : resources.filter(resource => resource.prix === filter);
  if (!visible.length) { $("#resources").innerHTML = "<div class=empty>Aucune ressource disponible pour le moment.</div>"; return; }
  if (type === "cv") { $("#resources").innerHTML = visible.map(resourceCard).join(""); return; }
  const groups = Object.groupBy ? Object.groupBy(visible, resource => resource.domaine) : visible.reduce((acc, resource) => ((acc[resource.domaine] ||= []).push(resource), acc), {});
  $("#resources").innerHTML = Object.entries(groups).map(([domain, items]) => `<section class="resource-domain"><h2>${escapeHTML(domain)}</h2><div class="resource-grid">${items.map(resourceCard).join("")}</div></section>`).join("");
}

async function init() {
  resources = (await fetchResources(type)).map(normalize);
  $("#resource-filter")?.addEventListener("change", event => renderResources(event.target.value));
  renderResources();
}

init().catch(() => { $("#resources").innerHTML = "<div class=empty>Impossible de charger les ressources pour le moment.</div>"; });
