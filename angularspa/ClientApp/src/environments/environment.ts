// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //domain: 'sapienstellas.com',
  //clientId: '6d6213205f4740708e90c575fdd51eb5',
  //authority: 'https://login.microsoftonline.com/e43e8f9a-befd-44ca-88f7-30e4ced25929',
  //redirectUri: 'http://localhost:27822'
  domain: 'alviandalabs.onmicrosoft.com',
  clientId: 'b4bd03e4-cb74-40cf-90c1-1a1bfde4b80e',
  authority: 'https://login.microsoftonline.com/e8422127-880e-4288-928e-4ced14423628',
  redirectUri: 'http://localhost:27822'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
