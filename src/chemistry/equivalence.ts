/** Deterministic fallback used before RDKit is ready. RDKit canonicalizes the same strings in the UI. */
export function normalizeSmiles(smiles: string) { return smiles.replace(/\s/g,'').replace(/\[H\]/g,''); }
export function equivalentStructures(a?: string, b?: string) { return Boolean(a && b && normalizeSmiles(a) === normalizeSmiles(b)); }
