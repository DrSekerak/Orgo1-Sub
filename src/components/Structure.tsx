import { useEffect, useId, useState } from 'react';
import initRDKitModule from '@rdkit/rdkit';
import rdkitWasmUrl from '@rdkit/rdkit/RDKit_minimal.wasm?url';
let rdkit: Awaited<ReturnType<typeof initRDKitModule>> | undefined;
// Vite fingerprints this binary and the locator keeps it valid below a GitHub Pages subpath.
async function getRdkit(){ if(!rdkit) rdkit=await initRDKitModule({ locateFile: () => rdkitWasmUrl }); return rdkit; }
export function Structure({smiles,label}:{smiles:string;label:string}) { const id=useId().replace(/:/g,''); const [fallback,setFallback]=useState(false);
 if(smiles === 'NO_REACTION') return <div className="structure no-reaction" role="img" aria-label="No reaction"><strong>No reaction</strong><span>starting material remains unchanged</span></div>;
 // RDKit's standard SVG depiction is line-angle: carbons/hydrogens are implicit,
 // heteroatoms are labeled, and bond wedges preserve stereochemical information.
 useEffect(()=>{let active=true; getRdkit().then(R=>{if(!active)return;const mol=R.get_mol(smiles); if(!mol){setFallback(true);return} const node=document.getElementById(id); if(node)node.innerHTML=mol.get_svg(460,220); mol.delete()}).catch(()=>setFallback(true));return()=>{active=false}},[id,smiles]);
 return <div className="structure" role="img" aria-label={`${label}, shown as a line-angle structure`}><div id={id}/>{fallback&&<span className="structure-error">Structure diagram unavailable. Refresh to retry.</span>}</div>;
}
