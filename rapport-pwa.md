# Rapport de livraison — Kynect PWA

## Fichiers créés

- `manifest.json` à la racine, avec affichage `standalone`, couleurs Kynect, URL de démarrage et icônes PWA.
- `service-worker.js` à la racine, avec cache des pages HTML, CSS, JavaScript, logo et icônes pour un fonctionnement basique hors ligne.
- `js/pwa.js`, qui enregistre le service worker et gère l’événement `beforeinstallprompt`.
- `assets/icons/icon-192.png` et `assets/icons/icon-512.png`, générées à partir de `assets/logo.svg`.

Les neuf pages HTML du site référencent le manifest, la couleur de thème, les icônes et le script PWA. La page d’accueil contient le bouton **Installer l’application**, masqué lorsque l’installation native n’est pas supportée ou lorsque l’application est déjà installée.

## Publication

Commit principal : `3bc1ed7` — `feat: add installable Kynect PWA`.

URL Netlify : [https://kynect-platform.netlify.app/](https://kynect-platform.netlify.app/)

Les contrôles publics ont confirmé la disponibilité de `manifest.json`, `service-worker.js`, du bouton d’installation et de l’icône 192×192.

## Tester sur Android

Ouvrir [https://kynect-platform.netlify.app/](https://kynect-platform.netlify.app/) dans Chrome Android. Lorsque Chrome détecte la PWA, utiliser le bouton **Installer l’application** dans la page ou le bandeau/menu **Installer** du navigateur. Après confirmation, l’icône Kynect apparaît sur l’écran d’accueil et l’application s’ouvre en mode autonome.

Aucun APK, framework ou service tiers n’a été ajouté et le schéma Supabase n’a pas été modifié.
