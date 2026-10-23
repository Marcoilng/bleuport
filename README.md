# Bleuport

Portfolio éditorial mono-page inspiré des portfolios créatifs à forte direction artistique. Le site mélange une typographie expressive, une palette papier/encre/bleu électrique, des images éditoriales, une navigation fixe et des animations au défilement.

## Développement

```bash
pnpm install
pnpm dev
```

Le site est disponible sur le port `3000`.

## Production

```bash
pnpm build
pnpm preview
```

## Structure

- `src/main.jsx` contient la structure React, les données de projets et les interactions.
- `src/styles.css` contient la direction artistique responsive, les composants visuels et les animations.
- `public/manus-routes.json` déclare la route publique `/`.
- `app.config.ts` porte le logo de projet utilisé par la plateforme.

Les images de démonstration sont des visuels éditoriaux externes et pourront être remplacés par les portraits, logos et projets réels lors de la prochaine passe de personnalisation.
