import { describe, expect, it } from 'vitest';
import { classifySubstrate, viableMechanisms } from '../src/chemistry/rules';
import { equivalentStructures } from '../src/chemistry/equivalence';
import { generateProblem, eligibleProblems } from '../src/chemistry/generator';
import { problemBank } from '../src/chemistry/problemBank';
import { checkAnswer } from '../src/chemistry/checker';
describe('introductory chemistry engine',()=>{
 it('classifies representative substrates',()=>{expect(classifySubstrate('CBr')).toBe('methyl');expect(classifySubstrate('CCBr')).toBe('primary');expect(classifySubstrate('CC(C)Br')).toBe('secondary');expect(classifySubstrate('CC(C)(C)Br')).toBe('tertiary')});
 it('selects SN1 or SN2 only from reviewed substitution conditions',()=>{expect(viableMechanisms({substrateClass:'primary',reagentKind:'strong nucleophile',solvent:'DMSO',temperature:'room'})).toEqual(['SN2']);expect(viableMechanisms({substrateClass:'tertiary',reagentKind:'strong nucleophile',solvent:'acetone',temperature:'room'})).toEqual([]);expect(viableMechanisms({substrateClass:'tertiary',reagentKind:'weak nucleophile',solvent:'water',temperature:'heat'})).toEqual(['SN1'])});
 it('contains only reviewed SN1, SN2, and no-reaction templates at every level',()=>{for(const m of ['SN1','SN2','No reaction'])expect(problemBank.some(p=>p.intendedMechanism===m)).toBe(true);expect(problemBank.every(p=>['SN1','SN2','No reaction'].includes(p.intendedMechanism))).toBe(true);for(const d of ['Introductory','Intermediate','Challenge'])expect(problemBank.some(p=>p.difficulty===d)).toBe(true)});
 it('requires the unchanged substrate drawing for curated no-reaction outcomes',()=>{const p=problemBank.find(x=>x.id==='nr-tertiary-iodide')!;expect(p.intendedMechanism).toBe('No reaction');expect(checkAnswer(p,{mechanism:'No reaction',productSmiles:p.substrateSmiles}).level).toBe('correct');expect(checkAnswer(p,{mechanism:'No reaction'}).level).toBe('partial');expect(checkAnswer(p,{mechanism:'SN1',productSmiles:p.substrateSmiles}).level).toBe('partial')});
 it('generates only matching valid problems deterministically',()=>{const s={mechanism:'SN2' as const,difficulty:'Challenge' as const,concepts:[],seed:9};expect(generateProblem(s).intendedMechanism).toBe('SN2');expect(generateProblem(s).id).toBe(generateProblem(s).id);expect(eligibleProblems({...s,concepts:['strong nucleophiles']}).every(p=>p.concepts.includes('strong nucleophiles'))).toBe(true)});
 it('checks the mechanism and Ketcher product drawing only',()=>{const p=problemBank.find(x=>x.id==='sn2-secondary-azide')!;expect(checkAnswer(p,{mechanism:'SN2',productSmiles:'CCC(C)N=[N+]=[N-]'}).level).toBe('correct');expect(checkAnswer(p,{mechanism:'SN2'}).level).toBe('partial');expect(checkAnswer(p,{mechanism:'SN1',productSmiles:'CCI'}).level).toBe('incorrect')});
 it('puts heat on every SN1 template',()=>expect(problemBank.filter(p=>p.intendedMechanism==='SN1').every(p=>/heat/i.test(p.temperature))).toBe(true));
 it('recognizes normalized identical structures without raw name comparison',()=>expect(equivalentStructures(' C C I ','CCI')).toBe(true));
});
