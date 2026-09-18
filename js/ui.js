export const $ = (selector, scope=document) => scope.querySelector(selector);
export const $$ = (selector, scope=document) => [...scope.querySelectorAll(selector)];
export function escapeHTML(value=""){const div=document.createElement("div");div.textContent=value;return div.innerHTML;}
export function showToast(message,type="success"){const region=$("#toast-region")||document.body;const toast=document.createElement("div");toast.className=`toast ${type}`;toast.textContent=message;region.append(toast);setTimeout(()=>toast.remove(),4500)}
export function setLoading(el,loading,text="Chargement…"){if(!el)return;if(loading){el.dataset.label=el.textContent;el.disabled=true;el.innerHTML=`<span class="spinner" style="display:inline-block;width:16px;height:16px;margin:0;border-width:2px;vertical-align:middle"></span> ${text}`}else{el.disabled=false;el.textContent=el.dataset.label||text}}
export function formatDate(date){if(!date)return "Date non précisée";return new Intl.DateTimeFormat("fr-FR",{dateStyle:"long"}).format(new Date(date))}
export function categoryOptions(categories=[],selected=""){return categories.map(c=>`<option value="${escapeHTML(c.id)}" ${c.id===selected?"selected":""}>${escapeHTML(c.nom)}</option>`).join("")}
export function setupNav(){const toggle=$(".menu-toggle"),links=$(".nav-links");toggle?.addEventListener("click",()=>links?.classList.toggle("open"))}
