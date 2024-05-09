export interface ZuoraPages2SignatureRequest {
  method: 'POST';
  pageId: string;
  uri: string;
  IBAN?: string;
  accountId?: string;
  authorizationAmount?: number;
  bankBranchCode?: string;
  bankCheckDigit?: string;
  bankCity?: string;
  bankPostalCode?: string;
  bankStreetName?: string;
  bankStreetNumber?: string;
  businessIdentificationCode?: string;
  cityBlackList?: string;
  cityWhiteList?: string;
  currency?: string;
  deviceSessionId?: string;
  gatewayName?: string;
  id?: string;
  key?: string;
  locale?: string;
  maxConsecutivePaymentFailures?: number;
  param_gwOptions_?: { [option: string]: string };
  param_supportedTypes?: string;
  passthrough?: string[];
  paymentGateway?: string;
  paymentRetryWindow?: number;
  pmId?: string;
  signature?: string;
  signatureType?: string;
  style?: string;
  submitEnabled?: boolean;
  tenantId?: string;
  token?: string;
  useDefaultRetryRule?: boolean;
}

export interface ZuoraPages2SignatureResponse {
  key?: string;
  signature?: string;
  success: boolean;
  tenantId?: string;
  token?: string;
}
