/** Deterministic fallback used before RDKit is ready. RDKit canonicalizes the same strings in the UI. */
export function normalizeSmiles(smiles: string) { return smiles.replace(/\s/g,'').replace(/\[H\]/g,''); }
export function equivalentStructures(a?: string, b?: string) { return Boolean(a && b && normalizeSmiles(a) === normalizeSmiles(b)); }
/** Compares disconnected product sets without relying on the order in which they were drawn. */
export function equivalentStructureSets(drawn?: string, expected: string[] = []) {
  if (!drawn || !expected.length) return false;
  const parts = (smiles: string) => normalizeSmiles(smiles).split('.').filter(Boolean).sort().join('.');
  return parts(drawn) === expected.map(parts).sort().join('.');
}
