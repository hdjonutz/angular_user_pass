import {Inject, Injectable} from '@angular/core';
import {map, Observable, ReplaySubject, take, timer} from 'rxjs';
import {IMessages, User} from '../_models/user';
import {LocalforangeService, STORE_USER, STORE_INFO} from "./localforange.service";
import moment from 'moment';


@Injectable({ providedIn: 'root' })
export class UserService {
  public user:            ReplaySubject<User|null> = new ReplaySubject<User|null>(1);
  public isLoggedIn:      ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(@Inject(STORE_USER) private userStorageService: LocalforangeService,
              @Inject(STORE_INFO) private userInfoStorageService: LocalforangeService
  ) {
    this.isLoggedIn.next(false);
    this.user.next(null);
  }

  register(user: User): Observable<User & IMessages>{
    return this.userStorageService.setItem('data', user);
  }

  setItem(key: string, value: any): Observable<any> {
    return this.userInfoStorageService.setItem(key, value);
  };

  checkExpires(): void {
    const diff = (this.user as any).expires - moment().valueOf();
    timer(diff).pipe(take(1)).subscribe(() => {
      this.clearUserStorage();
      this.logout();
      this.isLoggedIn.next(false);
    });
  }

  isLogged():Observable<boolean> {
    return this.isLoggedIn;
  }

  getUser(): Observable<User|null> {
    return this.user;
  }

  setUser(user: User): void {
    this.user.next(user);
  }

  login(filter: {user: string|null; pass: string|null}): Observable<any> {
    return this.userStorageService.getItem('data').pipe(
      map((res) => {
        return res.user === filter.user && res.pass === filter.pass
          ? Object.assign({}, res, {granted: true, message: 'Success Logged'})
          : null
      })
    );
  }

  logout() {

  }

  clearUserStorage() {
    // this.userStorageService.delItem('data').subscribe();
    // this.userInfoStorageService.delItem('data').subscribe();
    this.isLoggedIn.next(false);

    this.user.next(null as any as User);
  }
}


