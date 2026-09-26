import type { Mechanism, ReactionProblem } from '../types';
/** Narrow, auditable introductory rules. Add templates only after instructor review. */
export function classifySubstrate(smiles: string): ReactionProblem['substrateClass'] {
  if (smiles === 'CBr') return 'methyl';
  if (smiles.includes('C(C)(C)')) return 'tertiary';
  if (smiles.includes('C=C')) return 'allylic';
  if (smiles.includes('C(C)')) return 'secondary';
  return 'primary';
}
export function viableMechanisms(p: Pick<ReactionProblem,'substrateClass'|'reagentKind'|'solvent'|'temperature'>): Mechanism[] {
  const s=p.substrateClass, r=p.reagentKind; const hot=/heat|reflux|warm/i.test(p.temperature);
  if (r === 'strong nucleophile') return s === 'tertiary' ? [] : s === 'secondary' ? ['SN2','E2'] : ['SN2'];
  if (r === 'strong base' || r === 'bulky strong base') return s === 'methyl' ? ['SN2'] : s === 'primary' ? ['SN2','E2'] : ['E2'];
  if (r === 'weak nucleophile/base' && (s === 'tertiary'||s === 'secondary'||s === 'allylic')) return hot ? ['E1','SN1'] : ['SN1','E1'];
  return [];
}
export function expectedRegio(p: ReactionProblem) { return p.products.find(x=>x.role==='major')?.regio; }
