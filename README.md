# Mechanism Lab

A static React learning application for sophomore organic chemistry students practicing introductory SN1, SN2, and no-reaction decisions. Students must choose one of those mechanisms before Ketcher is available to draw the corresponding structure.

## What is included

- A focused mechanism choice: SN1, SN2, or No reaction.
- “No reaction” is a first-class answer option. For these reviewed templates, students draw the unchanged starting material in Ketcher.
- A deterministic, instructor-reviewed bank of SN1, SN2, and no-reaction templates across introductory/intermediate/challenge levels.
- Strong nucleophiles (iodide, methoxide, cyanide, and azide) and weak nucleophiles (water, methanol, and ethanol) in chemically reviewed contexts.
- Immediate, concept-based feedback; progressive hints; full solutions on request; and browser-local session analytics.
- Molecule rendering with [RDKit.js](https://www.rdkit.org/docs/GettingStartedInJS.html) and product drawing with Ketcher. Students see and draw line-angle (skeletal) structures; RDKit canonicalizes Ketcher output for structure-based checking.
- Accessible semantic controls, keyboard navigation, high-contrast focus styles, non-color feedback labels, responsive layouts, and no account or server.

## Architecture

| Layer | Location | Responsibility |
| --- | --- | --- |
| Chemistry rules | `src/chemistry/rules.ts` | Narrow introductory classifications and mechanism viability rules. |
| Validated data | `src/chemistry/problemBank.ts` | Curated substrate/condition/product templates and instructor explanations. |
| Generation | `src/chemistry/generator.ts` | Deterministic filtering/rotation; it never invents reaction combinations. |
| Validation | `src/chemistry/checker.ts`, `structureValidation.ts` | Mechanism and Ketcher product-drawing evaluation using canonical SMILES. |
| UI | `src/App.tsx`, `src/components` | Student workflow and visual decision guide. |
| Instructor controls | `src/config/instructorConfig.ts` | Enabled mechanisms, levels, learning objectives, and feedback wording. |

The deliberately narrow `rules.ts` is not a general chemistry predictor. If an edge case is uncertain, add it as an instructor-reviewed template with tests instead of broadening a rule by assumption.

## Run locally

Install Node 24.14.1+ and pnpm, then from this directory:

```bash
pnpm install
pnpm dev
```

Open the Vite URL shown in the terminal. Production checks are:

```bash
pnpm test
pnpm build
```

## Deploy to GitHub Pages

Push this directory as the repository root (or adjust workflow working directories if retaining it as a subdirectory). In GitHub, set **Settings → Pages → Source** to **GitHub Actions**. The supplied workflow runs tests and deploys `dist`. Vite is explicitly configured for this project site at `/Orgo1-Sub/`, so JavaScript, CSS, and RDKit WebAssembly assets resolve correctly at `https://drsekerak.github.io/Orgo1-Sub/`.

## Add a reviewed problem template

1. Add a `ReactionProblem` in `src/chemistry/problemBank.ts`. Use a valid SMILES string for substrate and every product; use stereochemical SMILES (`@`/`@@`) where it matters.
2. Supply an intended SN1, SN2, or no-reaction outcome; conditions; a major product; learning concepts; four progressive hints; and an instructor-readable explanation.
3. Keep the chemistry inside this app's introductory scope. Validate the template against course materials or an instructor before merging.
4. Add a representative test in `tests/chemistry.test.ts`, especially for a new rule, stereochemical result, product equivalence, or edge case.
5. Optionally expose/limit it through `src/config/instructorConfig.ts`.

## Limits and chemistry review

The application intentionally omits advanced mechanisms and exceptions. Ketcher drawings are checked against instructor-reviewed structures through RDKit canonical SMILES; uncertain chemistry belongs in a reviewed template and test rather than a broad inferred rule.
