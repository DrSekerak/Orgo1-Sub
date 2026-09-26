import type { Progress, ReactionProblem } from '../types';
const key='mechanism-lab-progress-v1';
export const emptyProgress=():Progress=>({attempted:0,correct:0,byMechanism:{},byConcept:{},mistakes:[]});
export const loadProgress=():Progress=>{ try{return JSON.parse(localStorage.getItem(key)||'') as Progress}catch{return emptyProgress()} };
export const saveProgress=(p:Progress)=>localStorage.setItem(key,JSON.stringify(p));
export function record(p:Progress, problem:ReactionProblem, correct:boolean):Progress { const n=structuredClone(p); n.attempted++; n.correct+=Number(correct); const m=n.byMechanism[problem.intendedMechanism]??={attempted:0,correct:0};m.attempted++;m.correct+=Number(correct); for(const c of problem.concepts){const x=n.byConcept[c]??={attempted:0,correct:0};x.attempted++;x.correct+=Number(correct)} if(!correct)n.mistakes=[problem.id,...n.mistakes.filter(x=>x!==problem.id)].slice(0,8);return n; }
export const resetProgress=()=>{localStorage.removeItem(key);return emptyProgress()};
