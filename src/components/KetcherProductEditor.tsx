import { useMemo, useState } from 'react';
import { Editor } from 'ketcher-react';
import { StandaloneStructServiceProvider } from 'ketcher-standalone';
import type { Ketcher } from 'ketcher-core';
import 'ketcher-react/dist/index.css';

interface Props { onUseDrawing: (smiles: string) => void; }

export function KetcherProductEditor({ onUseDrawing }: Props) {
  const provider = useMemo(() => new StandaloneStructServiceProvider(), []);
  const [ketcher, setKetcher] = useState<Ketcher>();
  const [message, setMessage] = useState('Draw the major product, then use it as your answer.');

  async function useDrawing() {
    if (!ketcher) return;
    const smiles = await ketcher.getSmiles();
    if (!smiles) { setMessage('Draw a product before using the drawing as your answer.'); return; }
    onUseDrawing(smiles);
    setMessage('Drawing recorded. Select mechanism and stereochemistry, then check your answer.');
  }

  return <section className="ketcher-panel" aria-label="Chemical structure editor">
    <p><strong>Draw the major product in Ketcher.</strong> Use the line-angle tools, then select “Use drawing as my answer.”</p>
    <div style={{ height: 520, border: '1px solid #a7b5bc', borderRadius: 8, overflow: 'hidden' }}>
      <Editor
        staticResourcesUrl={import.meta.env.BASE_URL}
        structServiceProvider={provider}
        disableMacromoleculesEditor
        onInit={setKetcher}
        errorHandler={message => setMessage(`Ketcher error: ${message}`)}
      />
    </div>
    <button type="button" onClick={useDrawing} disabled={!ketcher}>Use drawing as my answer</button>
    <p aria-live="polite">{message}</p>
  </section>;
}
