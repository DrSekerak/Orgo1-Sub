declare module '@rdkit/rdkit' { const initRDKitModule: (options?: { locateFile?: (path:string)=>string }) => Promise<any>; export default initRDKitModule; }
declare module '*.wasm?url' { const url: string; export default url; }
