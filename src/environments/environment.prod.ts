export const environment = {
  production: true,
  IsAdvertising: window.location.origin.includes('business.tehran.ir'),
  IsProvider: true, // Change To http://localhost:57403 For Check On Local
  UrlIsProviders: window.location.origin.includes('providers.tehran.ir'),
  IsCrm: window.location.origin.includes('cfm'),
  IsExternal: false,
  IsExternalForSSO: false,
  IsTestMode: false
};
