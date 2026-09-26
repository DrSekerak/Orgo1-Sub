import type { ReactionProblem } from '../types';

const hints = (problem: Omit<ReactionProblem, 'hints'>): string[] => [
  `Start with the ${problem.substrateClass} carbon bearing ${problem.leavingGroup}.`,
  `${problem.reagent} is a ${problem.reagentKind}.`,
  `Compare ${problem.mechanisms.join(' and ')} before deciding.`,
  problem.intendedMechanism === 'No reaction'
    ? 'No reaction means the product drawing is the unchanged starting material.'
    : `Follow the ${problem.intendedMechanism} pathway to draw the substitution product.`,
];
const p = (problem: Omit<ReactionProblem, 'hints'>): ReactionProblem => ({ ...problem, hints: hints(problem) });

/** Instructor-reviewed SN1, SN2, and no-reaction templates only. */
export const problemBank: ReactionProblem[] = [
  p({
    id: 'nr-tertiary-iodide', title: 'Hindered carbon, non-ionizing medium',
    substrate: 'tert-Butyl chloride', substrateSmiles: 'CC(C)(C)Cl', substrateClass: 'tertiary', leavingGroup: 'Cl',
    reagent: 'sodium iodide', reagentKind: 'strong nucleophile', solvent: 'acetone (polar aprotic)', temperature: 'room temperature',
    mechanisms: ['No reaction'], intendedMechanism: 'No reaction', products: [{ name: 'No reaction', smiles: 'NO_REACTION', role: 'major' }], stereochemistry: 'Not applicable', difficulty: 'Introductory',
    concepts: ['no reaction', 'SN1 vs SN2', 'strong nucleophiles'], features: ['tertiary substrate blocks SN2', 'iodide is a strong nucleophile but weak base', 'acetone does not promote ionization'],
    explanation: 'A tertiary carbon is too hindered for SN2. Acetone does not support carbocation-forming solvolysis, so no useful introductory SN1 or SN2 pathway occurs.'
  }),
  p({
    id: 'nr-primary-methanol', title: 'A weak nucleophile at a primary carbon',
    substrate: '1-bromobutane', substrateSmiles: 'CCCCBr', substrateClass: 'primary', leavingGroup: 'Br',
    reagent: 'methanol', reagentKind: 'weak nucleophile', solvent: 'methanol (polar protic)', temperature: 'room temperature',
    mechanisms: ['No reaction'], intendedMechanism: 'No reaction', products: [{ name: 'No reaction', smiles: 'NO_REACTION', role: 'major' }], stereochemistry: 'Not applicable', difficulty: 'Introductory',
    concepts: ['no reaction', 'weak nucleophiles', 'SN1 vs SN2'], features: ['primary substrate cannot ionize favorably', 'weak neutral nucleophile'],
    explanation: 'Methanol is not sufficiently nucleophilic for a useful introductory SN2 reaction here, and a primary carbocation is too unstable for SN1.'
  }),
  p({
    id: 'nr-unactivated-alcohol', title: 'A poor leaving group prevents substitution',
    substrate: 'tert-Butanol', substrateSmiles: 'CC(C)(C)O', substrateClass: 'tertiary', leavingGroup: 'OH (unactivated)',
    reagent: 'water', reagentKind: 'weak nucleophile', solvent: 'water', temperature: 'room temperature',
    mechanisms: ['No reaction'], intendedMechanism: 'No reaction', products: [{ name: 'No reaction', smiles: 'NO_REACTION', role: 'major' }], stereochemistry: 'Not applicable', difficulty: 'Intermediate',
    concepts: ['no reaction', 'weak nucleophiles'], features: ['unactivated hydroxyl is a poor leaving group', 'weak neutral nucleophile'],
    explanation: 'An alcohol needs activation before hydroxide can leave. Water alone does not provide a useful SN1 or SN2 substitution pathway.'
  }),
  p({
    id: 'nr-secondary-alcohol-iodide', title: 'Strong nucleophile, unusable leaving group',
    substrate: '2-butanol', substrateSmiles: 'CCC(C)O', substrateClass: 'secondary', leavingGroup: 'OH (unactivated)',
    reagent: 'sodium iodide', reagentKind: 'strong nucleophile', solvent: 'acetone (polar aprotic)', temperature: 'room temperature',
    mechanisms: ['No reaction'], intendedMechanism: 'No reaction', products: [{ name: 'No reaction', smiles: 'NO_REACTION', role: 'major' }], stereochemistry: 'Not applicable', difficulty: 'Challenge',
    concepts: ['no reaction', 'strong nucleophiles'], features: ['iodide is a strong nucleophile', 'unactivated hydroxyl cannot leave'],
    explanation: 'A strong nucleophile cannot compensate for an unactivated hydroxyl leaving group. Under these conditions, redraw the starting material.'
  }),
  p({
    id: 'sn2-ethyl-iodide', title: 'A clean backside attack',
    substrate: 'Bromoethane', substrateSmiles: 'CCBr', substrateClass: 'primary', leavingGroup: 'Br',
    reagent: 'sodium iodide', reagentKind: 'strong nucleophile', solvent: 'acetone (polar aprotic)', temperature: 'room temperature',
    mechanisms: ['SN2'], intendedMechanism: 'SN2', products: [{ name: 'Iodoethane', smiles: 'CCI', role: 'major' }], stereochemistry: 'Not applicable', difficulty: 'Introductory',
    concepts: ['SN1 vs SN2', 'strong nucleophiles', 'polar aprotic solvent'], features: ['primary substrate', 'iodide is a strong nucleophile', 'polar aprotic solvent'],
    explanation: 'Iodide can attack the accessible primary carbon from the back. Acetone supports nucleophilicity and does not promote ionization, so SN2 is favored.'
  }),
  p({
    id: 'sn2-methyl-methoxide', title: 'Methyl is unhindered',
    substrate: 'Methyl iodide', substrateSmiles: 'CI', substrateClass: 'methyl', leavingGroup: 'I',
    reagent: 'sodium methoxide', reagentKind: 'strong nucleophile', solvent: 'DMF (polar aprotic)', temperature: 'room temperature',
    mechanisms: ['SN2'], intendedMechanism: 'SN2', products: [{ name: 'Dimethyl ether', smiles: 'COC', role: 'major' }], stereochemistry: 'Not applicable', difficulty: 'Introductory',
    concepts: ['SN1 vs SN2', 'strong nucleophiles', 'polar aprotic solvent'], features: ['methyl substrate', 'methoxide is a strong nucleophile', 'excellent leaving group'],
    explanation: 'Methyl is maximally accessible to backside attack. Methoxide displaces iodide in a single SN2 step.'
  }),
  p({
    id: 'sn2-chiral-cyanide', title: 'Stereospecific substitution',
    substrate: '(S)-2-bromobutane', substrateSmiles: 'C[C@H](Br)CC', substrateClass: 'secondary', leavingGroup: 'Br',
    reagent: 'sodium cyanide', reagentKind: 'strong nucleophile', solvent: 'DMSO (polar aprotic)', temperature: 'room temperature',
    mechanisms: ['SN2'], intendedMechanism: 'SN2', products: [{ name: '(R)-2-cyanobutane', smiles: 'CC[C@@H](C)C#N', role: 'major' }], stereochemistry: 'Inversion', difficulty: 'Intermediate',
    concepts: ['SN1 vs SN2', 'strong nucleophiles', 'polar aprotic solvent'], features: ['selected secondary substrate', 'cyanide is a strong nucleophile', 'polar aprotic solvent'],
    explanation: 'Cyanide performs backside attack in one step. Draw the product with inversion at the reacting carbon.'
  }),
  p({
    id: 'sn2-secondary-azide', title: 'Strong nucleophile in polar aprotic solvent',
    substrate: '2-bromobutane', substrateSmiles: 'CCC(C)Br', substrateClass: 'secondary', leavingGroup: 'Br',
    reagent: 'sodium azide', reagentKind: 'strong nucleophile', solvent: 'DMF (polar aprotic)', temperature: 'cool',
    mechanisms: ['SN2'], intendedMechanism: 'SN2', products: [{ name: '2-azidobutane', smiles: 'CCC(C)N=[N+]=[N-]', role: 'major' }], stereochemistry: 'Not stereospecific', difficulty: 'Challenge',
    concepts: ['SN1 vs SN2', 'strong nucleophiles', 'polar aprotic solvent'], features: ['selected secondary substrate', 'azide is a strong nucleophile', 'cool polar aprotic conditions'],
    explanation: 'Azide is a strong nucleophile, and cool DMF conditions support substitution at this selected secondary substrate.'
  }),
  p({
    id: 'sn1-tertbutyl-water', title: 'A stable carbocation',
    substrate: 'tert-Butyl chloride', substrateSmiles: 'CC(C)(C)Cl', substrateClass: 'tertiary', leavingGroup: 'Cl',
    reagent: 'water', reagentKind: 'weak nucleophile', solvent: 'water (polar protic)', temperature: 'heat',
    mechanisms: ['SN1'], intendedMechanism: 'SN1', products: [{ name: 'tert-Butanol', smiles: 'CC(C)(C)O', role: 'major' }], stereochemistry: 'Not applicable', difficulty: 'Introductory',
    concepts: ['SN1 vs SN2', 'weak nucleophiles', 'carbocation stability'], features: ['tertiary substrate', 'water is a weak nucleophile', 'ionizing protic medium'],
    explanation: 'Loss of chloride produces a stable tertiary carbocation. Water then captures it, so SN1 is the intended pathway.'
  }),
  p({
    id: 'sn1-racemize-ethanol', title: 'Planar carbocation intermediate',
    substrate: '(R)-3-bromo-3-methylhexane', substrateSmiles: 'CC[C@](Br)(C)CCC', substrateClass: 'tertiary', leavingGroup: 'Br',
    reagent: 'ethanol', reagentKind: 'weak nucleophile', solvent: 'ethanol (polar protic)', temperature: 'heat',
    mechanisms: ['SN1'], intendedMechanism: 'SN1', products: [{ name: '3-ethoxy-3-methylhexane', smiles: 'CCC(C)(OCC)CCC', role: 'major' }], stereochemistry: 'Racemization', difficulty: 'Intermediate',
    concepts: ['SN1 vs SN2', 'weak nucleophiles', 'carbocation stability'], features: ['tertiary chiral center', 'ethanol is a weak nucleophile', 'protic solvent'],
    explanation: 'Ionization gives a planar tertiary carbocation. Ethanol captures that intermediate to give the substitution product.'
  }),
  p({
    id: 'sn1-allylic-methanol', title: 'Resonance helps ionization',
    substrate: '3-bromo-3-methyl-1-butene', substrateSmiles: 'C=C(C)CBr', substrateClass: 'allylic', leavingGroup: 'Br',
    reagent: 'methanol', reagentKind: 'weak nucleophile', solvent: 'methanol (polar protic)', temperature: 'heat',
    mechanisms: ['SN1'], intendedMechanism: 'SN1', products: [{ name: 'Allylic methyl ether', smiles: 'C=C(C)COC', role: 'major' }], stereochemistry: 'Not applicable', difficulty: 'Challenge',
    concepts: ['SN1 vs SN2', 'weak nucleophiles', 'carbocation stability'], features: ['allylic stabilization', 'methanol is a weak nucleophile', 'protic solvent'],
    explanation: 'The allylic carbocation is resonance-stabilized, so methanol can trap it through the SN1 pathway.'
  }),
];
