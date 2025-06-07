import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import {HomePageComponent} from './pages/home/home-page.component';
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {MATERIAL_MODULES} from "./material.modules";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {FooterModuleComponent} from "./pages/sharedModule/footer-module.component";
import {AppPageComponent} from "./pages/app-page.component";
import {keyValueObjectPipe} from "./pipes/keyValueObject.pipe";
import {
  LocalforangeService,
  STORE_USER_NAME,
  STORE_USER,
  STORE_INFO_NAME,
  STORE_INFO, STORE_KEYS_VALUES, STORE_KEY_VAL
} from "./services/localforange.service";
import {UserStatusComponent} from "./components/user-status/user-status.component";
import {ContainerService} from "./services/container.service";

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {SelectBoxComponent} from './components/select-box/select-box.component';
import {DialogContentComponent} from "./components/dialog/dialog-content.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {LineThirtyThreePercentComponent} from "./components/lineCards/line33percent/line33percent.component";
import {LineFiftyPercentComponent} from "./components/lineCards/line50percent/line50percent.component";
import {IconRegisterModule} from "./services/icon-register-services";
import {environment} from "../environments/environment";
import {provideRouter, RouterOutlet, withDebugTracing} from "@angular/router";
import { QRCodeModule } from 'angularx-qrcode';
import {FlexLayoutModule} from "@angular/flex-layout";
import { MatDividerModule } from '@angular/material/divider';
import {ClipboardService} from "./services/cordova/clipboard-service";
import { ContentRegisterItemComponent } from './components/content-register-item/content-register-item.component';
import {ContentMessageComponent} from "./components/content-message/content-message.component";


export function createUserStorageService(storageName: string): LocalforangeService {
    return new LocalforangeService(storageName, environment.forceLocalStorage);
}

export function createUserInfoStorageService(storageName: string): LocalforangeService {
    return new LocalforangeService(storageName, environment.forceLocalStorage);
}
export function createKeyValueStorageService(storageName: string): LocalforangeService {
  return new LocalforangeService(storageName, environment.forceLocalStorage);
}


@NgModule({
  declarations: [
    AppPageComponent,
    HomePageComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    FooterModuleComponent,
    UserStatusComponent,
    keyValueObjectPipe,
    SelectBoxComponent,
    DialogContentComponent,
    LineThirtyThreePercentComponent,
    LineFiftyPercentComponent,
    ContentRegisterItemComponent,
    ContentMessageComponent
  ],
  imports: [
    QRCodeModule,
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MATERIAL_MODULES,
    NgxDatatableModule,
    FormsModule,
    IconRegisterModule,
    FlexLayoutModule,
    CommonModule, // Add CommonModule here
    MatDividerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      extend: true
    }),
  ],
  exports: [
    MATERIAL_MODULES,
    RouterOutlet,
    FooterModuleComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: STORE_USER_NAME, useValue: 'dhi_store_user' },
    { provide: STORE_USER, useFactory: createUserStorageService, deps: [STORE_USER_NAME] },

    { provide: STORE_INFO_NAME, useValue: 'dhi_store_user_info' },
    { provide: STORE_INFO, useFactory: createUserInfoStorageService, deps: [STORE_INFO_NAME] },

    { provide: STORE_KEYS_VALUES, useValue: 'dhi_store_key_value' },
    { provide: STORE_KEY_VAL, useFactory: createKeyValueStorageService, deps: [STORE_KEYS_VALUES] },
    ContainerService,
    ClipboardService
  ],
  bootstrap: [AppPageComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// TODO improvement: https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198
