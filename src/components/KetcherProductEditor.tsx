import { useMemo, useState } from 'react';
import { Editor } from 'ketcher-react';
import { StandaloneStructServiceProvider } from 'ketcher-standalone';
import type { Ketcher } from 'ketcher-core';
import 'ketcher-react/dist/index.css';

interface Props { onReady: (getSmiles: () => Promise<string>) => void; instruction?: string; }

export function KetcherProductEditor({ onReady, instruction='Draw the major product in Ketcher.' }: Props) {
  const provider = useMemo(() => new StandaloneStructServiceProvider(), []);
  const [message, setMessage] = useState('Your current drawing will be checked when you select “Check my answer.”');

  return <section className="ketcher-panel" aria-label="Chemical structure editor">
    <p><strong>{instruction}</strong> Use the line-angle tools, then select “Check my answer.”</p>
    <div style={{ height: 520, border: '1px solid #a7b5bc', borderRadius: 8, overflow: 'hidden' }}>
      <Editor
        staticResourcesUrl={import.meta.env.BASE_URL}
        structServiceProvider={provider}
        disableMacromoleculesEditor
        onInit={(ketcher: Ketcher) => onReady(() => ketcher.getSmiles())}
        errorHandler={message => setMessage(`Ketcher error: ${message}`)}
      />
    </div>
    <p aria-live="polite">{message}</p>
  </section>;
}
