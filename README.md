# Simulateur — Impact des frais d'une assurance-vie

Simulateur web interactif qui reproduit l'infographie AMF "L'impact des frais sur l'épargne", en rendant chaque paramètre manipulable.

## Variables

- **Capital initial** (0 à 100 000 €)
- **Versement mensuel** (0 à 2 000 €)
- **Durée** (1 à 40 ans)
- **Rendement brut** (2 % à 8 %)
- **Frais d'entrée** (0 % à 5 %)
- **Frais de gestion assurance-vie** (0,2 % à 2 %)
- **Frais courants UC** (0,1 % à 2 %)

## Sorties

- 4 KPIs (capital versé, capital final net, frais totaux, rendement net annualisé)
- Camembert de répartition du gain brut (gain net vs frais)
- Courbe d'évolution dans le temps (capital net, versé, frais cumulés)
- Tableau de détail façon barres AMF

## Méthodologie

- Capitalisation **mensuelle** sur `12 × années` itérations.
- Rendement net mensuel : `(1 + r_brut)^(1/12) / (1 + frais_gestion + frais_UC)^(1/12) − 1`.
- Décomposition exacte des frais : 4 simulations parallèles (toutes / sans entrée / sans UC / sans gestion), puis normalisation pour absorber les effets croisés.
- Rendement net annualisé : formule analytique AMF `(1 + brut) / [(1 + gestion) × (1 + UC)] − 1`.

## Commandes

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build prod
npm run preview  # preview du build
```

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS 3 (tokens OF Finance Design System mappés en variables CSS)
- Recharts (donut + line chart)
- Police Poppins (Google Fonts)

## Design system

Tokens OF Finance importés dans `src/styles/of-tokens.css` et exposés via `tailwind.config.js`. Palette camembert : bleu (gain net), coral (frais d'entrée), amber (UC), violet (gestion AV).
