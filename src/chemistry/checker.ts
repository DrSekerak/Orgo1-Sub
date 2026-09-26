import { equivalentStructures } from './equivalence';
import type { CheckResult, ReactionProblem, StudentAnswer } from '../types';
export function checkAnswer(p: ReactionProblem, a: StudentAnswer): CheckResult {
 const major=p.products.find(x=>x.role==='major')!;
 const expectedStructure=p.intendedMechanism==='No reaction' ? p.substrateSmiles : major.smiles;
 const mechanism=a.mechanism===p.intendedMechanism;
 const product=Boolean(a.productSmiles) && (a.productIsStructureEquivalent ?? equivalentStructures(a.productSmiles,expectedStructure));
 const score=[mechanism,product].filter(Boolean).length / 2;
 if(score===1) return {level:'correct',points:1,message:`Correct. ${p.explanation}`};
 if(mechanism && !product) return {level:'partial',points:.5,message:p.intendedMechanism==='No reaction'
  ? `Your mechanism choice is sound. For no reaction, draw the unchanged starting material in Ketcher. ${p.explanation}`
  : `Your mechanism choice is sound, but the drawing is not the major ${p.intendedMechanism} product. ${p.explanation}`};
 if(!mechanism && product) return {level:'partial',points:.5,message:`You found the major product, but trace the conditions back to ${p.intendedMechanism}. ${p.explanation}`};
 return {level:'incorrect',points:0,message:`Reconsider the substrate and conditions. ${p.explanation}`};
}
