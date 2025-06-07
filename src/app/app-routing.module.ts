import { NgModule } from '@angular/core';
import {provideRouter, RouterModule, ROUTES, Routes, withDebugTracing} from '@angular/router';
import {HomePageComponent} from './pages/home/home-page.component';
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

import {CanActivateTeam, Permissions, UserToken} from "./guard/activation-gurd";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {RoutesEnum} from "./helper/routes";

export const routes: Routes = [
  {path: '',                          redirectTo: RoutesEnum.home, pathMatch: 'full'},
  {path: RoutesEnum.home,             component: HomePageComponent, pathMatch: 'full'},
  {path: RoutesEnum.login,            component: LoginComponent, pathMatch: 'full'},
  {path: RoutesEnum.userToRegister,   component: RegisterComponent, pathMatch: 'full'},

  /* ADMIN TABS */
  {path: '**',                      redirectTo: RoutesEnum.pageNotFound, pathMatch: 'full'},
  {path: RoutesEnum.pageNotFound,   component: PageNotFoundComponent},

  // {path: 'app-test-page', component: HomePageComponent, pathMatch: 'full'},
  // {path: 'aaa',           component: AaaBbComponent, pathMatch: 'full'},
  // {path: 'bbb',           component: BbbCcComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [CanActivateTeam, UserToken, Permissions] /*, provideRouter(routes, withDebugTracing()*/
})
export class AppRoutingModule { }
