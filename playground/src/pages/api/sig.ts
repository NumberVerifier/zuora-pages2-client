import type { NextApiRequest, NextApiResponse } from 'next';
import { ZuoraClient } from 'zuora-v2-typescript';
import process from 'process';
import { ZuoraPages2SignatureRequest } from 'zuora-v2-typescript';

const zora = new ZuoraClient(
  process.env.NEXT_PUBLIC_ZUORA_CLIENT_ID,
  process.env.NEXT_PUBLIC_ZUORA_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_ZUORA_ENDPOINT,
  {
    id: process.env.NEXT_PUBLIC_ZUORA_PAGES_PAGEID,
    uri: process.env.NEXT_PUBLIC_ZUORA_SIG_URI,
    param_supportedTypes: process.env.NEXT_PUBLIC_ZUORA_PAGES_SUPPORTED
  },
  true
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log('req.body', req.body);
  const sigReq2: Partial<ZuoraPages2SignatureRequest> =
    req.body as Partial<ZuoraPages2SignatureRequest>;
  const sigReq: Partial<ZuoraPages2SignatureRequest> = {
    pageId: process.env.NEXT_PUBLIC_ZUORA_PAGES_PAGEID,
    uri: process.env.NEXT_PUBLIC_ZUORA_SIG_URI,
    ...sigReq2
  };
  const zPageTokens = await zora.GetPages2Signature(sigReq);
  res.status(200).json(zPageTokens);
}
