import React, { useEffect } from 'react';
import Head from 'next/head';
import {
  ZuoraPagesClient,
  zuoraPagesCallback,
  zuoraPagesSignature,
  zuoraPagesRenderParams,
  zuoraPagesPrePopulateFields,
  zuoraPagesRenderCallbackResp,
  ZuoraPages2SignatureRequest
} from 'zuora-pages2-client';

export default function Home() {
  const [msgs, setMsgs] = React.useState<string>('Start...');
  const [sig, setSig] = React.useState<zuoraPagesSignature | undefined>(
    undefined
  );
  const [renderParms, setRenderParms] = React.useState<
    Partial<zuoraPagesRenderParams> | undefined
  >(undefined);

  useEffect(() => {
    const a = async () => {
      try {
        // Get signature
        const url = '/api/sig';
        const req: Partial<ZuoraPages2SignatureRequest> = {};
        const resp = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req)
        });
        if (!resp.ok) {
          console.error('Failed to get signature', resp.statusText);
          alert('Failed to get signature');
          return;
        }
        setSig(await resp.json());
      } catch (e) {
        console.error('Failed to get signature', e);
        alert('Failed to get signature');
      }
    };
    a();
  }, []);

  useEffect(() => {
    if (!sig) return;
    setRenderParms(undefined);
    const a = async () => {
      try {
        const zparam: Partial<zuoraPagesRenderParams> = {
          tenantId: sig.tenantId,
          id: process.env.NEXT_PUBLIC_ZUORA_PAGES_PAGEID,
          url: process.env.NEXT_PUBLIC_ZUORA_SIG_URI,
          param_supportedTypes: process.env.NEXT_PUBLIC_ZUORA_PAGES_SUPPORTED,
          key: sig.key,
          token: sig.token,
          signature: sig.signature,
          style: 'inline',
          submitEnabled: true
        };
        console.log('zparam', zparam);
        setRenderParms(zparam);
      } catch (e) {
        console.error('Failed to get renderParms', e);
        alert('Failed to get renderParms');
      }
    };
    a();
  }, [sig]);

  const callback: zuoraPagesCallback = (msg: zuoraPagesRenderCallbackResp) => {
    console.log('callback', msg);
  };
  const prepop: zuoraPagesPrePopulateFields = {};

  return (
    <>
      <Head>
        <title>Zuora Playground</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`flexWrapper`}>
        <div className="row">
          <div className="column">
            {Boolean(renderParms) ? (
              <ZuoraPagesClient
                callback={callback}
                prePopulateFields={prepop}
                signature={sig}
                renderParams={renderParms}
              />
            ) : (
              <>Loading...</>
            )}
          </div>
          <div className="column">
            <textarea style={{ minWidth: 800, minHeight: 1000 }} value={msgs} />
          </div>
        </div>
      </main>
    </>
  );
}
