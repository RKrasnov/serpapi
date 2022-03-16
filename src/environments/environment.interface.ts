import { Provider } from "@angular/core";

export interface Environment {
  production: boolean;
  URL: string;
  API_URL: string;
  API_KEY: string;
  SOCKET_URL?: string;
  providers: Provider[];
}
