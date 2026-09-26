export type Mechanism = 'SN1' | 'SN2';
export type AnswerMechanism = Mechanism | 'No reaction';
export type Difficulty = 'Introductory' | 'Intermediate' | 'Challenge';
export type Stereo = 'Inversion' | 'Racemization' | 'Not stereospecific' | 'Anti elimination' | 'Not applicable';
export interface Product { name: string; smiles: string; role: 'major' | 'minor'; regio?: 'Zaitsev' | 'Hofmann'; }
export interface ReactionProblem {
 id: string; title: string; substrate: string; substrateSmiles: string; substrateClass: 'methyl'|'primary'|'secondary'|'tertiary'|'allylic'; leavingGroup: string;
 reagent: string; reagentKind: 'strong nucleophile'|'weak nucleophile'; solvent: string; temperature: string;
 mechanisms: AnswerMechanism[]; intendedMechanism: AnswerMechanism; products: Product[]; stereochemistry: Stereo; difficulty: Difficulty; concepts: string[];
 explanation: string; features: string[]; hints: string[];
}
export interface StudentAnswer { mechanism?: AnswerMechanism; productSmiles?: string; productIsStructureEquivalent?: boolean; stereochemistry?: Stereo; regio?: 'Zaitsev'|'Hofmann'; explanation?: string; }
export interface CheckResult { level: 'correct'|'partial'|'incorrect'; message: string; points: number; }
export interface Progress { attempted: number; correct: number; byMechanism: Partial<Record<AnswerMechanism,{attempted:number;correct:number}>>; byConcept: Record<string,{attempted:number;correct:number}>; mistakes: string[]; }
