# KOKORIKO — CHARTE ÉDITORIALE & GRAPHIQUE

## 1. ADN DE MARQUE

**Kokoriko Street Grill** doit être perçu comme une adresse de street-food généreuse, énergique et immédiatement reconnaissable.

La marque repose sur 3 idées simples :
- **CROUSTILLANT** : texture, gourmandise, envie immédiate.
- **GÉNÉREUX** : portions, ton direct, expérience sans complication.
- **URBAIN** : look contemporain, mouvement, commandes rapides.

Signature éditoriale recommandée :
> **Le goût qui fait croustiller.**

Tonalité : directe, chaleureuse, gourmande, complice. On parle comme une enseigne qui connaît son produit : phrases courtes, verbes d'action, vocabulaire concret.

À privilégier : « Choisis ton kiff. », « Commander maintenant », « Ajoute au panier », « Croustillant », « Généreux », « Prêt à partir ».

À éviter : formulations trop institutionnelles, vocabulaire trop technique, longs paragraphes commerciaux ou promesses non vérifiables.

## 2. LOGO

Le logo fourni est la référence principale :
**KOKORIKO** en noir, avec le **K** accentué en orange, et la signature **STREET GRILL**.

Règles :
- conserver les proportions originales ;
- ne jamais étirer, incliner ou recolorer le logo ;
- privilégier un support blanc ou ivoire très clair ;
- garder une zone de respiration visible autour du logo ;
- utiliser `assets/logokok-cropped.webp` pour l'interface afin d'éviter les grandes marges blanches inutiles de l'ancien fichier ;
- conserver `assets/logokok.webp` comme source d'origine.

## 3. PALETTE

- **Noir principal** : `#171717`
- **Orange Kokoriko** : `#C75A1C`
- **Orange clair** : `#E97532`
- **Ivoire** : `#FFFDF9`
- **Blanc** : `#FFFFFF`
- **Gris texte** : `#6C6862`

L'orange sert aux actions, prix, accents, états actifs et micro-détails. Le noir porte la personnalité. Le blanc/ivoire apporte la respiration.

## 4. TYPOGRAPHIE

Hiérarchie :
- Titres : système sans-serif gras, serré et très contrasté.
- Corps : système sans-serif lisible.
- Micro-texte : capitales espacées pour les labels, catégories et signatures.

Principe : **gros titre + beaucoup d'air + accent orange**, plutôt que surcharge visuelle.

## 5. DIRECTION VISUELLE DU SITE

Le site utilise désormais :
- fond blanc/ivoire ;
- cartes blanches avec bordures fines ;
- ombres douces ;
- accents orange ;
- hero à fort impact avec lumière orange ;
- animations courtes et fluides ;
- effet de brillance au survol du logo et des cartes ;
- bandeau typographique animé ;
- loader de marque affiché une seule fois à la première ouverture de la session.

Les animations doivent toujours rester discrètes sur mobile et être désactivées lorsque `prefers-reduced-motion` est demandé.

## 6. EXPÉRIENCE UTILISATEUR

Le parcours prioritaire est :

**Découvrir → choisir → ajuster → panier → WhatsApp.**

Les CTA doivent rester visibles et explicites. Le panier doit rester compréhensible sans explication.

## 7. ASSETS & CHEMINS

Tous les médias locaux utilisés par le site sont dans `assets/`.

Chemins de référence :
- `assets/logokok.webp`
- `assets/logokok-cropped.webp`
- `assets/icon-192.png`
- `assets/icon-512.png`

Les icônes PWA ont été normalisées en vrais formats **192×192** et **512×512**.

## 8. CHECKLIST AVANT MISE EN LIGNE

- logo visible sur accueil, menu, à-propos, contact et panier ;
- aucun chemin `logokok.jpeg` restant ;
- menu, filtres, recherche et panier fonctionnels ;
- WhatsApp génère le récapitulatif complet ;
- service worker passe en `kokoriko-v3` ;
- PWA charge les deux icônes ;
- affichage mobile vérifié ;
- animations compatibles avec `prefers-reduced-motion`.
