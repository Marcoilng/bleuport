# Marco Ilunga — Portfolio

Portfolio éditorial mono-page pour Marco Ilunga, avec une direction artistique noir, papier et bleu électrique. Le site combine une typographie expressive, un avatar IT non identifiable, une navigation fixe, des animations au défilement et une présentation de projets web.

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
- `src/styles.css` contient la direction artistique responsive, le système d’identité et les animations.
- `public/marco-logo.svg` est le logo adaptable de Marco Ilunga, utilisable en favicon ou dans des interfaces claires/sombres.
- `public/manus-routes.json` déclare la route publique `/`.
- `app.config.ts` porte le logo de projet utilisé par la plateforme.

L’avatar IT est une image de démonstration non identifiable et peut rester en place tant qu’une photo personnelle n’est pas souhaitée. Le contenu du dépôt privé `the-mulopwe` n’a pas encore pu être importé car GitHub renvoie actuellement une page 404 non authentifiée pour cette session.
