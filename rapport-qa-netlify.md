# Rapport QA et déploiement — Kynect

## 1. Déploiement

Le site Kynect a été déployé publiquement sur Netlify avec le nom de site `kynect-platform`, car le nom global `kynect` était déjà pris sur Netlify.

- URL publique : [https://kynect-platform.netlify.app](https://kynect-platform.netlify.app)
- URL du projet Netlify : [https://app.netlify.com/projects/kynect-platform](https://app.netlify.com/projects/kynect-platform)
- Région Supabase utilisée par le site : `eu-west-3`
- Déploiement vérifié : état `ready`
- Deploy ID : `6aadbc88588dbc925bb59f91`
- Configuration statique : publication à la racine avec `netlify.toml` et aucun build nécessaire.

Le déploiement réalisé dans cette session est un déploiement direct via l’intégration Netlify. La liaison automatique au dépôt GitHub n’a pas pu être confirmée : l’outil Netlify disponible permet le déploiement et la gestion du site, mais n’expose pas l’opération de liaison GitHub, et le tableau de bord Netlify ouvert dans le navigateur demandait une connexion séparée. Il faut donc vérifier ou activer **Deploys → Continuous Deployment → Link repository** dans le tableau de bord Netlify pour garantir les redéploiements automatiques sur `main`.

## 2. Tests de disponibilité et des assets

| Test | Résultat | Détails |
| --- | --- | --- |
| Accueil `/` | ✅ | HTTP 200 ; titre, bienvenue, présentation et parcours visibles. |
| Offres `/offres.html` | ✅ | HTTP 200 ; recherche, catégorie, localisation et tri présents. |
| Détail `/offre.html` | ✅ | HTTP 200 ; page et module chargés, aucun identifiant fourni pour afficher une offre. |
| Soumission `/soumettre.html` | ✅ | HTTP 200 ; formulaire et module ES6 servis. |
| Matching `/trouver.html` | ✅ | HTTP 200 ; page de matching servie. |
| Ressources CV `/cv.html` | ✅ | HTTP 200 ; page servie. |
| Formations `/formations.html` | ✅ | HTTP 200 ; page servie. |
| Connexion `/admin-login.html` | ✅ | HTTP 200 ; formulaire email/mot de passe servi. |
| Administration `/admin.html` | ✅ | HTTP 200 ; la protection est assurée côté JavaScript et par les policies RLS. |
| CSS, JavaScript et logo | ✅ | Les fichiers principaux testés retournent HTTP 200. |
| Erreurs 404 d’assets | ✅ | Aucun des chemins testés n’a retourné 404. |

## 3. Tests Supabase publics

La connexion publique à Supabase fonctionne en lecture :

- `categories` retourne les **6 catégories initiales**.
- `offres` approuvées retourne actuellement une liste vide, sans erreur.
- Les pages gèrent correctement l’état vide.
- Les ressources publiques sont accessibles en lecture.

Le test d’écriture publique d’une offre `pending` reste bloqué par Supabase avec `42501 new row violates row-level security policy`. Les corrections autorisées ont été appliquées : policy d’insertion limitée à `statut = 'pending'` et `GRANT INSERT` pour `anon, authenticated`. Le comportement restant doit être diagnostiqué dans les réglages de privilèges/API Supabase avant toute nouvelle modification de schéma.

Aucune donnée de test définitive n’a été laissée dans Supabase, car l’insertion publique a échoué. Les six catégories existantes n’ont pas été modifiées.

## 4. Contrôle administrateur

Le code et la base utilisent désormais l’adresse explicite `admin@kynect.app` :

- un visiteur non connecté est redirigé vers `admin-login.html` lorsqu’il tente d’ouvrir l’administration ;
- un utilisateur connecté avec une autre adresse est déconnecté et refusé ;
- les policies RLS réservent les opérations de gestion à `admin@kynect.app` ;
- la lecture publique des offres est limitée au statut `approved` ;
- l’insertion publique est limitée au statut `pending` ;
- aucune clé `service_role` n’a été ajoutée au code ou au dépôt.

La connexion interactive avec les identifiants admin n’a pas pu être exécutée depuis cette session, car le tableau de bord Supabase et Netlify n’étaient pas connectés au navigateur Manus. Le contrôle applicatif et RLS a toutefois été vérifié dans le code et dans les policies présentes en base.

## 5. Corrections appliquées

| Commit | Correction |
| --- | --- |
| `d1768e0` | Restriction de l’administration à `admin@kynect.app`, dans le code et les policies RLS. |
| `f7f9b09` | Correction de la policy d’insertion publique `pending` et ajout du privilège SQL `INSERT` autorisé. |

Le dernier commit a été poussé sur la branche `main` du dépôt [GARA-Abdel/kynect](https://github.com/GARA-Abdel/kynect). Le dépôt local est propre.

## 6. État final

Le site est **publiquement déployé et fonctionnel pour les lectures publiques**, avec les pages, assets, modules ES6 et connexion Supabase en lecture opérationnels. Le contrôle d’accès administrateur est configuré côté application et RLS.

Deux points restent à finaliser :

1. activer ou confirmer la liaison GitHub de Netlify pour les redéploiements automatiques sur `main` ;
2. diagnostiquer le privilège effectif d’insertion Supabase afin que `soumettre.html` puisse créer une offre `pending` depuis le navigateur.

Aucun déploiement sur un autre hébergeur n’a été effectué et aucune clé `service_role` n’a été exposée.
