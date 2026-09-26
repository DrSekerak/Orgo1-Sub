import type { Difficulty, Mechanism } from '../types';
export const instructorConfig = {
  enabledMechanisms: ['SN1','SN2'] as Mechanism[],
  allowNoReaction: true,
  enabledDifficulties: ['Introductory','Intermediate','Challenge'] as Difficulty[],
  // Edit these to constrain the bank for a section or create distributions in generator.ts.
  allowedSubstrateClasses: ['methyl','primary','secondary','tertiary','allylic'],
  feedback: { correct: 'Sound mechanistic reasoning. Carry that same sequence into the next reaction.', partial: 'You have part of the reasoning; use the reaction decision guide to isolate the remaining factor.' },
  learningObjectives: ['Classify a substrate', 'Distinguish strong and weak nucleophiles', 'Compare SN1 and SN2', 'Predict substitution products']
} as const;
