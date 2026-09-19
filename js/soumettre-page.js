import { fetchCategories, renderSpecificFields, submitOffer } from "./offres.js";
import { $, showToast, setLoading } from "./ui.js";
import "./main.js";

const form = $("#offer-form");
const categorySelect = $("#categorie");
const specificFields = $("#champs-specifiques");

function collectFields(names) {
  return Object.fromEntries(names.map(name => [name.replace(/^structure_/, ""), $("#" + name)?.value.trim() || ""]).filter(([, value]) => value));
}

async function init() {
  const categories = await fetchCategories();
  categorySelect.insertAdjacentHTML("beforeend", categories.map(category => `<option value="${category.id}" data-slug="${category.slug}">${category.nom}</option>`).join(""));
  categorySelect.addEventListener("change", event => {
    const slug = event.target.selectedOptions[0]?.dataset.slug || "";
    renderSpecificFields(slug, specificFields);
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if ($( "#description" ).value.trim().length < 50) {
      showToast("La description doit contenir au moins 50 caractères.", "error");
      $("#description").focus();
      return;
    }
    if (!$("#lien_candidature").value.trim() && !$("#email_contact").value.trim()) {
      showToast("Veuillez fournir au moins un moyen de candidature (lien ou email).", "error");
      return;
    }
    const structureNames = ["structure_type", "structure_secteur", "structure_pays", "structure_ville", "structure_site_web", "structure_telephone", "structure_description"];
    const specifique = Object.fromEntries([...specificFields.querySelectorAll("input, select, textarea")].filter(field => field.value.trim()).map(field => [field.name, field.value.trim()]));
    const payload = {
      titre: $("#titre").value.trim(),
      description: $("#description").value.trim(),
      structure_nom: $("#structure_nom").value.trim(),
      categorie_id: categorySelect.value,
      localisation: $("#localisation").value.trim(),
      date_limite: $("#date_limite").value,
      lien_candidature: $("#lien_candidature").value.trim() || null,
      email_contact: $("#email_contact").value.trim() || null,
      image_url: $("#image_url").value.trim() || null,
      details: { structure: { email: $("#structure_email").value.trim(), ...collectFields(structureNames) }, specifique }
    };
    const button = form.querySelector("button[type=submit]");
    setLoading(button, true, "Envoi");
    try {
      await submitOffer(payload);
      form.reset();
      specificFields.innerHTML = "";
      $("#form-message").innerHTML = "<div class=notice-success>Merci, votre offre sera examinée par notre équipe avant publication.</div>";
      showToast("Offre envoyée avec succès");
    } catch (error) {
      showToast(error.message || "Impossible d’envoyer l’offre.", "error");
    } finally {
      setLoading(button, false, "Soumettre l’offre");
    }
  });
}

init().catch(error => showToast(error.message || "Impossible de charger les catégories.", "error"));
