# Mechanism Lab

A static React learning application for sophomore organic chemistry students practicing introductory SN1, SN2, E1, and E2 decisions. It emphasizes the sequence chemists use: substrate → reagent → solvent → temperature → competing pathways → product → stereochemical/regiochemical consequence.

## What is included

- Five practice modes: identify mechanism, predict product, explain, mixed, and targeted concepts.
- “No reaction” is a first-class answer option, with reviewed templates for conditions that lack a viable introductory SN1, SN2, E1, or E2 pathway.
- A deterministic, instructor-reviewed bank of 16 reaction templates across SN1, SN2, E1, E2 and introductory/intermediate/challenge levels.
- Immediate, concept-based feedback; progressive hints; full solutions on request; and browser-local session analytics.
- Molecule rendering with [RDKit.js](https://www.rdkit.org/docs/GettingStartedInJS.html). Students see line-angle (skeletal) structures; the application retains SMILES internally, including stereochemical annotations where applicable.
- Accessible semantic controls, keyboard navigation, high-contrast focus styles, non-color feedback labels, responsive layouts, and no account or server.

## Architecture

| Layer | Location | Responsibility |
| --- | --- | --- |
| Chemistry rules | `src/chemistry/rules.ts` | Narrow introductory classifications and mechanism viability rules. |
| Validated data | `src/chemistry/problemBank.ts` | Curated substrate/condition/product templates and instructor explanations. |
| Generation | `src/chemistry/generator.ts` | Deterministic filtering/rotation; it never invents reaction combinations. |
| Validation | `src/chemistry/checker.ts`, `equivalence.ts` | Mechanism/product/stereo/regio evaluation. RDKit renders machine-readable SMILES. |
| UI | `src/App.tsx`, `src/components` | Student workflow and visual decision guide. |
| Instructor controls | `src/config/instructorConfig.ts` | Enabled mechanisms, levels, learning objectives, and feedback wording. |

The deliberately narrow `rules.ts` is not a general chemistry predictor. If an edge case is uncertain, add it as an instructor-reviewed template with tests instead of broadening a rule by assumption.

## Run locally

Install Node 20+ and npm, then from this directory:

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal. Production checks are:

```bash
npm run test
npm run build
```

## Deploy to GitHub Pages

Push this directory as the repository root (or adjust workflow working directories if retaining it as a subdirectory). In GitHub, set **Settings → Pages → Source** to **GitHub Actions**. The supplied workflow runs tests and deploys `dist`. Vite is explicitly configured for this project site at `/Orgo1-Sub-Elim/`, so JavaScript, CSS, and RDKit WebAssembly assets resolve correctly at `https://drsekerak.github.io/Orgo1-Sub-Elim/`.

## Add a reviewed problem template

1. Add a `ReactionProblem` in `src/chemistry/problemBank.ts`. Use a valid SMILES string for substrate and every product; use stereochemical SMILES (`@`/`@@`) where it matters.
2. Supply intended/competing mechanisms, conditions, major and useful minor/distractor products, learning concepts, four progressive hints, and an instructor-readable explanation.
3. Keep the chemistry inside this app's introductory scope. Validate the template against course materials or an instructor before merging.
4. Add a representative test in `tests/chemistry.test.ts`, especially for a new rule, stereochemical result, product equivalence, or edge case.
5. Optionally expose/limit it through `src/config/instructorConfig.ts`.

## Limits and chemistry review

The application intentionally omits advanced effects and arbitrary freehand structure input. Product answers use controlled structure choices so every answer has a validated reference. `equivalence.ts` currently provides a conservative normalized-SMILES fallback; a future expansion accepting freeform student structures should canonicalize both structures through RDKit and add a chemistry-review test suite before release.
