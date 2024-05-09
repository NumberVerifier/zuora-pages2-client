// https://knowledgecenter.zuora.com/Zuora_Payments/Payment_Page_and_Payment_Link/Payment_Pages_2.0/F_Client_Parameters_for_Payment_Pages_2.0
import React, { useEffect } from 'react';

export interface zuoraPagesRenderParams {
  authorizationAmount?: number;
  checkDuplicated?: boolean;
  countryBlackList?: string;
  countryWhiteList?: string;
  documents?: { type: 'invoice'; ref: string }[];
  // 3 letter ISO code
  field_currency?: string;
  field_accountId?: string;
  field_deviceSessionId?: string;
  field_gatewayName?: string;
  field_maxConsecutivePaymentFailures?: number;
  field_passthrough1?: string;
  field_passthrough2?: string;
  field_passthrough3?: string;
  field_passthrough4?: string;
  field_passthrough5?: string;
  field_passthrough6?: string;
  field_passthrough7?: string;
  field_passthrough8?: string;
  field_passthrough9?: string;
  field_passthrough10?: string;
  field_passthrough11?: string;
  field_passthrough12?: string;
  field_passthrough13?: string;
  field_passthrough14?: string;
  // In hours
  field_paymentRetryWindow?: number;
  field_useDefaultRetryRule?: boolean;
  // Pages 2.0 form ID
  id: string;
  // Public key for encryption
  key: string;
  signature: string;
  signatureType?: string;
  locale?: string;
  // param_gwOptions_[option]
  paymentGateway?: string;
  // Default false
  retainValues?: boolean;
  style: 'inline' | 'overlay';
  submitEnabled: boolean;
  // Zuora tenant ID
  tenantId: string;
  // Token generated
  token: string;
  // hosted page url
  url: string;
  /* CSV of supported payment types
  Visa*
  MasterCard*
  AmericanExpress
  Discover*
  Dankort
  JCB
  */
  param_supportedTypes?: string;
  cityBlackList?: string;
  cityWhiteList?: string;
  // Used to reauthorize a card
  pmId?: string;
  screeningAmount?: number;
}
export interface zuoraPagesPrePopulateFields {
  creditCardAddress1?: string;
  creditCardAddress2?: string;
  creditCardCountry?: string;
  creditCardHolderName?: string;
}
export interface zuoraPagesRenderCallbackResp {
  success: boolean;
  refId: string;
  errorCode?: string;
  errorMessage?: string;
}
export type zuoraPagesCallback = (
  response: zuoraPagesRenderCallbackResp
) => void;
export interface zuoraPagesClient {
  //    render: function (params, initFields, callback, width, height) {
  render: (
    params: Partial<zuoraPagesRenderParams>,
    prepop: zuoraPagesPrePopulateFields,
    callback: zuoraPagesCallback
  ) => void;
}
declare global {
  interface Window {
    Z: zuoraPagesClient;
  }
}

export interface zuoraPagesSignature {
  key: string;
  signature: string;
  tenantId: string;
  token: string;
}

interface zuoraPagesClientProps {
  signature: zuoraPagesSignature;
  renderParams: Partial<zuoraPagesRenderParams>;
  prePopulateFields: zuoraPagesPrePopulateFields;
  callback: zuoraPagesCallback;
}
export const ZuoraPagesClient = (Props: zuoraPagesClientProps) => {
  const renderForm = () => {
    if (!window) return;
    window.Z.render(
      Props.renderParams,
      Props.prePopulateFields,
      Props.callback
    );
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//static.zuora.com/Resources/libs/hosted/1.3.1/zuora-min.js';
    script.async = true;
    script.onload = () => {
      renderForm();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!window.Z) return;
    renderForm();
  }, [
    Props.renderParams,
    Props.prePopulateFields,
    Props.callback,
    Props.signature
  ]);

  return (
    <>
      <div id="zuora_payment"></div>
    </>
  );
};
export default ZuoraPagesClient;
