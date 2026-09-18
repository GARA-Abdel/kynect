# Kynect

Kynect est une plateforme statique en français qui centralise les opportunités destinées aux jeunes : bourses, formations, concours, emplois, stages et programmes. Elle propose aussi des ressources pour créer un CV, suivre des formations certifiantes et trouver les offres correspondant à un profil.

## Stack et principes

Le projet utilise uniquement **HTML5, CSS3 et JavaScript vanilla**. Il n’emploie aucun framework, bundler, npm, SDK Manus ou service Manus. Le site est conçu pour être servi tel quel comme site statique ; tous les chemins sont relatifs et les modules ES6 sont chargés directement dans le navigateur.

## Configuration Supabase — étape ultérieure

La base Supabase n’est pas créée ni configurée dans ce dépôt. Lors de l’étape suivante, créez un projet Supabase, exécutez `supabase/schema.sql` dans l’éditeur SQL, puis créez manuellement l’utilisateur administrateur dans Supabase Auth. Renseignez ensuite l’URL du projet et la clé anonyme dans `js/supabase-config.js` :

```js
export const SUPABASE_URL = "https://votre-projet.supabase.co";
export const SUPABASE_ANON_KEY = "votre-cle-anon";
```

Aucune clé réelle n’est incluse dans ce dépôt. Tant que ces valeurs restent inchangées, les pages s’affichent avec des états vides explicites et les opérations nécessitant Supabase indiquent que la configuration est à compléter.

## Déploiement manuel sur Netlify

1. Connecter le compte Netlify au compte GitHub.
2. Choisir **Add new site → Import an existing project**, puis sélectionner le dépôt `kynect`.
3. Laisser le champ de build vide et définir `Publish directory` sur `.`.
4. Cliquer sur **Deploy site**. L’URL sera de la forme `https://kynect.netlify.app`.
5. Chaque `git push` sur la branche principale déclenchera un nouveau déploiement.
6. Le fichier `netlify.toml` à la racine configure déjà le comportement attendu.

Le déploiement n’est pas effectué par ce projet. Le code est totalement indépendant de Manus.
