import { equivalentStructures } from './equivalence';
import type { CheckResult, ReactionProblem, StudentAnswer } from '../types';
export function checkAnswer(p: ReactionProblem, a: StudentAnswer): CheckResult {
 const major=p.products.find(x=>x.role==='major')!;
 const mechanism=a.mechanism===p.intendedMechanism;
 const product=!a.productSmiles || equivalentStructures(a.productSmiles,major.smiles);
 const stereo=!a.stereochemistry || a.stereochemistry===p.stereochemistry;
 const regio=!major.regio || !a.regio || a.regio===major.regio;
 const score=[mechanism,product,stereo,regio].filter(Boolean).length / [mechanism,product,stereo,regio].length;
 if(score===1) return {level:'correct',points:1,message:`Correct. ${p.explanation}`};
 if(mechanism && !product) return {level:'partial',points:.5,message:`Your mechanism choice is sound, but the selected product is not the major ${p.intendedMechanism} outcome. ${p.explanation}`};
 if(!mechanism && product) return {level:'partial',points:.5,message:`You found the major product, but trace the conditions back to ${p.intendedMechanism}. ${p.explanation}`};
 if(mechanism && !stereo) return {level:'partial',points:.5,message:`The connectivity is right, but the stereochemical result should be ${p.stereochemistry}. ${p.explanation}`};
 return {level:'incorrect',points:0,message:`Reconsider the substrate and conditions. ${p.explanation}`};
}
