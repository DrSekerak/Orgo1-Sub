import { describe, expect, it } from 'vitest';
import { classifySubstrate, viableMechanisms } from '../src/chemistry/rules';
import { equivalentStructures } from '../src/chemistry/equivalence';
import { generateProblem, eligibleProblems } from '../src/chemistry/generator';
import { problemBank } from '../src/chemistry/problemBank';
import { checkAnswer } from '../src/chemistry/checker';
describe('introductory chemistry engine',()=>{
 it('classifies representative substrates',()=>{expect(classifySubstrate('CBr')).toBe('methyl');expect(classifySubstrate('CCBr')).toBe('primary');expect(classifySubstrate('CC(C)Br')).toBe('secondary');expect(classifySubstrate('CC(C)(C)Br')).toBe('tertiary')});
 it('selects viable families from conditions',()=>{expect(viableMechanisms({substrateClass:'primary',reagentKind:'strong nucleophile',solvent:'DMSO',temperature:'room'})).toEqual(['SN2']);expect(viableMechanisms({substrateClass:'tertiary',reagentKind:'strong base',solvent:'ethanol',temperature:'heat'})).toEqual(['E2']);expect(viableMechanisms({substrateClass:'tertiary',reagentKind:'weak nucleophile/base',solvent:'water',temperature:'heat'})).toEqual(['E1','SN1'])});
 it('contains reviewed templates for all mechanism families and levels',()=>{for(const m of ['SN1','SN2','E1','E2'])expect(problemBank.some(p=>p.intendedMechanism===m)).toBe(true);for(const d of ['Introductory','Intermediate','Challenge'])expect(problemBank.some(p=>p.difficulty===d)).toBe(true)});
 it('requires the unchanged substrate drawing for curated no-reaction outcomes',()=>{const p=problemBank.find(x=>x.id==='nr-tertiary-iodide')!;expect(p.intendedMechanism).toBe('No reaction');expect(checkAnswer(p,{mechanism:'No reaction',productSmiles:p.substrateSmiles}).level).toBe('correct');expect(checkAnswer(p,{mechanism:'No reaction'}).level).toBe('partial');expect(checkAnswer(p,{mechanism:'SN1',productSmiles:p.substrateSmiles}).level).toBe('partial')});
 it('generates only matching valid problems deterministically',()=>{const s={mechanism:'E2' as const,difficulty:'Challenge' as const,mode:'mixed' as const,concepts:[],seed:9};expect(generateProblem(s).intendedMechanism).toBe('E2');expect(generateProblem(s).id).toBe(generateProblem(s).id);expect(eligibleProblems({...s,concepts:['regioselectivity']}).every(p=>p.concepts.includes('regioselectivity'))).toBe(true)});
 it('checks the mechanism and Ketcher product drawing only',()=>{const p=problemBank.find(x=>x.id==='e2-hofmann')!;expect(checkAnswer(p,{mechanism:'E2',productSmiles:'C=C(C)CC'}).level).toBe('correct');expect(checkAnswer(p,{mechanism:'E2'}).level).toBe('partial');expect(checkAnswer(p,{mechanism:'SN2',productSmiles:'CC=C(C)C'}).level).toBe('incorrect')});
 it('puts heat on every SN1 template',()=>expect(problemBank.filter(p=>p.intendedMechanism==='SN1').every(p=>/heat/i.test(p.temperature))).toBe(true));
 it('recognizes normalized identical structures without raw name comparison',()=>expect(equivalentStructures(' C C I ','CCI')).toBe(true));
});
