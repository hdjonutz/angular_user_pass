
import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import {ConfigurationService} from '../services/configuration.service';
import {RoutesEnum} from "../helper/routes";
import {ContainerService} from "../services/container.service";
import {STORE_USER_NAME} from "../services/localforange.service";
import {config} from '../config/config';
import {of} from "rxjs";
import {IContainerStore} from "../_models";

@Component({
  selector: 'app-root',
  templateUrl: 'app-page.component.html',
  styleUrls: ['app-page.component.scss']
})
export class AppPageComponent implements OnInit {
  url!: string;
  navigator: any;
  RoutesEnum = RoutesEnum;

  title     = '';
  isAdmin   = false;
  config    = {fakeLogin: false};
  constructor(private router: Router,
              private configurationService: ConfigurationService,) {
  }

  ngOnInit(): void {
    this.config = config;
    const appRoot:any = document.getElementsByTagName('app-root');
    appRoot[0].style.display = 'flex';

    const splash:any = document.getElementsByTagName('loading-container-splash');
    if (splash && splash[0]) {
      splash[0].style.display = 'none';
    }

    if (this.config.fakeLogin) {
        this.isAdmin = true;
    } else {
        debugger;
    }
    this.navigator = [
      {title: 'Home',            uri: '/' + RoutesEnum.home, icon: 'home', shouldBeDisplay: true},
      {title: 'Login',           uri: '/' + RoutesEnum.login, icon: 'login', shouldBeDisplay: true},
      {title: 'Registration',    uri: '/' + RoutesEnum.userToRegister, icon: 'library_add', shouldBeDisplay: true},
      {title: 'Page unknown',    uri: '/' + RoutesEnum.pageNotFound, icon: 'publish', shouldBeDisplay: false},
    ].filter((f) => f.shouldBeDisplay);
    this.title = this.configurationService.getDescription();
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        map((e: NavigationEnd) => {
          this.router.navigate([e.urlAfterRedirects]);
          this.url = e.urlAfterRedirects;
        })
      ).subscribe();
  }
  versionInfo = {
    full: '15.2.9-local+sha.35690fdf6d'
  };
}
