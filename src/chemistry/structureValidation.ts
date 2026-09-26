import initRDKitModule from '@rdkit/rdkit';
import rdkitWasmUrl from '@rdkit/rdkit/RDKit_minimal.wasm?url';

let modulePromise: Promise<any> | undefined;
function getModule() {
  modulePromise ??= initRDKitModule({ locateFile: () => rdkitWasmUrl });
  return modulePromise;
}

/** Canonical SMILES lets a Ketcher drawing be checked by connectivity, not text order. */
export async function canonicalSmiles(smiles: string) {
  if (!smiles || smiles === 'NO_REACTION') return null;
  const rdkit = await getModule();
  const molecule = rdkit.get_mol(smiles);
  if (!molecule) return null;
  try { return molecule.get_smiles(); } finally { molecule.delete(); }
}

export async function equivalentDrawnStructure(drawnSmiles: string, expectedSmiles: string) {
  const [drawn, expected] = await Promise.all([canonicalSmiles(drawnSmiles), canonicalSmiles(expectedSmiles)]);
  return Boolean(drawn && expected && drawn === expected);
}
