# Rapport — Formations par domaine

## Résultat

Le catalogue fourni a été ajouté dans Supabase sans modification du schéma. **36 nouvelles formations** ont été insérées dans `ressources` avec `type = 'formation_certifiante'`, une URL d’accès et une description détaillée.

Les domaines sont : Robotique, Sciences / Ingénierie, Programmation, Cybersécurité, Data Science, Productivité / Gestion du temps, Épargne / Investissement, Finance personnelle, Développement personnel / Productivité / Bien-être et Compétences numériques. Les 14 ressources certifiantes initiales restent également visibles sous « Autres formations » lorsqu’elles ne possèdent pas de domaine explicite.

Le domaine est stocké sans changement de table, au début de la description sous la forme `Domaine : ...`. La page `formations.html` extrait cette information et rend une section de cartes par domaine. Chaque carte affiche le titre, la description, le prix et un bouton sécurisé **Accéder à la formation** avec `target="_blank"` et `rel="noopener"`.

## Vérifications

| Test | Résultat |
| --- | --- |
| Insertion des 36 formations | ✅ |
| URLs présentes et accessibles dans les cartes | ✅ |
| Regroupement par domaine | ✅ |
| Badges Gratuit / Payant | ✅ |
| Correction du lien Alison « Guide de gestion du temps » | ✅ |
| LiveMentor marqué Payant | ✅ |
| Page publique `formations.html` | ✅ — 50 cartes visibles au total |
| Modification du schéma Supabase | ✅ — aucune modification |

## Publication

La mise à jour front-end est dans le commit `c001efb` (`feat: group training resources by domain`) et le déploiement Netlify `6ab0545ad3d6611195465296` est prêt.

URL : [https://kynect-platform.netlify.app/formations.html](https://kynect-platform.netlify.app/formations.html)
