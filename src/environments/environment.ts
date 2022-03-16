// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "./environment.interface";

export const URL: string = 'serpapi.com';

export const environment: Environment = {
  production: false,
  URL: `https://${URL}/`,
  API_URL: '/proxy',
  API_KEY: 'b6c49d403c35a587823c015514515cd5a5c4e76491f6f2395983c5c23631dfaf',
  providers: [],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
