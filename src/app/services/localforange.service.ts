import {Inject, Injectable, InjectionToken } from "@angular/core";
import localForage from "localforage";
import {catchError, from, map, Observable, of, switchMap, tap, throwError} from "rxjs";
import {EMessages, IMessages} from "../_models";

export const STORE_USER_NAME = new InjectionToken<string>('dhi_store_user');
export const STORE_INFO_NAME = new InjectionToken<string>('dhi_store_user_info');
export const STORE_KEYS_VALUES = new InjectionToken<string>('dhi_store_key_value');

export const STORE_USER = new InjectionToken<LocalforangeService>('STORE_USER');
export const STORE_INFO = new InjectionToken<LocalforangeService>('STORE_INFO');
export const STORE_KEY_VAL = new InjectionToken<LocalforangeService>('STORE_KEY_VAL');

@Injectable()
export class LocalforangeService {
  private forage: LocalForage;

  constructor(@Inject(STORE_USER_NAME) private storageName: string, forceLocalStorage: Boolean) {
    console.log('Create Storage name: ', storageName);
    this.forage = localForage.createInstance(forceLocalStorage
      ? { name: storageName, driver: localForage.LOCALSTORAGE }
      : { name: storageName });
  }

  getStorageName() {
    return this.storageName;
  }

  // CORRECTED setItem method
  setItem(key: any, value: any): Observable<any> {
    return from(this.forage.setItem(key, value)).pipe(
      map(() => {
        // You might want to return the value that was just set, or a confirmation
        return value;
      }),
      catchError((err: any) => {
        console.error('Error setting item:', err);
        return throwError(() => new Error(`Failed to set item ${key}: ${err.message || err}`));
      })
    );
  }

  // CORRECTED getItem method
  getItem(key: any): Observable<any> {
    return from(this.forage.getItem(key)).pipe(
      map((value: any) => {
        console.log('getItem:', key, value);
        return value;
      }),
      catchError((err: any) => {
        console.error('Error getting item:', err);
        return throwError(() => new Error(`Failed to get item ${key}: ${err.message || err}`));
      })
    );
  }

  // CORRECTED delItem method
  delItem(key: string): Observable<IMessages> {
    return from(this.forage.removeItem(key))
      .pipe(
        map(() => {
          console.log('delete res: item successfully removed'); // Log a clear success message
          return { message: EMessages.OK };
        }),
        catchError((err: any) => {
          // Corrected error message for clarity
          console.error('Error deleting item:', err);
          return throwError(() => new Error(`Failed to delete item ${key}: ${err.message || err}`));
        })
      );
  }

  getAllItems(): Observable<any> {
    return new Observable((observer) => {
      this.forage.keys(
        (err: any) => {
          if (err) {
            observer.error(err);
          }
        }).then((values) => {
        console.log('getAllItems:', values);
        observer.next(values);
      });
    })
  }
}
