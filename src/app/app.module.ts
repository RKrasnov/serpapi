import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from "./shared/shared.module";
import { IconsService } from "./shared/icons/icons.service";
import { ThemeService } from "./shared/theme/theme.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RequestsInterceptor } from "./http/requests.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private _themeService: ThemeService,
    private _iconsService: IconsService,
  ) {}
}
