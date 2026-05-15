# 🎴 EVJFG Claire & Nico — Brief pour Claude Code

## 🎯 Objectif

Construire un **site web statique en HTML/CSS/JS** (un seul fichier `index.html` idéalement) qui sert de présentation interactive "Devine le Pokémon" pour un EVJFG. Le site doit fonctionner comme un diapo : navigation slide par slide avec les flèches du clavier ou clic.

## 📦 Ce qui est fourni

3 fichiers sources :
- **`content.js`** → les données des 15 mashups Pokémon (noms, types, attaques, indices, flavor text, etc.)
- **`card_template.js`** → le template HTML/CSS d'une carte Pokémon Sun & Moon (avec gestion des types et couleurs)
- **Ce README** → spec du projet

## 🏗️ Structure attendue du site

Un site HTML qui présente, dans l'ordre :

1. **Slide 1 — Page de titre**
   - Fond rouge Pokémon (`#DC0A2D`)
   - Texte "DEVINE LE POKÉMON" en gros jaune (`#FFCB05`)
   - Sous-titre "Édition spéciale EVJFG"
   - "Claire & Nico" en blanc
   - "Saurez-vous tous les attraper ?" en italique

2. **Slide 2 — Règles du jeu**
   - 3 cartes côte à côte :
     - "1. LA SILHOUETTE" — une silhouette mystère apparaît avec 3 indices
     - "2. VOS PARIS" — à vos cris ! Quel Pokémon se cache derrière ?
     - "3. RÉVÉLATION" — on découvre le mashup, sa fiche Pokédex et son attaque signature

3. **Slides 3 à 30 — 14 paires (silhouette + révélation)**
   Pour chaque mashup `1` à `14` du fichier `content.js` :

   a. **Slide silhouette** (fond noir, bandeau jaune en haut "N°XX · QUI EST-CE ?") :
      - Zone gauche : une silhouette noire du Pokémon de base (`m.pokemonBase`) sur fond gris foncé. Placeholder `[SILHOUETTE]` avec mention `Insérer la silhouette noire de {pokemonBase}` si l'image manque
      - Zone droite : panneau crème avec bandeau rouge "INDICES" + les 3 indices numérotés (`m.indices[]`)

   b. **Slide révélation** (fond rouge, bandeau jaune en haut "N°XX · RÉVÉLATION !") :
      - Zone gauche : la **carte Pokémon** générée à partir du template (cf. section suivante)
      - Zone droite : nom du mashup en gros jaune + "Évolution de {pokemonBase}" en blanc italique + flavor text entre guillemets + une "boîte attaque signature" en bas avec le nom de l'attaque

4. **Slide 31 — Famille Nidoran** (le mashup `15`)
   - À gauche : la carte famille (type fairy, rose)
   - À droite : titre "LA FAMILLE NIDORAN" + 4 mini-cartes en grille 2×2 :
     - NIDOKING = Nico
     - NIDOQUEEN = Claire
     - NIDORAN ♀ = Pomme (5 ans)
     - NIDORAN ♀ = Dune (4 ans, **fille aussi, donc Nidoran femelle**)

5. **Slide 32 — Closing**
   - Fond jaune
   - "À CLAIRE & NICO !" en gros rouge
   - "Que votre mariage soit aussi mythique qu'un Mew chromatique 💍"
   - "— Toute la team —"

## 🎴 Le template de carte Pokémon

Le fichier `card_template.js` contient déjà la fonction `buildCardHTML(mashup)` qui retourne un document HTML complet d'une carte Pokémon Sun & Moon stylée selon son type. **Tu peux extraire le CSS et l'adapter** pour qu'il s'intègre dans la page principale plutôt que d'être un fichier HTML séparé.

**Le template gère 10 types** (chaque type a son gradient et ses couleurs) :
- `fighting` (orange désert) — Machoke, Hitmonlee
- `fire` (orange flammes) — Ponyta
- `water` (bleu) — Omanyte
- `lightning` (jaune) — Magneton
- `grass` (vert) — Scyther, Butterfree, Ledyba
- `psychic` (violet) — Mr. Mime, Jynx, Alakazam
- `darkness` (turquoise foncé) — Muk
- `colorless` (crème iridescent) — Snorlax
- `fairy` (rose) — Togepi, famille Nidoran
- `metal` (gris) — non utilisé ici mais présent

