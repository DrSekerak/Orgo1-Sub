import { instructorConfig } from '../config/instructorConfig';
import { problemBank } from './problemBank';
import type { AnswerMechanism, Difficulty, ReactionProblem } from '../types';
export interface Selection { mechanism: AnswerMechanism|'Mixed'; difficulty: Difficulty; concepts: string[]; seed?: number; }
/** Deterministic rotation, not random chemistry: filters only instructor-reviewed templates. */
export function eligibleProblems(s: Selection) {
 return problemBank.filter(p => (p.intendedMechanism === 'No reaction' ? instructorConfig.allowNoReaction : instructorConfig.enabledMechanisms.includes(p.intendedMechanism)) && instructorConfig.enabledDifficulties.includes(p.difficulty) &&
   (s.mechanism === 'Mixed' || p.intendedMechanism === s.mechanism) && p.difficulty === s.difficulty &&
   (!s.concepts.length || s.concepts.some(c=>p.concepts.includes(c))));
}
export function generateProblem(s: Selection): ReactionProblem {
 const eligible=eligibleProblems(s); if (!eligible.length) throw new Error('No validated template matches this selection. Adjust the difficulty or concept filter.');
 const i=Math.abs(s.seed ?? Date.now()) % eligible.length; return eligible[i];
}
