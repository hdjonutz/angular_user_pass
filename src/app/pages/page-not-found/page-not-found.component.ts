
import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RoutesEnum} from "../../helper/routes";

@Component({
  selector: 'page-not-found',
  templateUrl: 'page-not-found.component.html',
  styleUrls: ['page-not-found.component.scss']
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  goHome(): void {
    debugger;
    this.router.navigate(['/' + RoutesEnum.home]);
  }
}
