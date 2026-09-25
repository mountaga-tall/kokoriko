# Kokoriko — site multipage

Site statique pour GitHub Pages.

## Inclus
- Accueil avec effet visuel immersif
- Menu complet + recherche + filtres par catégorie
- Panier avec sauvegarde `localStorage`
- Formule menu à **+1 500 FCFA** (Frites & Boisson)
- Passage de commande par WhatsApp
- Préparation d'un e-mail de commande
- Pages Accueil, Menu, Kokoriko, Contact et Panier
- Design responsive mobile / tablette / desktop
- Aucun framework ni build nécessaire

## Coordonnées intégrées
- WhatsApp / téléphone : +221 78 835 06 06
- E-mail : kokoriko221@gmail.com

## Logo et photos
Le site reste fonctionnel sans les fichiers visuels définitifs et affiche un fallback « K ». Pour intégrer le vrai logo fourni, déposer `logokok.jpeg` dans `assets/`.

Les 3 photos originales du menu peuvent également être déposées dans `assets/` puis intégrées dans les emplacements visuels prévus.

## GitHub Pages
GitHub Pages peut publier directement des fichiers statiques depuis une branche et le dossier racine `/`. Le fichier `index.html` est déjà à la racine et `.nojekyll` est inclus.

1. Copier le contenu de ce ZIP dans le dépôt GitHub.
2. Ouvrir `Settings → Pages`.
3. Dans `Build and deployment`, choisir `Deploy from a branch`.
4. Choisir la branche principale et `/(root)`, puis enregistrer.

## Domaine personnalisé plus tard
1. Dans `Settings → Pages`, renseigner le domaine dans `Custom domain`.
2. Pour un domaine racine (`exemple.com`), configurer chez le registrar les enregistrements DNS demandés par GitHub, typiquement `A`, `ALIAS` ou `ANAME` selon le fournisseur.
3. Pour `www.exemple.com`, configurer un enregistrement `CNAME` vers la cible GitHub indiquée par GitHub Pages.
4. GitHub recommande de vérifier le domaine avant de l'associer pour renforcer la sécurité.

Les changements DNS peuvent prendre jusqu'à 24 heures à se propager.
