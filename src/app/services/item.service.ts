import {Inject, Injectable} from "@angular/core";
import {Observable, ReplaySubject, switchMap, filter, of, take, combineLatest, tap} from "rxjs";
import {IMessages, User} from "../_models";
import {LocalforangeService, STORE_KEY_VAL} from "./localforange.service";
import {UserService} from "./user.service";
import {IItemRegister} from "../components/content-register-item/content-register-item.component";

@Injectable({ providedIn: 'root' })
export class ItemService {

  constructor(@Inject(STORE_KEY_VAL) private storageService: LocalforangeService,
              private userService: UserService) {}

  getItem(key: string): Observable<IItemRegister>{
    return this.userService.getUser().pipe(
      take(1),
      filter((f): f is User => f !== null),
      switchMap((user) => {
        const keyUUID = `${user.uuid}_${key}`;
        return this.storageService.getItem(keyUUID);
      })
    );
  }

  setItem(key: string, value: any): Observable<IItemRegister> {
    return this.userService.getUser().pipe(
      take(1),
      filter((f): f is User => f !== null),
      switchMap((user) => {
        const keyUUID = `${user.uuid}_${key}`;
        return this.storageService.setItem(keyUUID, value);
      })
    );
  };

  getItemsByUser(user: User): Observable<Array<IItemRegister>> {
    return this.storageService.getAllItems().pipe(
      switchMap((allKeys: Array<string>) => {
        // Filter the keys to only include those that start with the user's UUID
        const userKeys = allKeys.filter((key: string) => key.startsWith(`${user.uuid}_`));

        // If there are no keys for this user, return an observable of an empty array
        if (userKeys.length === 0) {
          return of([]);
        }
        const itemObservables = userKeys.map((key: string) => {
          const itemUuid = key.replace(`${user.uuid}_`, '');
          return this.getItem(itemUuid);
        });
        // Use forkJoin to wait for all save operations to complete
        return combineLatest(itemObservables);
      })
    );
  }

  /**
   * Deletes an item from local storage for the current user.
   * This method fetches the current user, constructs a unique key,
   * and then calls the localForage service to remove the item.
   * It is expected to return an Observable of IMessages.
   * @param data The item registration data containing the UUID of the item to delete.
   * @returns An Observable that emits an IMessages object upon successful deletion.
   */
  deleteItem(data: IItemRegister): Observable<IMessages> {
    return this.userService.getUser().pipe(
      take(1),
      filter((f): f is User => f !== null),
      switchMap((user) => {
        const keyUUID = `${user.uuid}_${data.uuid}`;
        return this.storageService.delItem(keyUUID);
      })
    );
  }
}