Chaque carte contient :
- Header : stage badge (BASIC / STAGE 1 / STAGE 2), nom du Pokémon, HP, badge type
- Bandeau "Evolves from X" si applicable
- Zone artwork (placeholder `[ MONTAGE PHOTO ]` avec mention `{pokemonBase} + {target}`)
- Bandeau Pokédex (NO. XXXX, espèce, taille, poids)
- Zone attaque : icônes de coût en énergies, nom attaque, dégâts, texte de l'attaque
- Bandeau bas : weakness + retreat
- Footer : "Illus. EVJFG Squad" + rareté ◇ ◇ + flavor text

## ⌨️ Comportement attendu

- **Navigation** : flèches gauche/droite du clavier pour avancer/reculer dans les slides
- **Clic** : clic sur le côté droit/gauche de l'écran pour avancer/reculer aussi
- **Compteur** : affiche "Slide X / 32" en bas
- **Plein écran** : touche F ou un bouton plein écran
- **Optionnel mais cool** :
  - Touche `H` pour cacher/afficher le compteur
  - Animation de transition (fade ou slide)
  - Pour les slides révélation, animation "ta-da" quand on arrive dessus (légère scale-up de la carte)

## 🖼️ Gestion des images

Pour chaque mashup, il y a 2 zones d'image potentielles :
- **silhouette** : sur la slide indice (silhouette noire du Pokémon de base)
- **mashup** : sur la slide révélation, au centre de la carte (montage Pokémon + tête du sujet)

Pour la famille (mashup 15), 4 images mashup (Nidoking, Nidoqueen, 2 Nidoran).

**Comportement** : si une image est présente dans le dossier `images/`, elle est affichée ; sinon, le placeholder s'affiche.

Structure attendue :
```
images/
  silhouettes/
    01_machoke.png
    02_ponyta.png
    ...
    14_hitmonlee.png
  mashups/
    01_nicogneur.png
    02_pimentita.png
    ...
    14_kiclaire.png
    15a_nidoking.png    (Nico)
    15b_nidoqueen.png   (Claire)
    15c_pomme.png       (Pomme)
    15d_dune.png        (Dune)
```

Le code doit charger l'image si elle existe, sinon afficher le placeholder. (Côté JS : `<img>` avec un `onerror` qui montre le placeholder.)

## 🎨 Polices

- Titre : Impact ou équivalent (Anton de Google Fonts est un bon proxy)
- Nom de carte Pokémon : Roboto Black ou Anton (très bold)
- Body : Roboto / Arial

## 📐 Format

- Cible : présentation en plein écran 16:9
- Resolution de référence : 1920×1080 (mais doit être responsive)
- Pas besoin de mobile-first, c'est pour être projeté

## 🔧 Stack technique recommandée

- HTML / CSS / Vanilla JS (pas besoin de framework)
- Tout dans un seul `index.html` si possible (CSS inline ou dans `<style>`)
- Polyglotte FR (les textes sont en français)
- Pas de backend, juste un site statique servable depuis n'importe où

## ✅ Checklist livraison

- [ ] `index.html` qui fonctionne en ouvrant simplement le fichier dans le navigateur
- [ ] Les 15 cartes Pokémon générées dynamiquement à partir de `content.js`
- [ ] Navigation clavier + clic
- [ ] Placeholder qui s'affiche si l'image n'est pas dans `/images/`
- [ ] Bonus : un bouton "Export PNG" sur chaque carte qui télécharge la carte en haute résolution (avec html2canvas par exemple) — utile si je veux imprimer les cartes après

## 💡 Notes contexte

- Claire et Nico sont product designers, ensemble depuis 14 ans, 2 filles (Pomme et Dune)
- Le ton est bon enfant, tacles gentils, pas trash
- Le diapo sera présenté pendant un EVJFG conjoint (les deux mariés sont là ensemble)
- Les invités joueront en équipe ou en cris à deviner les Pokémon

Bon build ! 🎉
