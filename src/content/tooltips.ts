export type TooltipContent = {
  title: string;
  body: string;
};

export const tooltips: Record<string, TooltipContent> = {
  initial: {
    title: 'Capital initial',
    body: 'Le montant que vous placez en une seule fois à l\'ouverture du contrat.',
  },
  monthly: {
    title: 'Versement mensuel',
    body: 'Le montant que vous épargnez chaque mois pendant toute la durée du placement.',
  },
  years: {
    title: 'Durée de placement',
    body: 'Le nombre d\'années pendant lesquelles votre capital reste investi avant tout retrait.',
  },
  grossReturn: {
    title: 'Rendement brut',
    body: 'La performance annuelle moyenne du support avant tout prélèvement de frais. C\'est une hypothèse de projection, pas une garantie.',
  },
  entryFee: {
    title: 'Frais d\'entrée',
    body: 'Prélèvement unique sur chaque versement avant qu\'il ne soit investi. L\'effet reste limité car il ne se compose pas dans le temps.',
  },
  mgmtFee: {
    title: 'Frais de gestion (assurance-vie)',
    body: 'Prélèvement annuel par l\'assureur sur l\'encours total. Plus le capital grandit, plus il prélève — c\'est l\'un des postes les plus dévastateurs sur le long terme.',
  },
  ucFee: {
    title: 'Frais courants (supports UC)',
    body: 'Prélèvement annuel du fonds lui-même, déduit avant publication de la performance. Il compose silencieusement contre vous, année après année.',
  },
};
