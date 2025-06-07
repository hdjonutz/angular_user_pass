import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { filter } from "rxjs";
import {UserService} from "../../services/user.service";
import {STORE_USER_NAME} from "../../services/localforange.service";
import {RoutesEnum} from "../../helper/routes";
import {ContainerService} from "../../services/container.service";

@Component({
  selector: 'user-status',
  templateUrl: 'user-status.component.html',
  styleUrls: ['user-status.component.scss']
})
export class UserStatusComponent implements OnInit {
  isLoggedIn  = false;
  isAdmin     = false;
  nameVorname: string = '';

  constructor(
    private router: Router,
    private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: any) => {
      if (user && user.user && user.uuid) {
        this.isLoggedIn = true;
        this.isAdmin    = true;
        this.nameVorname = user.user;
      } else {
        this.isLoggedIn  = false;
        this.isAdmin     = false;
        this.nameVorname = '';
        this.router.navigate(['/' + RoutesEnum.login]);
      }
    })
  }

  login(): void {
    this.router.navigate(['/' + RoutesEnum.login]);
  }

  // updateForm(): void {
  // this.router.navigate(['/' + RoutesEnum.updateForm]);
  // }
}
