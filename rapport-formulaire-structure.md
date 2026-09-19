# Rapport final — Formulaire structure et boutons retour

## Déploiement

Le correctif a été déployé sur [https://kynect-platform.netlify.app](https://kynect-platform.netlify.app). Le déploiement Netlify `6aaec76e42f4086c3e5f45f7` est à l’état `ready`.

## Fichiers modifiés

Le commit `04adcc4` — `fix: rebuild public offer form and wire back buttons` — a été poussé sur `main`.

Les fichiers concernés sont `soumettre.html`, `js/soumettre-page.js`, `js/offres.js`, `js/main.js`, `css/style.css` ainsi que les huit pages qui portent le bouton retour : `offres.html`, `offre.html`, `trouver.html`, `cv.html`, `formations.html`, `admin-login.html` et `admin.html`.

## Formulaire

Le formulaire de `soumettre.html` est organisé en deux blocs dans l’ordre demandé. Le premier bloc, **Informations sur la structure**, contient le nom, le type, le secteur, le pays, la ville et l’email obligatoires, ainsi que le site web, le téléphone et la description optionnels. Le second bloc, **Informations sur l’offre**, contient la catégorie Supabase, le bloc dynamique `#champs-specifiques`, le titre, la description de 50 caractères minimum, la localisation, la date limite, l’image optionnelle et les moyens de candidature.

À l’envoi, les données non couvertes par des colonnes sont structurées ainsi :

```json
{
  "structure": {
    "email": "...",
    "type": "...",
    "secteur": "...",
    "pays": "...",
    "ville": "...",
    "site_web": "...",
    "telephone": "...",
    "description": "..."
  },
  "specifique": {
    "...": "..."
  }
}
```

Le statut est forcé à `pending`, sans `.select()` ni `return=representation`, afin de respecter la lecture publique limitée aux offres `approved`. L’absence simultanée de lien et d’email bloque l’envoi avec le message exact : **« Veuillez fournir au moins un moyen de candidature (lien ou email). »**

## Boutons retour

Les huit pages demandées contiennent maintenant un bouton avec `onclick="goBack()"`. La fonction globale vérifie `window.history.length`, appelle `window.history.back()` si un historique existe et redirige vers `index.html` sinon. La classe commune impose une hauteur minimale de 44 pixels.

## Résultats des tests

| Test | Résultat | Détail |
| --- | --- | --- |
| Présence du retour sur les 8 pages | ✅ | Les huit URL publiques contiennent `onclick="goBack()"`. |
| Fallback vers l’accueil | ✅ | `goBack()` redirige vers `index.html` si aucun historique n’existe. |
| Taille tactile mobile | ✅ | `.back-button` a une hauteur minimale de 44 px. |
| Bloc structure en premier | ✅ | Présent dans le HTML public. |
| Bloc offre en second | ✅ | Présent après le bloc structure. |
| Catégories dynamiques | ✅ | Chargées depuis `categories` et reliées à `formSchemas`. |
| Champs conditionnels | ✅ | Selects et textareas spécifiques rendus dans `#champs-specifiques`. |
| Description minimale | ✅ | `minlength="50"` et validation JavaScript. |
| Moyen de candidature obligatoire | ✅ | Validation lien OU email avec message exact. |
| Structure `details` | ✅ | Sous-objets `structure` et `specifique`. |
| Statut pending | ✅ | Imposé par `submitOffer()`. |
| Schéma Supabase | ✅ | Aucun changement effectué. |
| Déploiement Netlify | ✅ | État `ready`, site public accessible. |

Aucune clé `service_role` n’a été exposée et aucune fonctionnalité hors périmètre n’a été ajoutée.
